/*
Clase 34 - Ejercicios: Objetos
Vídeo: https://youtu.be/1glVfFxj8a4?t=15675
*/

// 1. Crea un objeto con 3 propiedades
let mazda = {
  brand: "Mazda",
  license: "M00001",
  year: 2024,
}

// 2. Accede y muestra su valor
console.log("\n=== Challenge 2 ===")
console.log(">>>Mazda Obj", mazda)

// 3. Agrega una nueva propiedad
console.log("\n=== Challenge 3 ===")
mazda["owner"] = { name: "Jason Bourne", phone: "11854422051" }
console.log(">>>Mazda Obj", mazda)

// 4. Elimina una de las 3 primeras propiedades
console.log("\n=== Challenge 4 ===")
if (Object.hasOwn(mazda, "year")) {
  delete mazda.year
}
console.log(">>>Mazda Obj", mazda)

// 5. Agrega una función e invócala
console.log("\n=== Challenge 5 ===")
mazda["start"] = function () {
  console.log("Engine started.")
}
mazda.start()

// 6. Itera las propiedades del objeto
console.log("\n=== Challenge 6 ===")
/* Obj to array */
for (const [key, value] of Object.entries(mazda)) {
  console.log(">>>Key:", key, "\n>>>value:", value)
}
console.log("\n=== Challenge 6 forin ===")
for (const key in mazda) {
  console.log(">>>Key:", key, "\n>>>value:", mazda[key])
}

// 7. Crea un objeto anidado
console.log("\n=== Challenge 7 ===")
let store = {
  name: "CodeTech",
  articles: {
    name: "Laptop Dell",
    price: 590.99,
  },
}
console.log(">>>Store Obj", store)

// 8. Accede y muestra el valor de las propiedades anidadas
console.log("\n=== Challenge 8 ===")
console.log(">>>Name property:", store.articles.name)
console.log(">>>Price property:", store.articles.price)

// 9. Comprueba si los dos objetos creados son iguales
console.log("\n=== Challenge 9 ===")
let decision = true
for (const keyMazda in mazda) {
  if (!Object.hasOwn(store, keyMazda)) {
    decision = false
  }
}
for (const keyStore in store) {
  if (!Object.hasOwn(mazda, keyStore)) {
    decision = false
  }
}
console.log("=== Are Equals??? ===", decision)

// 10. Comprueba si dos propiedades diferentes son iguales
console.log("\n=== Challenge 10 ===")
console.log("=== Comprueba si dos propiedades diferentes son iguales??? ===", mazda.brand === store.name)
