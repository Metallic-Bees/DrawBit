import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {Col, Row, Container} from 'react-bootstrap'
import {updateWinner} from '../store/allUsers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const canvas = createRef()
const socket = io.connect(window.location.origin)

class Guesser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: 1,
      guess: '',
      timer: 60,
      room: props.room,
      word: props.word,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gameTimer = this.gameTimer.bind(this)
  }

  componentDidMount() {
    socket.emit('join_lobby', this.state.room.name, this.props.user)
    // RECEIVE DRAWING LISTENER
    socket.on('drawing', function (data) {
      canvas.current.loadSaveData(data, true)
    })
    this.gameTimer()
  }
  gameTimer() {
    //add a set timeout/delay to countdown
    let time = 60
    let countdown = setInterval(() => {
      if (this.state.timer < 0) clearInterval(countdown)
      time--
      this.setState({
        timer: time,
      })
      if (time === 0) {
        window.alert('Round Over!')
      }
    }, 1000)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.word === this.state.guess.toLowerCase()) {
      await this.props.updateWinner(this.state.playerId)
      window.alert('YOU WIN!')
    } else {
      window.alert('GUESS AGAIN!')
      await this.setState({guess: ''})
    }
  }

  render() {
    return (
      <div>
        <Link to={`/lobby/${this.props.room.id}`} className="link">
          <button type="button">Back To Lobby</button>
        </Link>
        <h1> Timer: {this.state.timer} </h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess">Guess:</label>
          <input
            type="text"
            name="guess"
            value={this.state.guess}
            onChange={this.handleChange}
          />
          <button type="submit">Submit Guess</button>
        </form>
        <br />
        <br />
        <Container className="whiteboard">
          <Row className="justify-content-md-center">
            <h1 className="draw-word">Guess the drawing!</h1>
          </Row>
          <Row id="canvas" className="justify-content-md-center">
            <CanvasDraw
              ref={canvas}
              disabled={true}
              hideInterface={true}
              hideGrid={true}
              canvasHeight={window.innerHeight / 1.5}
              canvasWidth={window.innerWidth}
            />
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allWords: state.word,
})

const mapDispatchToProps = (dispatch) => ({
  updateWinner: (playerId) => dispatch(updateWinner(playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Guesser)
