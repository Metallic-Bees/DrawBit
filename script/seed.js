'use strict'

const db = require('../server/db')
const {User, Word, Room, Game} = require('../server/db/models')

// const games = [
//   {isActive: true},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
//   {isActive: false},
// ]

const words = [
  {content: 'tiger', category: 'animal'},
  {content: 'grizzly bear', category: 'animal'},
  {content: 'fish', category: 'animal'},
  {content: 'turtle', category: 'animal'},
  {content: 'dog', category: 'animal'},
  {content: 'shark', category: 'animal'},
  {content: 'gecko', category: 'animal'},
  {content: 'buffalo', category: 'animal'},
  {content: 'bat', category: 'animal'},
  {content: 'jaguar', category: 'animal'},
  {content: 'squirrel', category: 'animal'},
  {content: 'fox', category: 'animal'},
  {content: 'snake', category: 'animal'},
  {content: 'mockingbird', category: 'animal'},
  {content: 'whale', category: 'animal'},
  {content: 'hawk', category: 'animal'},
  {content: 'raven', category: 'animal'},
  {content: 'octopus', category: 'animal'},
  {content: 'lion', category: 'animal'},
  {content: 'hamster', category: 'animal'},
  {content: 'snail', category: 'animal'},
  {content: 'baseball', category: 'sport'},
  {content: 'basketball', category: 'sport'},
  {content: 'soccer', category: 'sport'},
  {content: 'hockey', category: 'sport'},
  {content: 'cricker', category: 'sport'},
  {content: 'tennis', category: 'sport'},
  {content: 'volleyball', category: 'sport'},
  {content: 'rugby', category: 'sport'},
  {content: 'golf', category: 'sport'},
  {content: 'boxing', category: 'sport'},
  {content: 'fencing', category: 'sport'},
  {content: 'football', category: 'sport'},
  {content: 'swimming', category: 'sport'},
  {content: 'wrestling', category: 'sport'},
  {content: 'skateboarding', category: 'sport'},
  {content: 'chair', category: 'object'},
  {content: 'hat', category: 'object'},
  {content: 'pencil', category: 'object'},
  {content: 'table', category: 'object'},
  {content: 'radio', category: 'object'},
  {content: 'toy', category: 'object'},
  {content: 'television', category: 'object'},
  {content: 'mirror', category: 'object'},
  {content: 'gold', category: 'object'},
  {content: 'knife', category: 'object'},
  {content: 'feather', category: 'object'},
  {content: 'clock', category: 'object'},
  {content: 'ball', category: 'object'},
  {content: 'spoon', category: 'object'},
  {content: 'boat', category: 'object'},
  {content: 'car', category: 'object'},
  {content: 'ring', category: 'object'},
  {content: 'hammer', category: 'object'},
  {content: 'shield', category: 'object'},
  {content: 'scarecrow', category: 'object'},
  {content: 'venusaur', category: 'pokemon'},
  {content: 'charizard', category: 'pokemon'},
  {content: 'blastoise', category: 'pokemon'},
  {content: 'pikachu', category: 'pokemon'},
  {content: 'jigglypuff', category: 'pokemon'},
  {content: 'meowth', category: 'pokemon'},
  {content: 'psyduck', category: 'pokemon'},
  {content: 'slowpoke', category: 'pokemon'},
  {content: 'dodrio', category: 'pokemon'},
  {content: 'staryu', category: 'pokemon'},
  {content: 'magikarp', category: 'pokemon'},
  {content: 'ditto', category: 'pokemon'},
  {content: 'eevee', category: 'pokemon'},
  {content: 'snorlax', category: 'pokemon'},
  {content: 'articuno', category: 'pokemon'},
  {content: 'zapdos', category: 'pokemon'},
  {content: 'moltres', category: 'pokemon'},
  {content: 'dragonite', category: 'pokemon'},
  {content: 'mewtwo', category: 'pokemon'},
  {content: 'mew', category: 'pokemon'},
  {content: 'java', category: 'programming language'},
  {content: 'javascript', category: 'programming language'},
  {content: 'python', category: 'programming language'},
  {content: 'swift', category: 'programming language'},
  {content: 'html', category: 'programming language'},
  {content: 'ruby', category: 'programming language'},
  {content: 'scala', category: 'programming language'},
  {content: 'sql', category: 'programming language'},
  {content: 'shell', category: 'programming language'},
  {content: 'objective c', category: 'programming language'},
  {content: 'c sharp', category: 'programming language'},
  {content: 'haskell', category: 'programming language'},
  {content: 'africa', category: 'place'},
  {content: 'new york city', category: 'place'},
  {content: 'paris', category: 'place'},
  {content: 'desert', category: 'place'},
  {content: 'forest', category: 'place'},
  {content: 'china', category: 'place'},
  {content: 'hawaii', category: 'place'},
  {content: 'turkey', category: 'place'},
  {content: 'rome', category: 'place'},
  {content: 'tokyo', category: 'place'},
  {content: 'london', category: 'place'},
  {content: 'las vegas', category: 'place'},
]

