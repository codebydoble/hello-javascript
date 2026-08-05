/*
Clase 39 - Ejercicios: Clases
Vídeo: https://youtu.be/1glVfFxj8a4?t=18630
*/

// 1. Crea una clase que reciba dos propiedades
console.log("\n=== Challenge 1 ===")
class Plane {
  #type
  #fuel
  /**
   * Plane class
   * @param {String} brand brand of plane..
   * @param {String} type type of plane.
   * @param {Number} fuel max total fuel used in plane.
   */
  constructor(brand, type, fuel) {
    this.brand = brand
    this.#type = type
    this.#fuel = fuel
  }

  get type() {
    return this.#type
  }

  set type(newType) {
    this.#type = newType
  }

  get fuel() {
    return this.#fuel
  }

  set fuel(newFuel) {
    this.#fuel = newFuel
  }

  /**
   * Function that calculates the max passengers capacity on the plane.
   * @returns {String} The max passengers capacity on the plane.
   */
  maxPassengers() {
    let typePlane = this.#type
    let fuelPlane = this.#fuel
    let result = 1
    if (typePlane === "Boeing777") {
      result *= fuelPlane + 1000
    } else {
      result *= fuelPlane + 50
    }
    return result
  }

  /**
   * Function that calculates the weight of the plane.
   * @param {Number} maxPassengers max passengers capacity on the plane.
   * @param {Number} tara size average.
   * @returns {Number} The weight of the plane.
   */
  static weightPlane(maxPassengers, tara) {
    return maxPassengers * tara
  }
}

// 2. Añade un método a la clase que utilice las propiedades
console.log("\n=== Challenge 2 ===")
let boeing = new Plane("Mercedes Benz", "Boeing777", 50000)
console.log(">>>Plane ->", boeing)
/* Método maxPassengers creado en la clase Plane del ejercicio 1 */

// 3. Muestra los valores de las propiedades e invoca a la función
console.log("\n=== Challenge 3 ===")
console.log(">>>Propiedad type", boeing.type)
console.log(">>>Propiedad fuel", boeing.fuel)
console.log(">>>Función maxPassengers", boeing.maxPassengers())

// 4. Añade un método estático a la primera clase
console.log("\n=== Challenge 4 ===")
/* Método estático: weightPlane */

// 5. Haz uso del método estático
console.log("\n=== Challenge 5 ===")
console.log(">>>Función estática -> weight:", Plane.weightPlane(boeing.maxPassengers(), 9.3256))

// 6. Crea una clase que haga uso de herencia
console.log("\n=== Challenge 6 ===")
export class Laptop {
  #condition
  /**
   * Class Laptop, tech tecnology.
   * @param {String} brand laptop brand.
   * @param {Number} price laptop amount.
   * @param {Number} weight laptop weight.
   * @param {String} condition status laptop condition (overall).
   */
  constructor(brand, price, weight, condition) {
    this.brand = brand
    this.price = price
    this.weight = weight
    this.#condition = condition
  }
  get condition() {
    return this.#condition
  }

  set condition(newCondition) {
    this.#condition = newCondition
  }
  /**
   * Function that shows laptop sound.
   */
  sound() {
    console.log("Generic laptop sound.")
  }
}

let myLaptop = new Laptop("Apple", 999.99, 10.8, "Excellent")
myLaptop.sound()

class Dell extends Laptop {
  #owner
  /**
   * Class Dell extends Laptop, tech tecnology.
   * @param {String} brand laptop brand.
   * @param {Number} price laptop amount.
   * @param {Number} weight laptop weight.
   * @param {String} condition status laptop condition (overall).
   * @param {Object} owner laptop buyer.
   */
  constructor(brand, price, weight, condition, owner) {
    super(brand, price, weight, condition)
    this.#owner = owner
  }
  get owner() {
    return this.#owner
  }
  set owner(newOwner) {
    this.#owner = newOwner
  }
  sound() {
    console.log("Dell laptop sound.")
  }
}
let personalDell = new Dell("Dell", 568.99, 12.1, "Excellent", { nameOwner: "Yoandy Doble Herrer" })
console.log(">>>Dell Class:", personalDell)

// 7. Crea una clase que haga uso de getters y setters
console.log("\n=== Challenge 7 ===")
/* Class Dell uses getters/setters */

// 8. Modifica la clase con getters y setters para que use propiedades privadas
console.log("\n=== Challenge 8 ===")

// 9. Utiliza los get y set y muestra sus valores
console.log("\n=== Challenge 9 ===")
console.log(">>>Dell get owner:", personalDell.owner)
personalDell.owner = { nameOwner: "Kevind Durant" }
console.log(">>>Dell set owner:", personalDell.owner)

// 10. Sobrescribe un método de una clase que utilice herencia
console.log("\n=== Challenge 10 ===")
/* Method sound sobreescrito  */
