/*
Clase 23 - Estructuras avanzadas
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=7514
*/

// 1. Utiliza map, filter y reduce para crear un ejemplo diferente al de la lección
console.log("\n---- Exercise 1 ----\n")

/**
 * Function that calculate the total cost of available products.
 * @param {Object[]} products any products array.
 * @returns {Number} total cost of available products.
 */
const availableProducts = (products) => {
  const inStockProducts = products.filter((product) => product.disponible).map((product) => product.precio)
  return inStockProducts.reduce((cost, currentPriceProduct) => cost + currentPriceProduct, 0)
}
const AMAZONPRODUCTS = [
  { nombre: "Mouse", precio: 20, disponible: true },
  { nombre: "Teclado", precio: 45, disponible: false },
  { nombre: "Monitor", precio: 300, disponible: true },
  { nombre: "Webcam", precio: 80, disponible: true },
]
console.log("Ex 1. Total cost of available products. ", availableProducts(AMAZONPRODUCTS))
console.assert(availableProducts(AMAZONPRODUCTS) === 400, " Test total cost of available products.")

// 2. Dado un array de números, crea uno nuevo con dichos números elevados al cubo y filtra sólo los números pares
console.log("\n---- Exercise 2 ----\n")
/**
 * Function that create a new array of pair numbers at cube from a numbers array.
 * @param {Number[]} numArr any number array.
 * @returns {Number[]} returns a cube numbers array.
 */
const cube = (numArr) => {
  return numArr.map((num) => num ** 3).filter((num) => num % 2 === 0)
}

const NUMBERS = [2, 3, 4, 5, 6, 7]
console.log(`Ex 2. A cube number array ${cube(NUMBERS)}`)

// 3. Utiliza flat y flatMap para crear un ejemplo diferente al de la lección
console.log("\n---- Exercise 3 ----\n")
/**
 * Function that flat and map students array from course array.
 * @param {String[]} courses any course array.
 * @returns {String[]} returns students array.
 */
const flatStudentsArr = (courses) => {
  return courses.flatMap((course) => course.estudiantes)
}

/**
 * Function that flat academic levels.
 * @param {String[]} levels any academic levels array with depth 1.
 * @returns {String[]} flat academic level array.
 */
const flatAcademicLevels = (levels) => {
  return levels.flat(1)
}

/**
 * Function that flat academic levels this manage depth.
 * @param {String[]} levels any academic levels array with depth 1.
 * @param {Number} depth required flat depth.
 * @returns {String[]} flat academic level array.
 */
const flatAcademicLevelsVersionTwo = (levels, depth) => {
  return levels.flat(depth)
}

const LEVELS = [["Básico", "Intermedio"], ["Avanzado"], ["Experto"]]
const COURSES = [
  {
    curso: "JavaScript",
    estudiantes: ["Ana", "Luis"],
  },
  {
    curso: "Python",
    estudiantes: ["Carlos", "María"],
  },
]
console.log("Ex 3. Flat academic levels: ", flatAcademicLevels(LEVELS), "\n")
console.log("Ex 3. FlatMap student's course: ", flatStudentsArr(COURSES), "\n")
console.log("Ex 3. Flat academic levels version 2: ", flatAcademicLevelsVersionTwo(LEVELS, 1), "\n")

// 4. Ordena un array de números de mayor a menor
console.log("\n---- Exercise 4 ----\n")

/**
 * Function that sort number bigger to smaller.
 * @param {Number[]} numbers any numbers array.
 * @returns {Number[]} sorted number array.
 */
const sortedNumbers = (numbers) => {
  let numbersCopy = [...numbers]
  return numbersCopy.sort((a, b) => b - a)
}
const NUMTOSORT = [18, 7, 25, 3, 40, 12]
console.log("Ex 4. Sorted array: ", sortedNumbers(NUMTOSORT))

// 5. Dados dos sets, encuentra la unión, intersección y diferencia de ellos
console.log("\n---- Exercise 5 ----\n")

/**
 * Function that returns an object with the union, intersection and diff of two set.
 * @param {Set} setA any number set.
 * @param {Set} setB any number set.
 * @returns {Object} an object with three sets (union, intersection and diff) of two set.
 */
