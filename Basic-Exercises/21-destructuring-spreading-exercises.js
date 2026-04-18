/*
Clase 36 - Ejercicios: Desestructuración y propagación
Vídeo: https://youtu.be/1glVfFxj8a4?t=16802
*/

// 1. Usa desestructuración para extraer los dos primeros elementos de un array
console.log("\n=== Challenge 1 ===")
let [alias, role, ...personData] = ["codebydoble", "Front-end Developer", "Cuba", 2026]
console.log(">>>alias", alias)
console.log(">>>role", role)
console.log(">>>arr", personData)

// 2. Usa desestructuración en un array y asigna un valor predeterminado a una variable
console.log("\n=== Challenge 2 ===")
let [color = "red", age, city] = [, 2025, "US"]
console.log(">>>color", color)
console.log(">>>age", age)
console.log(">>>city", city)

// 3. Usa desestructuración para extraer dos propiedades de un objeto
console.log("\n=== Challenge 3 ===")
let book = {
  bookName: "Hobbit",
  editorial: "Orca",
}
let { bookName, editorial } = book
console.log(">>>book", bookName)
console.log(">>>editorial", editorial)

// 4. Usa desestructuración para extraer dos propiedades de un objeto y asígnalas
//    a nuevas variables con nombres diferentes
console.log("\n=== Challenge 4 ===")
let hotel = {
  name: "Nita Nilu Cancun",
  ranking: 5,
}
let { name: nameHotel, ranking: stars } = hotel
console.log(">>>Hotel name", nameHotel)
console.log(">>>Stars", stars, "stars.")

// 5. Usa desestructuración para extraer dos propiedades de un objeto anidado
console.log("\n=== Challenge 5 ===")
let kevin = {
  isStudent: true,
  age: 22,
  university: {
    nameUniversity: "MIT",
    carrer: "Software Engineer",
  },
}
let {
  isStudent,
  age: ageStudent,
  university: { nameUniversity },
  university: { carrer },
} = kevin
console.log(">>>University name -anidada-:", nameUniversity)
console.log(">>>University carrer -anidada-:", carrer)

// 6. Usa propagación para combinar dos arrays en uno nuevo
console.log("\n=== Challenge 6 ===")
let tokens = ["I", "V", "X", "L"]
let months = ["January", "September", "Nov", "Dec"]
let tokensMonth = [...tokens, ...months]
console.log(">>>propagación para combinar dos arrays en uno nuevo", tokensMonth)

// 7. Usa propagación para crear una copia de un array
console.log("\n=== Challenge 7 ===")
let tokensCopy = [...tokens]
console.log(">>>Copia de un array", tokensCopy)

// 8. Usa propagación para combinar dos objetos en uno nuevo
console.log("\n=== Challenge 8 ===")
let firstObj = {
  refNumber: 1,
  statusObj: "active",
}
let secondObj = {
  ref: 2,
  status: "inactive",
}
let firstAndSecondObj = { ...firstObj, ...secondObj }

console.log(">>>Usa propagación para combinar dos objetos en uno nuevo", firstAndSecondObj)
// 9. Usa propagación para crear una copia de un objeto
console.log("\n=== Challenge 9 ===")
let firstObjCopy = { ...firstObj }
console.log(">>>Copia de un objeto", firstObjCopy)

// 10. Combina desestructuración y propagación
console.log("\n=== Challenge 10 ===")
let [valueOne, valueTwo, ...arr] = ["JavaScript", 2026, ...tokens, 4, true]
console.log(">>>Combina desestructuración y propagación", valueOne)
console.log(">>>Combina desestructuración y propagación", valueTwo)
console.log(">>>Combina desestructuración y propagación", arr)
