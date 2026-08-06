/*
Clase 12 - Funciones avanzadas
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=4112
*/

// 1. Crea una función que retorne a otra función
console.log("Ejercicio 1 \n")

/**
 * Function that returns another function.
 * @param {String} name building name.
 * @param {Number} year year of construction.
 * @param {Number} price price house.
 * @returns {Function} Function that returns an object with {name,year,price,owner}
 */
const generateHouse = (name = "Temporary", year = 2026, price = 1000000) => {
  return (owner) => {
    return { name, year, price, owner }
  }
}
const mickeyHouse = generateHouse("Imperial", 2024, 12000000)
const mickeyHouseOwner = mickeyHouse("Brayan Zaragoza")
console.log(mickeyHouseOwner)

// 2. Implementa una función currificada que multiplique 3 números
console.log("Ejercicio 2 \n")

/**
 * Función currificada que multiplique 3 números.
 * @param {number} numOne any number.
 * @returns {number} multiply numbers.
 */
const multiplyCurry = (numOne) => {
  return (numTwo) => {
    return (numThree) => {
      return numOne * numTwo * numThree
    }
  }
}
const curryResult = multiplyCurry(4)(2)(8)
console.log("Función currificada " + curryResult)

// 3. Desarrolla una función recursiva que calcule la potencia de un número elevado a un exponente
console.log("Ejercicio 3 \n")

/**
 * Función recursiva que calcule la potencia de un número elevado a un exponente.
 * @param {Number} num cualquier numero.
 * @param {Number} exponential exponente del numero.
 * @returns {Number} devuelve la potencia de un numero elevado a un exponente.
 */
function potencia(base, exponent) {
  if (exponent === 0) return 1

  if (exponent < 0) {
    return 1 / potencia(base, -exponent)
  }

  return base * potencia(base, exponent - 1)
}
console.log("Potencia de 8 con exponente 3 ", potencia(8, 3))

// 4. Crea una función createCounter() que reciba un valor inicial y retorne un objeto con métodos para increment(), decrement() y getValue(), utilizando un closure para mantener el estado
console.log("Ejercicio 4 \n")

/**
 * Crea una función createCounter() que reciba un valor inicial y retorne un objeto con métodos para increment(), decrement() y getValue(), utilizando un closure para mantener el estado.
 * @param {Number} initialValue cualquier numero.
 * @returns {Object} retorna un objeto con métodos para increment(), decrement() y getValue()
 */
function createCounter(initialValue) {
  let actualValue = initialValue
  return {
    increment: function () {
      actualValue++
    },
    decrement: function () {
      actualValue--
    },
    getValue: function () {
      return actualValue
    },
  }
}
let objCounter = createCounter(10)
objCounter.increment()
objCounter.increment()
objCounter.increment()
objCounter.increment()
console.log(objCounter.getValue())

// 5. Crea una función sumManyTimes(multiplier, ...numbers) que primero sume todos los números (usando parámetros Rest) y luego multiplique el resultado por multiplier
console.log("Ejercicio 5 \n")

/**
 * Función sumManyTimes(multiplier, ...numbers) que primero sume todos los números (usando parámetros Rest) y luego multiplique el resultado por multiplier.
 * @param {Number} multiplier cualquier numero.
 * @param  {Number[]} numbers arreglo de numeros.
 * @returns {Number} resultado por multiplier.
 */
function sumManyTimes(multiplier, ...numbers) {
  const sumResult = numbers.reduce((prev, current) => prev + current, 0)
  return sumResult * multiplier
}
console.log("Sum Many Times ", sumManyTimes(5, 1, 2, 5))

// 6. Crea un Callback que se invoque con el resultado de la suma de todos los números que se le pasan a una función
console.log("Ejercicio 6 \n")

/**
 * Callback que se invoque con el resultado de la suma de todos los números que se le pasan a una función.
 * @param {Function} callback function callback.
 * @param  {...Number[]} numbers numbers collection.
 */
function callbackSum(callback, ...numbers) {
  let sum = 0
  for (const num of numbers) {
    sum += num
  }
  callback(sum)
}
callbackSum(console.log, 6, 8, 10, 3)

// 7. Desarrolla una función parcial
console.log("Ejercicio 7 \n")
const multiply = (a, b, c) => a * b * c
const partial = (fnc, a) => {
  return (b, c) => {
    return fnc(a, b, c)
  }
}
const multiplyByTwo = partial(multiply, 2)
console.log(multiplyByTwo(3, 4))

// 8. Implementa un ejemplo que haga uso de Spread
console.log("Ejercicio 8 \n")
/**
 * Implementa un ejemplo que haga uso de Spread
 * @param {String} name cualquier nombre
 * @param {String} lastName cualquier nombre.
 */
function showName(name, lastName) {
  console.log(`My fullname is: ${name} ${lastName}`)
}
const nameYou = ["Yoandy", "Doble Herrera"]
showName(...nameYou)

// 9. Implementa un retorno implícito
console.log("Ejercicio 9 \n")
/**
 * Ejemplo de retorno implícito
 * @param {Object[]} students array of students.
 * @returns {Object[]} approved students.
 */
const studentAproved = (students) => students.filter((student) => student.score >= 60)
const groupTen = [
  { name: "Yoandy", score: 93 },
  { name: "Kevin", score: 57 },
  { name: "Briyi", score: 90 },
]
console.log(studentAproved(groupTen))

// 10. Haz uso del this léxico
console.log("Ejercicio 10 \n")

/**
 * Uso del this léxico.
 * @param {Object[]} students array of students.
 * @returns {Function} modify a student by id.
 */
const modifyStudent = (students) => {
  return (id) => {
    return {
      name: students[id].name,
      score: students[id].score,
      getStudent() {
        const format = () => {
          return `Student: ${this.name} ${this.score}`
        }

        return format()
      },
    }
  }
}

const studentHandlers = modifyStudent(groupTen)
const objAlumni = studentHandlers(0)
console.log(objAlumni.getStudent())
