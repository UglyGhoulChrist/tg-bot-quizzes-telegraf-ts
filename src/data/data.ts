import { dataAnimals09 } from './dataAnimals09'
import { dataAnimals1019 } from './dataAnimals1019'
import { dataSpaces09 } from './dataSpaces09'
import { dataSpaces1019 } from './dataSpaces1019'
import { IData } from './interface.data'

// Объект викторин, хранящий все викторины
// Ключом является строка, представляющая категорию викторины,
// значением - описание викторины и список вопросов
export const data: IData = {
    animals: {
        description: 'Викторина про животных',
        listQuestions: [...dataAnimals09, ...dataAnimals1019,],
    },
    spaces: {
        description: 'Викторина про космос',
        listQuestions: [...dataSpaces09, ...dataSpaces1019,],
    },
}
