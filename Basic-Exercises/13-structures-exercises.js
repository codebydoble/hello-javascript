/*
Clase 28 - Ejercicios: Estructuras
Vídeo: https://youtu.be/1glVfFxj8a4?t=11451
*/

// 1. Crea un array que almacene cinco animales
let animals = ["tiger", "cat", "dog", "fish", "bear"]
console.log(">>>Animals array", animals)

// 2. Añade dos más. Uno al principio y otro al final
// Start
animals.unshift("Turtle")
console.log(">>>Element at start: Turtle", animals)

// End
animals.push("Lion")
console.log(">>>Element at end: Lion", animals)

// 3. Elimina el que se encuentra en tercera posición
const position = 3
console.log(">>>Remove element 3rd position:", animals[position])
animals = animals.slice(0, position).concat(animals.slice(position + 1))
console.log(">>>Animals array without animals[3]", animals)

// Another way
//animals.splice(3, 1)

// 4. Crea un set que almacene cinco libros
let books = new Set(["The Hobbit", "Harry Potter I", "The Last Legion", "Armagedon", "Brave Heart"])
console.log(">>>Books set", books)

// 5. Añade dos más. Uno de ellos repetido
// Add 1st book
books.add("Eloquent JavaScript")
// Add 2nd book
books.add("Avatar I")
// Repeat book
books.add("Avatar I")
console.log(">>>Exercise 5", books)

// 6. Elimina uno concreto a tu elección
books.delete("Armagedon")
console.log(">>>Exercise 6: delete Armagedon book", books)

// 7. Crea un mapa que asocie el número del mes a su nombre
let monthMap = new Map([
  [1, "January"],
  [2, "February"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "December"],
])
console.log(">>>Exercise 7: month map", monthMap)
// 8. Comprueba si el mes número 5 existe en el map e imprime su valor
monthMap.has(5)
  ? console.log(">>>Exercise 8: month 5 founded ->", monthMap.get(5))
  : console.log(">>>Exercise 8: month 5 not found.")

// 9. Añade al mapa una clave con un array que almacene los meses de verano
monthMap.set("summer", ["June", "July", "August"])
console.log(">>>Exercise 9: add summer months", monthMap)

// 10. Crea un Array, transfórmalo a un Set y almacénalo en un Map
// 1- Crea un Array
const pcs = ["Dell", "iMac", "Asus", "HP", "Asus"]
console.log(">>>Exercise 10: Array ->", pcs)
// 2- Convert to set
const pcsSet = new Set(pcs)
console.log(">>>Exercise 10: Array to Set ->", pcsSet)
// 3- Save into map
const pcsMap = new Map([["pcsSet", pcsSet]])
console.log(">>>Exercise 10: Set to Map ->", pcsMap)
