/*
Clase 45 - Ejercicios: Módulos
Vídeo: https://youtu.be/1glVfFxj8a4?t=22720
*/

// 1. Exporta una función
/**
 * Splits a sentence into an array of words.
 * @param {String} sentence The sentence to split.
 * @returns {Array} An array of words.
 */
export function splitSentence(sentence) {
  return sentence.split(" ")
}

// 2. Exporta una constante
export const PI = 3.14159

// 3. Exporta una clase

export class Auto {
  constructor(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
  }
}

// 4. Importa una función
import { maxNumber } from "./17-functions-exercises.js"

// 5. Importa una constante
import { userName } from "./09-conditionals-exercises.js"

// 6. Importa una clase

import { Laptop } from "./23-classes-exercises.js"

// 7. Exporta una función, una constante y una clase por defecto (en caso de que lo permita)
export default function isPrime(paramNumber) {
  if (paramNumber <= 1) {
    return false
  }
  for (let index = 1; index < paramNumber; index++) {
    //const element = array[index]
    if (index > 1) {
      if (paramNumber % index === 0) {
        return false
      }
    }
  }
  return true
}

// 8. Importa una función, una constante y una clase por defecto (en caso de que lo permita)
import greetings from "./03-beginner-exercises.js"

// 9. Exporta una función, una constante y una clase desde una carpeta

// 10. Importa una función, una constante y una clase desde un directorio diferente al anterior
