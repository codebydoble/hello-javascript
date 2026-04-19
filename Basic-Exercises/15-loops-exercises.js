/*
Clase 30 - Ejercicios: Bucles
Vídeo: https://youtu.be/1glVfFxj8a4?t=12732
*/

// NOTA: Explora diferentes sintaxis de bucles para resolver los ejercicios

// 1. Crea un bucle que imprima los números del 1 al 20
console.log("\n=== Challenge 1 -for method- ===")
for (let index = 1; index < 21; index++) {
  console.log(">>>Number", index)
}

console.log("\n=== Challenge 1 -while method- ===")
let counter = 1
while (counter < 21) {
  console.log(">>>Number", counter)
  counter++
}

// 2. Crea un bucle que sume todos los números del 1 al 100 y muestre el resultado
console.log("\n=== Challenge 2 -for method- ===")
let result = 0
for (let index = 1; index < 101; index++) {
  result += index
}
console.log(">>>Sum 1 to 100:", result)

// 3. Crea un bucle que imprima todos los números pares entre 1 y 50
console.log("\n=== Challenge 3 -for method- ===")
for (let index = 1; index < 51; index++) {
  if (index % 2 === 0) console.log(">>>Par between 1 - 50:", index)
}

// 4. Dado un array de nombres, usa un bucle para imprimir cada nombre en la consola
console.log("\n=== Challenge 4 -forof method - ===")
const usCitizens = ["Kevin", "John", "Kate", "Lincoln", "Abigail", "April", "Abraham", "Jason"]
for (const names of usCitizens) {
  console.log(">>>Names:", names)
}

// 5. Escribe un bucle que cuente el número de vocales en una cadena de texto
console.log("\n=== Challenge 5 -forof, foreach method - ===")
const textDocument = "JavaScript is a programming language. JavaScript is widely used."
const vocals = new Set(["a", "e", "i", "o", "u"])
let vocalsTotal = 0
for (const char of textDocument) {
  if (vocals.has(char)) {
    vocalsTotal++
  }
}
console.log(">>>Vocals count:", vocalsTotal)

/*Apariciones de las vocales*/
console.log("\n=== Challenge 5 - Alternative - ===")
let mapVocals = new Map()
let countVocals = 0
for (const word of textDocument) {
  if (vocals.has(word)) {
    mapVocals.set(word, (mapVocals.get(word) || 0) + 1)
    countVocals++
  }
}
mapVocals.forEach((value, key) => console.log(">>>Vocal:", key, "counts:", value))

// 6. Dado un array de números, usa un bucle para multiplicar todos los números y mostrar el producto
console.log("\n=== Challenge 6 - for method - ===")
let resultEx6 = 1
const numerals = [2, 3, 4, 10, 2]
for (let index = 0; index < numerals.length; index++) {
  resultEx6 *= numerals[index]
}
console.log(">>>Result", resultEx6)

// 7. Escribe un bucle que imprima la tabla de multiplicar del 5
console.log("\n=== Challenge 7 - while method - ===")
const five = 5
let countEx7 = 0
let resultEx7 = new Map()

while (countEx7 < 11) {
  resultEx7.set(`5 x ${countEx7}`, five * countEx7)
  countEx7++
}
console.log(">>>Tabla de multiplicar del 5", resultEx7)

// 8. Usa un bucle para invertir una cadena de texto
console.log("\n=== Challenge 8 - Array reverse - ===")
const textEx8 = "JavaScript is a programming language. JavaScript is widely used."
let resultEx8 = textEx8.split("").toReversed().join("")
console.log(">>>Inverted text", resultEx8)

// 9. Usa un bucle para generar los primeros 10 números de la secuencia de Fibonacci
const fibonacci = []
let a = 0,
  b = 1
for (let i = 0; i < 10; i++) {
  fibonacci.push(a)
  ;[a, b] = [b, a + b] // destructuring swap
}
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] ✓

// 10. Dado un array de números, usa un bucle para crear un nuevo array que contenga solo los números mayores a 10
console.log("\n=== Challenge 10 - foreach method- ===")
const numbersArray = [10, 9, 87, 54, 0, -999, 86, 24, 22, 3]
let resultEx10 = []
numbersArray.forEach((number) => {
  if (number > 10) {
    resultEx10.push(number)
  }
})
console.log(">>>Bigger than 10 -> [array]:", resultEx10)
