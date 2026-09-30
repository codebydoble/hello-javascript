/*
Clase 45 - Asincronía
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=14558
*/
"use strict"
// 1. Crea una función para saludar que reciba un nombre y un callback.
//    El callback debe ejecutarse después de 2 segundos y mostrar en consola "Hola, [nombre]".
console.log("\n Exercise 1. Callback + setTimeout \n")

/**
 * Async function must wait **2 seconds** and then execute the callback to display: Hola, [nombre]
 * @param {String} name the person's name.
 * @param {Function} callback a function executed after 2 seconds.
 */
const greet = (name, callback) => {
  const message = `Hola, ${name}`
  setTimeout(() => {
    callback(message)
  }, 2000)
}

/**
 * Function generic, act as callback. Simple console.log
 * @param {String} message the message in string mode.
 */
const callback = (message) => {
  console.log(message)
}

greet("Yoandy", callback)

// 2. Crea tres funciones task1(callback), task2(callback) y task3(callback).
//    Cada función debe tardar 1 segundo en ejecutarse y luego llamar al callback.
console.log("\n Exercise 2. Sequential Callback Tasks \n")

/**
 * Asynchronous tasks number 1 and takes 1 seg.
 * @param {Function} callback any asynchronous tasks.
 */
function task1(callback) {
  setTimeout(() => {
    console.log("Task 1 completed")
    callback()
  }, 1000)
}

/**
 * Asynchronous tasks number 2 executes after task 1 and takes 1 seg.
 * @param {Function} callback any asynchronous tasks.
 */
function task2(callback) {
  setTimeout(() => {
    console.log("Task 2 completed")
    callback()
  }, 1000)
}

/**
 * Asynchronous tasks number 3 executes after task 2 and takes 1 seg.
 * @param {Function} callback any asynchronous tasks.
 */
function task3(callback) {
  setTimeout(() => {
    console.log("Task 3 completed")
    callback()
  }, 1000)
}

task1(() => {
  task2(() => {
    task3(() => {})
  })
})

// 3. Crea una función para verificar un número que retorne una Promesa.
//    Si el número es par, la promesa se resuelve con el mensaje "Número par".
//    Si el número es impar, la promesa se rechaza con el mensaje "Número impar".
console.log("\n Exercise 3. Promise: Resolve or Reject \n")
/**
 * Function that determines whether a number is even or odd using a **Promise**.
 * @param {Number} number a JavaScript number.
 * @returns {Promise} a JavaScript Promise. Resolve message: `Número par`. Reject message: `Número impar`.
 */
const checkNumber = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (typeof number !== "number" || Number.isNaN(number)) throw new TypeError(`Type Error, invalid value.`)
        if (number % 2 === 0) {
          resolve("Número par")
        } else {
          reject("Número impar")
        }
      } catch (error) {
        console.log(`Input -> ${number}, Error:`, error.message)
        return null
      }
    }, 100)
  })
}

checkNumber("Yoandy")
  .then((response) => console.log(response))
  .catch((response) => console.log(response))

checkNumber(8)
  .then((response) => console.log(response))
  .catch((response) => console.log(response))

checkNumber(7)
  .then((response) => console.log(response))
  .catch((response) => console.log(response))

// 4. Crea tres funciones que devuelvan promesas:
//    firstTask(): tarda 1s y muestra "Primera tarea completada".
//    secondTask(): tarda 2s y muestra "Segunda tarea completada".
//    thirdTask(): tarda 1.5s y muestra "Tercera tarea completada".
console.log("\n Exercise 4. Sequential Promises \n")

/**
 * Asynchronous tasks number 1 using Promise and takes 1 seg.
 * @returns {Promise} the correspondig promise.
 */
function firstTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Primera tarea completada")
    }, 1000)
  })
}

/**
 * Asynchronous tasks number 2 using Promise executes after task1 and takes 2 seg.
 * @returns {Promise} the correspondig promise.
 */
function secondTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Segunda tarea completada")
    }, 2000)
  })
}

/**
 * Asynchronous tasks number 3 using Promise executes after task 2 and takes 1.5 seg.
 * @returns {Promise} the correspondig promise.
 */
function thirdTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Tercera tarea completada")
    }, 1500)
  })
}

