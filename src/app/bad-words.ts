import { Filter } from 'bad-words'


const Filter = new Filter()

Filter.addWords('some', 'bad', 'word')

Filter.clean('some bad word!') //**** *** ****!

//or use an array using the spread operator

const newBadWords = ['some', 'bad', 'word']

Filter.addWords(...newBadWords)

Filter.clean('some bad word!') //**** *** ****!

//or

const filter = new Filter({ list: ['some', 'bad', 'word'] })

Filter.clean('some bad word!') //**** *** ****!