const unionIntersectionDiff = (setA, setB) => {
  const union = new Set([...setA, ...setB])
  const intersecc = new Set([...setA].filter((num) => setB.has(num)))
  const diff = new Set([...[...setA].filter((num) => !setB.has(num)), ...[...setB].filter((num) => !setA.has(num))])
  return { union, intersecc, diff }
}
const setA = new Set([1, 2, 3, 4, 5])
const setB = new Set([4, 5, 6, 7, 8])
const objSets = unionIntersectionDiff(setA, setB)
console.log("Ex 5. an object with the union, intersection and diff of two set. ", objSets)

// 6. Itera los resultados del ejercicio anterior
console.log("\n---- Exercise 6 ----\n")

/**
 * Function that log set information.
 * @param {set{}} obj any set objects.
 */
const logObjSet = (obj) => {
  for (const num of obj.union) {
    console.log("Union: ", num)
  }
  for (const num of obj.intersecc) {
    console.log("Intersection: ", num)
  }
  for (const num of obj.diff) {
    console.log("Diff : ", num)
  }
}
logObjSet(objSets)

// 7. Crea un mapa que almacene información de usuarios (nombre, edad y email) e itera los datos
console.log("\n---- Exercise 7 ----\n")

/**
 * Function that creates a Map from Object. Uses Map<id, obj>
 * @param {Object[]} arr any object array like [{
    id: 1,
    nombre: "Carlos",
    edad: 22,
    email: "carlos@email.com",
}]
 * @returns {Map} a map that stores user information like Map<id, {nombre, edad, email}>
 */
const mapFromObj = (arr) => {
  let result = new Map()
  arr.forEach((person) => {
    let { id, nombre, edad, email } = person
    result.set(id, { nombre, edad, email })
  })
  return result
}

const persons = [
  {
    id: 1,
    nombre: "Carlos",
    edad: 22,
    email: "carlos@email.com",
  },
  {
    id: 2,
    nombre: "Laura",
    edad: 17,
    email: "laura@proton.me",
  },
  {
    id: 3,
    nombre: "Jhon",
    edad: 15,
    email: "emailtojhon@mail.cu",
  },
  {
    id: 4,
    nombre: "Ana",
    edad: 28,
    email: "ana@gmail.com",
  },
]
const personsMap = mapFromObj(persons)
for (const [key, value] of personsMap.entries()) {
  console.log(key, value)
}

// 8. Dado el mapa anterior, crea un array con los nombres
console.log("\n---- Exercise 8 ----\n")
/**
 * Function that from a map return a string array of names.
 * @param {Map} map any map like Map <id, {nombre,edad,email}>
 * @returns {String[]} string name array.
 */
const mapToArrNames = (map) => {
  return Array.from(map.entries()).map(([id, person]) => person.nombre)
}
const userNames = mapToArrNames(personsMap)
console.log("Ex 8. ", userNames)

// 9. Dado el mapa anterior, obtén un array con los email de los usuarios mayores de edad y transfórmalo a un set
console.log("\n---- Exercise 9 ----\n")

/**
 * Function that receives a map like Map<id, {nombre,edad,email}> and returns a new Set with only adult person email.
 * @param {Map} map any map like Map <id, {nombre,edad,email}>
 * @returns {Set} a new Set with only adult person email.
 */
const adultEmail = (map) => {
  return new Set([...map.entries()].filter(([id, person]) => person.edad >= 18).map(([id, person]) => person.email))
}
const emails = adultEmail(personsMap)
console.log("Ex 9. ", emails)

// 10. Transforma el mapa en un objeto, a continuación, transforma el objeto en un mapa con clave el email de cada usuario y como valor todos los datos del usuario
console.log("\n---- Exercise 10 ----\n")
/**
 * Function that receives a user map, then transform into an object and finally transform into a Map again like Map<email,{nombre,edad}>
 * @param {Map} map any map like Map <id, {nombre,edad,email}>
 * @returns {Map} a Map like Map<email,{nombre,edad}>
 */
const transformMap = (map) => {
  let usersObj = {}
  map.forEach((person, key) => (usersObj[key] = person))
  return new Map(
    [...Object.entries(usersObj)].map(([key, value]) => {
      let { nombre, edad, email } = value
      return [email, { nombre, edad, email }]
    }),
  )
}

const users = transformMap(personsMap)
console.log("Ex 10. ", users)