firstTask()
  .then((response) => {
    console.log(response)
    return secondTask()
  })
  .then((response) => {
    console.log(response)
    return thirdTask()
  })
  .then((response) => console.log(response))

// 5. Transforma el ejercicio anterior de Promesas en una función async/await llamada executeTasks().
console.log("\n Exercise 5. Convert Promise Chaining to async/await \n")

/**
 * Rewrite Exercise 4 using `async/await` while preserving exactly the same behavior.
 */
const executeTasks = async () => {
  const firstTaskResponse = await firstTask()
  console.log(firstTaskResponse)
  const secondTaskResponse = await secondTask()
  console.log(secondTaskResponse)
  const thirdTaskResponse = await thirdTask()
  console.log(thirdTaskResponse)
}

executeTasks()

// 6. Crea una función getUser(id) que devuelva una promesa y simule una llamada a una API (que se demore 2s).
//    Si el id es menor a 5, la promesa se resuelve con { id, nombre: "Usuario " + id }.
//    Si el id es 5 o mayor, la promesa se rechaza con el mensaje "Usuario no encontrado".
//    Usa async/await para llamar a getUser(id) y maneja los errores con try/catch.
console.log("\n Exercise 6. Simulated API + Error Handling \n")

/**
 * Function that simulate an API request that searches for a user by ID and correctly handle both success and failure.
 * @param {Number} id any number ID.
 * @returns {Promise} the correspondig API request promise response/reject.
 */
const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (typeof id !== "number" || Number.isNaN(id)) throw new TypeError(`Invalid value.`)
        if (id === null) throw new Error(`Null value.`)
        if (id < 5) {
          resolve({ id, nombre: "Usuario " + id })
        } else {
          reject("Usuario no encontrado")
        }
      } catch (error) {
        if (error instanceof TypeError) {
          console.log(`Input -> ${id}, Type Error: ${error.message}`)
        } else {
          console.log(`Input -> ${id}, Error: ${error.message}`)
        }
        return null
      }
    }, 2000)
  })
}

/* I think this is a better approach. I used async/await here to call getUser(id) */
/**
 * Function to call getUser.
 * @param {Number} id corresponding to user by ID.
 * @returns {Promise} the current promise.
 */
const apiResquest = async (id) => {
  const userByID = await getUser(id)
  return userByID
}

for (const ids of [3, 5]) {
  const idsResponse = apiResquest(ids)
  idsResponse.then((response) => console.log(response)).catch((reason) => console.log(reason))
}

// 7. Intenta predecir el resultado de este código antes de ejecutarlo en la consola:
//    console.log("Inicio") // 1 -> call stack
//    setTimeout(() => console.log("setTimeout ejecutado"), 0) // 4 -> Pick one Macrotask
//    Promise.resolve().then(() => console.log("Promesa resuelta")) // 3 -> Microtask event loop drain all microtask
//    console.log("Fin") // 2 -> call stack
console.log("\n Exercise 7. Event Loop \n")
// Response:
/**

Inicio
Fin
Promesa resuelta
setTimeout ejecutado

 */
console.log("Inicio") // Executed at first it's in -> call stack.
setTimeout(() => console.log("setTimeout ejecutado"), 0) // Executed at fourth. If call stack is empty and all microtask queque -> Pick one Macrotask queque
Promise.resolve().then(() => console.log("Promesa resuelta")) // Executed at third it's a Microtask queque. Event loop arquitecture drain all microtask  queque after call stack.
console.log("Fin") // Executed at second it's in -> call stack

// 8. Crea tres funciones que devuelvan promesas con tiempos de espera distintos.
//    A continuación, usa Promise.all() para ejecutarlas todas al mismo tiempo y mostrar "Todas las promesas resueltas" cuando terminen.
console.log("\n Exercise 8. `Promise.all()` and Concurrent Execution \n")

/**```text
task1 → 1000 ms
task2 → 2000 ms
task3 → 1500 ms
``` */
/**
 * Funtion task 1 that takes 1 seg.
 * @returns {Promise} the current promise.
 */
const job1 = () => {
  return new Promise((resolve) => setTimeout(() => resolve("Job 1 done."), 1000))
}

/**
 * Funtion task 2 that takes 1 seg.
 * @returns {Promise} the current promise.
 */
const job2 = () => {
  return new Promise((resolve) => setTimeout(() => resolve("Job 2 done."), 2000))
}

