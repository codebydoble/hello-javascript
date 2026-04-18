/*
Clase 32 - Ejercicios: Funciones
Vídeo: https://youtu.be/1glVfFxj8a4?t=14146
*/

// NOTA: Explora diferentes sintaxis de funciones para resolver los ejercicios

// 1. Crea una función que reciba dos números y devuelva su suma
console.log("\n=== Challenge 1 ===")
/**
 * Función que recibe dos números y devuelve su suma.
 * @param {Number} numberOne Un número.
 * @param {Number} numberTwo Un número.
 * @returns {Number} devuelve la suma de dos números.
 */
const sumar = function (numberOne, numberTwo) {
  return numberOne + numberTwo
}
console.log(">>>Suma", sumar(11, 12))

// 2. Crea una función que reciba un array de números y devuelva el mayor de ellos
console.log("\n=== Challenge 2 ===")
const numbers = [10, 9, 87, 54, 0, -999, 86, 24, 22, 3]

/**
 * Función que reciba un array de números y devuelva el mayor de ellos
 * @param {Array} array any number array.
 * @returns {Number} devuelve el mayor de todos los numeros de array.
 */
const maxNumber = function (array) {
  let maximun = -Infinity
  for (const aNumber of numbers) {
    if (aNumber > maximun) {
      maximun = aNumber
    }
  }
  return maximun
}
console.log(">>>Max", maxNumber(numbers))

// 3. Crea una función que reciba un string y devuelva el número de vocales que contiene
console.log("\n=== Challenge 3 ===")

/**
 * Función que reciba un string y devuelva el número de vocales que contiene
 * @param {String} sentence any sentence.
 * @returns {Number} devuelve el número de vocales que contiene.
 */
const countVocals = function (sentence) {
  const vocals = new Set(["a", "e", "i", "o", "u"])
  let result = 0
  for (const word of sentence) {
    if (vocals.has(word)) {
      result++
    }
  }
  return result
}
const myDocument = "JavaScript is a programming language. JavaScript is widely used."
console.log(">>>Total de vocales", countVocals(myDocument))

// 4. Crea una función que reciba un array de strings y devuelva un nuevo array con las strings en mayúsculas
console.log("\n=== Challenge 4 ===")

/**
 * Función que reciba un array de strings y devuelva un nuevo array con las strings en mayúsculas
 * @param {Array} strArr Cualquier array de strings.
 * @returns {Array} Devuelve un nuevo array con las strings en mayúsculas.
 */
const upperStr = function (strArr) {
  return strArr.map((str) => String(str).toUpperCase())
}

const docEx4 = ["JavaScript", "is", "a", "programming", "language.", "JavaScript", "is", "widely", "used."]
console.log(">>>Strings en mayúsculas", upperStr(docEx4))

// 5. Crea una función que reciba un número y devuelva true si es primo, y false en caso contrario
console.log("\n=== Challenge 5 ===")

/**
 * Función que reciba un número y devuelva true si es primo, y false en caso contrario.
 * @param {Number} paramNumber cualquier número.
 * @returns {Boolean} Devuelve true si es primo, y false en caso contrario.
 */
const isPrime = function (paramNumber) {
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
console.log(">>>Check isPrime", isPrime(8))

// 6. Crea una función que reciba dos arrays y devuelva un nuevo array que contenga los elementos comunes entre ambos
console.log("\n=== Challenge 6 ===")

/**
 * Función que reciba dos arrays y devuelva un nuevo array que contenga los elementos comunes entre ambos.
 * @param {Array} arrOne any array.
 * @param {Array} arrTwo any array.
 * @returns {Array} devuelva un nuevo array que contenga los elementos comunes entre ambos
 */
const commons = function (arrOne, arrTwo) {
  let result = new Set()

  for (const element of arrOne) {
    if (arrTwo.includes(element)) {
      result.add(element)
    }
  }
  return Array.from(result)
}

const docEx6Arr1 = ["JavaScript", "is", "a", "programming", "language.", "JavaScript", "is", "widely", "used."]
const docEx6Arr2 = [
  "Python",
  "is",
  "a",
  "programming",
  "language.",
  "JavaScript",
  "is",
  "widely",
  "used",
  "for",
  "web",
  "developers.",
]
console.log(">>>Elementos comunes", commons(docEx6Arr1, docEx6Arr2))

// 7. Crea una función que reciba un array de números y devuelva la suma de todos los números pares
console.log("\n=== Challenge 7 ===")

/**
 * Función que reciba un array de números y devuelva la suma de todos los números pares.
 * @param {Array} arr Un array de números.
 * @returns {Number} Devuelva la suma de todos los números pares.
 */
const paresTotal = function (arr) {
  let result = 0
  arr.forEach((aNumber) => {
    if (aNumber % 2 === 0) {
      result += aNumber
    }
  })
  return result
}
console.log(">>>Suma de pares en array", paresTotal(numbers))

// 8. Crea una función que reciba un array de números y devuelva un nuevo array con cada número elevado al cuadrado
console.log("\n=== Challenge 8 ===")
/**
 * Función que reciba un array de números y devuelva un nuevo array con cada número elevado al cuadrado
 * @param {Array} arr Un array de números.
 * @returns {Number} Devuelve un nuevo array con cada número elevado al cuadrado.
 */
const toSqrt = function (arr) {
  let arrSqrt = []
  arr.forEach((number) => {
    arrSqrt.push(Math.pow(number, 2))
  })
  return arrSqrt
}

let numerosEx8 = [5, 66, 11, 32, 8, 7, 99]
console.log(">>>Números elevados al cuadrado", toSqrt(numerosEx8))

// 9. Crea una función que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso
console.log("\n=== Challenge 9 ===")
/**
 * Función que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso.
 * @param {String} sentence any sentence.
 * @returns {String} Devuelve la misma cadena con las palabras en orden inverso.
 */
const reverseText = function (sentence) {
  return sentence.split(" ").toReversed()
}

let iaText =
  "Las IA, o inteligencias artificiales, son sistemas informáticos diseñados para realizar tareas que normalmente requieren inteligencia humana, como el aprendizaje, la percepción, el razonamiento y la toma de decisiones. Estos sistemas utilizan algoritmos y datos para simular capacidades humanas y mejorar la eficiencia en diversas áreas, como la medicina, la manufactura, el comercio y más."
console.log(">>>Palabras en orden inverso", reverseText(iaText))
// 10. Crea una función que calcule el factorial de un número dado
console.log("\n=== Challenge 10 ===")
/**
 * Calcula el factorial de un número.
 * @param {number} aNumber El número del que se calculará el factorial.
 * @returns {number} El factorial del número.
 */
const factorial = (aNumber) => {
  if (aNumber === 0) {
    return 1
  } else {
    return factorial(aNumber - 1) * aNumber
  }
}

console.log(">>>Factorial de 8:", factorial(8))
