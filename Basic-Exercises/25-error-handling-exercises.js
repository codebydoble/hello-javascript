/*
Clase 41 - Ejercicios: Manejo de errores
Vídeo: https://youtu.be/1glVfFxj8a4?t=20392
*/
console.log("=== Clase 41 Ejercicios ===\n Ejercio 1")

// 1. Captura una excepción utilizando try-catch
let users = []
/**
 * Function that insert user into object.
 * @param {String} user any username.
 * @param {String} name any personal name.
 * @param {String} pass any password code for user.
 * @returns {Array} array users object.
 */
const createUser = (user, nameUser, pass) => {
  try {
    if (typeof user !== "string") throw new TypeError(`Type of ${user} must by string.`)
    if (typeof nameUser !== "string") throw new TypeError(`Type of ${nameUser} must by string.`)
    if (pass.length < 8) throw new EvalError(`The password minimun length must by 8.`)
    users.push({ user, nameUser, pass })
    return users
  } catch (error) {
    if (error instanceof TypeError) {
      return `Type Error: ${error.message}`
    } else {
      return `Eval Error: ${error.message}`
    }
  }
}
const firstUser = createUser("codebydoble", "Yoandy", "Finally123*")
console.log(firstUser)

// 2. Captura una excepción utilizando try-catch y finally
console.log("\n=== Ejercicio 2 ===")
/**
 * Function that remove blank space and replace by "-"
 * @param {String} str any sentence.
 * @returns {String} sentence replaced blank space by "-"
 */
const fncSwitchSpace = (str) => {
  try {
    if (!str) {
      throw new Error(`Empty sentence.`)
    }
    console.log(str.replace(/\s+/g, "-"))
    return str.replace(/\s+/g, "-")
  } catch (error) {
    console.log(error.message)
  } finally {
    console.log(`Please review the information.`)
  }
}

fncSwitchSpace("My name is Yoandy Doble Herrera")

// 3. Lanza una excepción genérica
console.log("\n=== Ejercicio 3 ===")
/**
 * Function that verify if a search parameter appears in the sentence.
 * @param {String} sentence
 * @param {String} searchValue
 * @returns {Boolean} return true if included and false if not.
 */
function verify(sentence, searchValue) {
  try {
    if (searchValue === "") {
      // Excepción genérica
      throw new Error("Generic error: Empty search value.")
    }
    return sentence.includes(searchValue)
  } catch (error) {
    return error.message
  }
}
console.log(verify("very 23", "23"))

// 4. Crea una excepción personalizada
console.log("\n=== Ejercicio 4 ===")
class PersonalError extends Error {}

// 5. Lanza una excepción personalizada
console.log("\n=== Ejercicio 5 ===")

/**
 * Function that verify if a search parameter appears in the sentence.
 * @param {String} sentence
 * @param {String} searchValue
 * @returns {Boolean} return true if included and false if not.
 */
function verifyTwo(sentence, searchValue) {
  try {
    if (searchValue === "") {
      // Excepción genérica
      throw new PersonalError("Defined Error: Empty search value.")
    }
    return sentence.includes(searchValue)
  } catch (error) {
    if (error instanceof PersonalError) {
      return error.message
    } else {
      return `Generic error: ${error.message}`
    }
  }
}
console.log(verifyTwo("very 23", "23"))

// 6. Lanza varias excepciones según una lógica definida
console.log("\n=== Ejercicio 6 ===")
let aNumber = "36.58"
/**
 * Function to throw diff exceptions.
 * @param {Number} num any number.
 * @returns {Number} number exponential by 2.
 */
function otherEx(num) {
  try {
    if (typeof num !== "number") {
      throw new Error(`${num} isn't a number.`)
    } else if (num < 0) {
      throw new Error(`${num} is negative.`)
    } else {
      return num ** 2
    }
  } catch (error) {
    return error.message
  }
}
console.log(otherEx(aNumber))

// 7. Captura varias excepciones en un mismo try-catch
console.log("\n=== Ejercicio 7 ===")
/*try {
  if (typeof numOne !== "number") {
    throw new TypeError(`Type Error: ${numOne} isn't a number.`)
  } else if (numOne < 0) {
    throw new RangeError(`Range Error: ${numOne} is negative.`)
  } else {
    return numOne ** 2
  }
} catch (error) {
  if (error instanceof TypeError) {
    return error.message
  } else if (error instanceof RangeError) {
    return error.message
  } else {
    return `Generic error: ${error.message}`
  }
}*/

/**
 * Function to throw diff exceptions and catch it.
 * @param {Number} num any number.
 * @returns {Number} number exponential by 2.
 */
function catchEx(num) {
  try {
    if (typeof num !== "number") {
      throw new TypeError(`${num} isn't a number.`)
    } else if (num < 0) {
      throw new RangeError(`${num} is negative.`)
    } else {
      return num ** 2
    }
  } catch (error) {
    if (error instanceof TypeError) {
      return `Type Error: ${error.message}`
    } else if (error instanceof RangeError) {
      return `Range Error: ${error.message}`
    } else {
      return `Generic error: ${error.message}`
    }
  }
}
console.log(catchEx(aNumber))

// 8. Crea un bucle que intente transformar a float cada valor y capture y muestre los errores
console.log("\n=== Ejercicio 8 ===")
const arr = ["12", "false", "null", "3.6", "-6.25", "true"]
let arrFloat = []
for (let value of arr) {
  try {
    if (!Number.isNaN(Number.parseFloat(value))) {
      arrFloat.push(value)
      console.log(value + " parsed to float.")
    } else {
      throw new TypeError(`${value} couldn't parse to float.`)
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Type Error: " + error.message)
      continue
    }
  }
}

// 9. Crea una función que verifique si un objeto tiene una propiedad específica y lance una excepción personalizada
console.log("\n=== Ejercicio 9 ===")
class MissingPropertyObjectError extends Error {}

/**
 * Función que verifique si un objeto tiene una propiedad específica y lance una excepción personalizada
 * @param {Object} obj any object.
 * @param {String|Number|null|undefined|Symbol|Object|Array|BigInt} prop any property value.
 * @returns {Boolean}
 */
const checkProperty = (obj, prop) => {
  try {
    if (prop in obj) {
      return true
    } else {
      throw new MissingPropertyObjectError(`${prop} isn't a property of the object.`)
    }
  } catch (error) {
    if (error instanceof MissingPropertyObjectError) {
      return `Missing Property Error: ${error.message}`
    } else {
      return error.message
    }
  }
}

console.log(checkProperty({ id: 1, name: "Yoandy" }, "isEngineer"))

// 10. Crea una función que realice reintentos en caso de error hasta un máximo de 10
console.log("\n=== Ejercicio 10 ===")

function untilTen(param) {
  for (let index = 0; index < 10; index++) {
    try {
      if (param < 0) {
        throw new Error("Negative value.")
      } else {
        return param ** 2
      }
    } catch (error) {
      console.log(error)
    }
  }
}

console.log(untilTen(-5))