/**
 * Funtion task 3 that takes 1 seg.
 * @returns {Promise} the current promise.
 */
const job3 = () => {
  return new Promise((resolve) => setTimeout(() => resolve("Job 3 done."), 1500))
}

Promise.all([job1(), job2(), job3()])
  .then(([onfulfilled1, onfulfilled2, onfulfilled3]) => {
    console.log("Todas las promesas resueltas")
  })
  .catch((error) => {
    console.log("Error function rejected: ", error.message)
  })

// 9. Crea una función waitSeconds(segundos) que use setTimeout dentro de una Promesa para esperar la cantidad de segundos indicada.
//    A continuación, usa async/await para que se espere 3 segundos antes de mostrar "Tiempo finalizado" en consola.
console.log("\n Exercise 9. Promise-Based Delay \n")

/**
 * Función waitSeconds(segundos) que use setTimeout dentro de una Promesa para esperar la cantidad de segundos indicada.
 * @param {Number} segundos any time segs.
 * @returns {Promise} Promesa retornada despues de la cantidad de segundos indicada.
 */
const waitSeconds = (segundos) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof segundos !== "number" || Number.isNaN(segundos)) throw new TypeError(`Invalid value.`)
      if (segundos < 0) throw new RangeError("Negative value.")
      if (segundos === 0) {
        setTimeout(() => {
          resolve(`Ex 9. tarea resuelta ${segundos}`)
        }, 0)
      } else {
        setTimeout(() => {
          resolve(`Ex 9. tarea resuelta ${segundos}`)
        }, segundos * 1000)
      }
    } catch (error) {
      console.log(`Input -> ${segundos}, Type Error: ${error.message}`)
      return null
    }
  })
}

setTimeout(async () => {
  await waitSeconds(3)
  console.log("Tiempo finalizado")
}, 3000)

// 10. Crea una simulación de un cajero automático usando asincronía.
//     - La función checkBalance() tarda 1s y devuelve un saldo de 500$.
//     - La función withdrawMoney(amount) tarda 2s y retira dinero si hay suficiente saldo, o devuelve un error si no hay fondos.
//     - Usa async/await para hacer que el usuario intente retirar 300$ y luego 300$ más.
//
//     Posible salida esperada:
//     Saldo disponible: 500$
//     Retirando 300$...
//     Operación exitosa, saldo restante: 200$
//     Retirando 300$...
//     Error: Fondos insuficientes
console.log("\n Exercise 10. Asynchronous ATM\n")
let balanceYoandy = 500
/**
 * Function that check account balance and return 500$, delay 1s.
 * @returns {Promise} the current balance.
 */
const checkBalance = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(balanceYoandy)
    }, 1000)
  })
}

/**
 * Function that attemps withdraw money. If sufficient balance withdraw otherwise balance remain untouch.
 * @param {Number} amount money to withdraw.
 * @returns {Promise} If sufficient balance resolve otherwise reject.
 */
const withdrawMoney = (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //let currentBalance
      const balance = checkBalance()
      balance
        .then((balanceResponse) => {
          if (balanceResponse < amount) {
            reject("Fondos insuficientes")
          } else {
            balanceYoandy = balanceResponse - amount
            resolve(balanceYoandy)
          }
        })
        .catch((reason) => console.log("Error: ", reason))
    }, 2000)
  })
}

/**
 *
 *
 */

/**
 * ATM Usa async/await para hacer que el usuario intente retirar 300$ y luego 300$ más.
 * Posible salida esperada:
 * - Saldo disponible: 500$
 * - Retirando 300$...
 * - Operación exitosa, saldo restante: 200$
 * - Retirando 300$...
 * - Error: Fondos insuficientes
 */
const atm = async () => {
  try {
    const balance = await checkBalance()
    console.log(`Saldo disponible: ${balance}$`)
    console.log(`Retirando 300$...`)
    const draw300 = await withdrawMoney(300)
    console.log(`Operación exitosa, saldo restante: ${draw300}$`)
    console.log(`Retirando 300$...`)
    const drawAnother300 = await withdrawMoney(300)
    console.log(`Operación exitosa, saldo restante: ${drawAnother300}$`)
  } catch (error) {
    console.log(error)
  }
}

atm()
