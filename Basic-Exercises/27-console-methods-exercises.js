/*
Clase 43 - Ejercicios: Console
Vídeo: https://youtu.be/1glVfFxj8a4?t=21421
*/
"use strict"

// 1. Crea un función que utilice error correctamente
console.log("Ejercicio 1 \n")
/**
 * Function that validate balance account in experimental mode.
 * @param {Number} balance any balance bigger than 4500 usd.
 * @returns {Boolean} true if balance y bigger than 4500 usd.
 */
const officePay = (balance) => {
  try {
    if (typeof balance !== "number") {
      throw new TypeError("Wrong value: provided balance is not a number.")
    }
    return balance > 4500
  } catch (error) {
    console.error(error)
    return false
  }
}
console.info("Is your balance amazing? ", officePay("6500"))

// 2. Crea una función que utilice warn correctamente
console.log("Ejercicio 2 \n")
/**
 * Function that uses warn correctly to show information.
 * @param {Number} valueOne any number.
 * @param {Number} valueTwo any number.
 * @returns {Number} multiplication result.
 */
const useWarn = (valueOne, valueTwo) => {
  if (valueOne === 0 || valueTwo === 0) {
    console.warn("Remeber: zero in multiplication is always zero.")
    return 0
  } else {
    return valueOne * valueTwo
  }
}
const resultTwo = useWarn(12.35, 0)
console.log(resultTwo)

// 3. Crea una función que utilice info correctamente
console.log("Ejercicio 3 \n")
/**
 * Function show number values and make a shallow copy.
 * @param {Array} arr any number Array.
 * @returns {Array} a spread copy of Array.
 */
const showNums = (arr) => {
  const arrCopy = [...arr]
  console.info("Copy made")
  for (const num of arrCopy) {
    console.log(num)
  }
  return arrCopy
}
console.log(showNums([10, 45, 333, 587]))

// 4. Utiliza table
console.log("Ejercicio 4 \n")
const tableObj = [
  { name: "Yoandy", rol: "frontend" },
  { name: "Yerly", rol: "banker" },
]
console.table(tableObj)

// 5. Utiliza group
console.log("Ejercicio 5 \n")
console.group("Ex5")
console.info("Inside group Ex5.")
console.info("Still group Ex5.")
console.groupEnd("Ex5")

// 6. Utiliza time
console.log("Ejercicio 6 \n")
console.time()
function greet(nombre) {
  console.log("HI-> ", nombre)
}
console.timeEnd()
// Properly measure the greet function
console.time("greet")
greet("Alice")
console.timeEnd("greet")

// 7. Valida con assert si un número es positivo
console.log("Ejercicio 7 \n")
const testNumber = -35
console.assert(testNumber > 0, "testNumber should be positive")

// 8. Utiliza count
console.log("Ejercicio 8 \n")
let hotels = []
function addHotel(nameHotel) {
  console.count(nameHotel)
  hotels.push(nameHotel)
  return hotels
}
addHotel("Blau Varadero")
addHotel("Melia Marina")
addHotel("Sol Varadero")
addHotel("Melia Marina")

// 9. Utiliza trace
console.log("Ejercicio 9 \n")
function traceEx9(paramOne, fncOne) {
  function inner(param) {
    console.trace()
    return paramOne + param
  }
  inner(10)
}
traceEx9(3, console.log)

// 10. Utiliza clear
console.log("Ejercicio 10 \n")
console.clear()
