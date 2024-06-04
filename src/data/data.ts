import { IData } from './interface.data'
import { dataAnimals } from './dataAnimals'
import { dataSpaces } from './dataSpaces'
import { dataInsects } from './dataInsects'

// Объект викторин, хранящий все викторины
// Ключом является строка, представляющая категорию викторины,
// значением - описание викторины и список вопросов
export const data: IData = {
    animals: {
        description: 'Викторина про животных',
        listQuestions: dataAnimals,
    },
    spaces: {
        description: 'Викторина про космос',
        listQuestions: dataSpaces,

    },
    insects: {
        description: 'Викторина про насекомых и маленьких обитателей природы',
        listQuestions: dataInsects,
    }
}
