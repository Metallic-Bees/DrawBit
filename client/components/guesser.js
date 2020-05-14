import React, {Component, createRef} from 'react'
import io from 'socket.io-client'
import CanvasDraw from 'react-canvas-draw'
import {updateWinner} from '../store/allUsers'
import {fetchWord} from '../store/word'
import {connect} from 'react-redux'
const canvas = createRef()

class Guesser extends Component {
  constructor() {
    super()
    this.state = {
      playerId: 1,
      guess: '',
      gameWord: [],
      rounds: 3,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  // wordsForGame = (rounds, wordArry) => {
  //   let words = []
  //   while (words.length < rounds) {
  //     let word = wordArry[Math.floor(Math.random() * (100 - 1)) + 1].content
  //     if (!words.includes(word)) {
  //       words.push(word)
  //     }
  //   }
  //   console.log(words)
  // }

  handleOnClick(rounds, wordArray) {
    this.setState({gameWord: []})
    while (this.state.gameWord.length < rounds) {
      let word = wordArray[Math.floor(Math.random() * (100 - 1)) + 1].content
      if (!this.state.gameWord.includes(word)) {
        this.state.gameWord.push(word)
      }
    }
    console.log(this.state.gameWord)
  }

  componentDidMount() {
    const socket = io.connect(window.location.origin)
    socket.on('drawing', function (data) {
      canvas.current.loadSaveData(data, true)
    })
  }

  // async markAsCorrect(playerId) {
  //   const {data} = await axios.put(`/api/user/${playerId}/winner`)
  //   console.log('a winner is found! here is the axios data', data)
  //   //await put route to make player show as "winner" on user model
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    if (this.state.gameWord.includes(this.state.guess)) {
      await this.props.updateWinner(this.state.playerId)
      console.log(this.state.guess)
      await console.log('YOU WON!!!')
    } else {
      console.log('GUESS AGAIN!!!')
      console.log('you guessed', this.state.guess)
      console.log('word was', this.state.gameWord)
      await this.setState({guess: ''})
      console.log(`this.state.guess (your guess)
        has been reset to, " ${this.state.guess}"`)
    }
  }

  render() {
    let {word} = this.props
    console.log('STATE ====>', this.state)
    return (
      <div>
        <h1>Guess the drawing!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess">Guess:</label>
          <input
            type="text"
            name="guess"
            value={this.state.guess}
            onChange={this.handleChange}
          />
          <button type="submit">Submit Guess</button>
          <button
            type="button"
            onClick={() => this.handleOnClick(this.state.rounds, word)}
          >
            {' '}
            Generate Word{' '}
          </button>
        </form>
        <br />
        <br />
        <CanvasDraw ref={canvas} disabled={true} hideInterface={true} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  word: state.word,
})

const mapDispatchToProps = (dispatch) => ({
  updateWinner: (playerId) => dispatch(updateWinner(playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Guesser)