// const rooms = [
//   {name: 'fullstack', isActive: true},
//   {name: 'exterminator', isActive: true},
//   {name: 'life', isActive: false},
//   {name: 'explore', isActive: false},
//   {name: 'metallic bees', isActive: false},
//   {name: 'beatz', isActive: true},
//   {name: 'robots', isActive: true},
//   {name: 'ganster', isActive: false},
//   {name: 'bullseye', isActive: true},
//   {name: 'live love laugh', isActive: true},
// ]

// const users = [
//   {
//     name: 'amaith0',
//     email: 'ahalifax0@tripadvisor.com',
//     password: 'W7LEXnM2Rg3I',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/231x186.png/dddddd/000000',
//     wins: 56,
//     gamesPlayed: 62,
//     munnyPoints: 172,
//     isArtist: true,
//   },
//   {
//     name: 'echanson1',
//     email: 'mierland1@simplemachines.org',
//     password: 'COs0QtVA',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/203x124.jpg/5fa2dd/ffffff',
//     wins: 29,
//     gamesPlayed: 72,
//     munnyPoints: 1902,
//     isArtist: false,
//   },
//   {
//     name: 'ldiegan2',
//     email: 'ahessing2@jigsy.com',
//     password: '7rR2UA2bF',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/140x150.bmp/dddddd/000000',
//     wins: 79,
//     gamesPlayed: 73,
//     munnyPoints: 1276,
//     isArtist: true,
//   },
//   {
//     name: 'wmcleish3',
//     email: 'bshawe3@google.com.br',
//     password: 'xqc1X0lR',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/117x122.jpg/dddddd/000000',
//     wins: 97,
//     gamesPlayed: 8,
//     munnyPoints: 103,
//     isArtist: false,
//   },
//   {
//     name: 'tpetters4',
//     email: 'hpadgett4@senate.gov',
//     password: 'UuQQwz2HV1XS',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/191x145.png/5fa2dd/ffffff',
//     wins: 52,
//     gamesPlayed: 66,
//     munnyPoints: 79,
//     isArtist: false,
//   },
//   {
//     name: 'telson5',
//     email: 'bsilmon5@webmd.com',
//     password: 'r1fTuCgjiW6',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/146x215.bmp/dddddd/000000',
//     wins: 77,
//     gamesPlayed: 1,
//     munnyPoints: 1693,
//     isArtist: false,
//   },
//   {
//     name: 'ssiddele6',
//     email: 'acleveley6@youtu.be',
//     password: 'LIVWyLstck',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/238x155.bmp/dddddd/000000',
//     wins: 46,
//     gamesPlayed: 7,
//     munnyPoints: 328,
//     isArtist: true,
//   },
//   {
//     name: 'tarnett7',
//     email: 'nquarrie7@bloomberg.com',
//     password: 'sLfh36ZaVV',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/208x149.bmp/cc0000/ffffff',
//     wins: 73,
//     gamesPlayed: 50,
//     munnyPoints: 1875,
//     isArtist: false,
//   },
//   {
//     name: 'bbollin8',
//     email: 'dchardin8@yolasite.com',
//     password: 'EXTlTDyuDE',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/185x111.bmp/ff4444/ffffff',
//     wins: 10,
//     gamesPlayed: 44,
//     munnyPoints: 456,
//     isArtist: true,
//   },
//   {
//     name: 'dwarboys9',
//     email: 'upavlovsky9@phoca.cz',
//     password: 'o2IvLS',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/108x127.bmp/ff4444/ffffff',
//     wins: 53,
//     gamesPlayed: 67,
//     munnyPoints: 685,
//     isArtist: false,
//   },
//   {
//     name: 'zgobela',
//     email: 'lmcileena@wunderground.com',
//     password: 'ldpGQ0',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/153x234.png/5fa2dd/ffffff',
//     wins: 40,
//     gamesPlayed: 54,
//     munnyPoints: 444,
//     isArtist: true,
//   },
//   {
//     name: 'bwillavizeb',
//     email: 'cklausewitzb@mit.edu',
//     password: 'sZzW5WNXfarw',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/200x207.bmp/dddddd/000000',
//     wins: 50,
//     gamesPlayed: 92,
//     munnyPoints: 1804,
//     isArtist: false,
//   },
//   {
//     name: 'cbruckc',
//     email: 'emcalroyc@shareasale.com',
//     password: '9VN79F',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/172x145.jpg/5fa2dd/ffffff',
//     wins: 74,
//     gamesPlayed: 56,
//     munnyPoints: 731,
//     isArtist: false,
//   },
//   {
//     name: 'nprield',
//     email: 'agildroyd@naver.com',
//     password: '2KzKGRlVefv',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/114x117.jpg/cc0000/ffffff',
//     wins: 50,
//     gamesPlayed: 81,
//     munnyPoints: 1772,
//     isArtist: false,
//   },
//   {
//     name: 'fbodee',
//     email: 'dperigoe@shutterfly.com',
//     password: 'ASdQIR',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/110x128.png/dddddd/000000',
//     wins: 10,
//     gamesPlayed: 67,
//     munnyPoints: 610,
//     isArtist: true,
//   },
//   {
//     name: 'pharmstonef',
//     email: 'tbrislawnf@marriott.com',
//     password: 'kgvi0AGjTA',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/117x221.bmp/5fa2dd/ffffff',
//     wins: 57,
//     gamesPlayed: 71,
//     munnyPoints: 599,
//     isArtist: false,
//   },
//   {
//     name: 'sfrondtg',
//     email: 'scorkerg@squarespace.com',
//     password: 'UP4Qj5',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/228x218.bmp/5fa2dd/ffffff',
//     wins: 82,
//     gamesPlayed: 12,
//     munnyPoints: 1036,
//     isArtist: false,
//   },
//   {
//     name: 'jnehlh',
//     email: 'bwrennallh@livejournal.com',
//     password: 'fcV0ag5sMU',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/132x154.bmp/cc0000/ffffff',
//     wins: 36,
//     gamesPlayed: 38,
//     munnyPoints: 1008,
//     isArtist: false,
//   },
//   {
//     name: 'mleflemingi',
//     email: 'lbroomfieldi@devhub.com',
//     password: 'heq2kybv',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/203x150.png/dddddd/000000',
//     wins: 88,
//     gamesPlayed: 35,
//     munnyPoints: 640,
//     isArtist: false,
//   },
//   {
//     name: 'aparletj',
//     email: 'kharvattj@live.com',
//     password: '9ONbkklhfOjH',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/187x131.jpg/cc0000/ffffff',
//     wins: 46,
//     gamesPlayed: 5,
//     munnyPoints: 1508,
//     isArtist: true,
//   },
//   {
//     name: 'lrobbelk',
//     email: 'mallnattk@tripod.com',
//     password: 'ltgc7q',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/181x105.jpg/cc0000/ffffff',
//     wins: 84,
//     gamesPlayed: 49,
//     munnyPoints: 891,
//     isArtist: false,
//   },
//   {
//     name: 'mpolglasel',
//     email: 'mtutel@mlb.com',
//     password: 'f3H1T0TWx8vu',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/107x248.jpg/cc0000/ffffff',
//     wins: 57,
//     gamesPlayed: 55,
//     munnyPoints: 1373,
//     isArtist: true,
//   },
//   {
//     name: 'sbutcherm',
//     email: 'csimantsm@edublogs.org',
//     password: 'XR1ryyf',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/189x113.bmp/5fa2dd/ffffff',
//     wins: 28,
//     gamesPlayed: 85,
//     munnyPoints: 508,
//     isArtist: false,
//   },
//   {
//     name: 'bhalfacreen',
//     email: 'cgamelln@prlog.org',
//     password: 'SSxcKIPTekjj',
//     isGuest: true,
//     imageUrl: 'http://dummyimage.com/237x130.bmp/ff4444/ffffff',
//     wins: 45,
//     gamesPlayed: 84,
//     munnyPoints: 584,
//     isArtist: false,
//   },
//   {
//     name: 'rshearso',
//     email: 'krosenfeldo@aol.com',
//     password: '2sCNL7ShBio',
//     isGuest: false,
//     imageUrl: 'http://dummyimage.com/209x124.bmp/ff4444/ffffff',
//     wins: 50,
//     gamesPlayed: 47,
//     munnyPoints: 984,
//     isArtist: true,
//   },
// ]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
  //   User.create({
  //     name: 'Murphy',
  //     email: 'murphy@email.com',
  //     password: '123'
  //   })
  // ])

  for (let i = 0; i < words.length; i++) {
    await Word.create(words[i])
  }

  // for (let i = 0; i < rooms.length; i++) {
  //   await Room.create(rooms[i])
  // }

  // for (let i = 0; i < users.length; i++) {
  //   await User.create(users[i])
  // }

  await User.create({
    name: 'Picasso',
    email: 'picasso.com',
    password: 'picasso',
    isGuest: false,
    imageUrl:
      'https://www.onthisday.com/images/people/pablo-picasso-medium.jpg',
    wins: 56,
    gamesPlayed: 62,
    munnyPoints: 172,
    isArtist: true,
  })

  // for (let i = 0; i < games.length; i++) {
  //   await Game.create(games[i])
  // }
  // await Game.reload()
  // console.log('GAME AT 00000000000000', Game[0])
  // await Game[0].addUser(User[0])
  // await User[0].addGame(Game[0])
  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
