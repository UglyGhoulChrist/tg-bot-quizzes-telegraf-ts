import { IData } from './interface.data'
import { dataAnimals04 } from './dataAnimals04'
import { dataAnimals59 } from './dataAnimals59'
import { dataAnimals1014 } from './dataAnimals1014'
import { dataAnimals1519 } from './dataAnimals1519'
import { dataSpaces59 } from './dataSpaces59'
import { dataSpaces04 } from './dataSpaces04'
import { dataSpaces1014 } from './dataSpaces1014'
import { dataSpaces1519 } from './dataSpaces1519'

// Объект викторин, хранящий все викторины
// Ключом является строка, представляющая категорию викторины,
// значением - описание викторины и список вопросов
export const data: IData = {
    animals: {
        description: 'Викторина про животных',
        listQuestions: [...dataAnimals04, ...dataAnimals59, ...dataAnimals1014, ...dataAnimals1519,],
    },
    spaces: {
        description: 'Викторина про космос',
        listQuestions: [...dataSpaces04, ...dataSpaces59, ...dataSpaces1014, ...dataSpaces1519,],
    }
}
