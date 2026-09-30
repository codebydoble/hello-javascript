/*
Clase 38 - Objetos y clases avanzados
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=11832
*/

// 1. Agregega una función al prototipo de un objeto
console.log("\n Ex 1. \n")

const book = { titulo: "", autor: "", paginas: undefined }

/**
 * Función constructora llamada `Libro` que permita crear objetos con las propiedades `titulo`, `autor` y `paginas`.
 * @param {String} titulo nombre del libro.
 * @param {String} autor autor del libro.
 * @param {Number} paginas cantidad de páginas del libro.
 * @returns {Object} un libro.
 */
const Libro = (titulo, autor, paginas) => {
  let newBook = Object.create(book)
  newBook.titulo = titulo
  newBook.autor = autor
  newBook.paginas = paginas
  return newBook
}

const hobbitBook = Libro("The Hobbit", "Unknown", 5025)
const goldenAgeBook = Libro("The Golden Age", "Jose Marti", 215)
console.log(hobbitBook)
console.log(goldenAgeBook)
/**
 * Permite obtener una descripción completa del libro.
 * @returns {String} descripción completa del libro
 */
book.descripccion = function () {
  return `Titulo: ${this.titulo}, autor: ${this.autor}, paginas: ${this.paginas}`
}
console.log(hobbitBook.descripccion())
console.log(goldenAgeBook.descripccion())

// 2. Crea un objeto que herede de otro
console.log("\n Ex 2. \n")
const vehiculo = {
  marca: "",
  modelo: "",
  year: undefined,
  /**
   * Function that start engine.
   */
  arrancar() {},
}

const automovil = Object.create(vehiculo)
automovil.marca = "Tesla"
automovil.modelo = "Y"
automovil.year = 2026
automovil.puertas = 4
automovil.arrancar = function () {
  return `The engine of ${this.marca} started.`
}
console.log(automovil)
console.log(automovil.arrancar())

// 3. Define un método de instancia en un objeto
console.log("\n Ex 3. \n")
class CuentaBancaria {
  /**
   * Constuctor clase CuentaBancaria.
   * @param {String} titular nombre del titular de la cuenta bancaria.
   * @param {Number} saldo saldo del titular de la cuenta bancaria.
   */
  constructor(titular, saldo) {
    this.titular = titular
    this.saldo = saldo
  }
  /**
   * Funcion que permite consultar el saldo disponible.
   */
  availableSaldo() {
    console.info(`Balance available: ${this.saldo}`)
  }
}

const cuentaBancariaYoandy = new CuentaBancaria("Yoandy Doble Herrera", 5999)
const cuentaBancariaDayneris = new CuentaBancaria("Dainerys Gonzalez Perez", 85000)
console.log("Titular: ", cuentaBancariaYoandy.titular)
cuentaBancariaYoandy.availableSaldo()
console.log("Titular: ", cuentaBancariaDayneris.titular)
cuentaBancariaDayneris.availableSaldo()

// 4. Haz uso de get y set en un objeto
console.log("\n Ex 4. \n")
class Empleado {
  #salario
  /**
   * Constructor clase Empleado.
   * @param {String} nombre nombre del empleado.
   * @param {Number} salario salario del empleado.
   */
  constructor(nombre, salario) {
    this.nombre = nombre
    this.#salario = salario
  }
  /**
   * Funcion que permite consultar el salario del empleado.
   * @returns {Number} salario del empleado.
   */
  get salario() {
    return this.#salario
  }
  /**
   * Funcion que permite actualizar el salario del empleado.
   */
  set salario(newSalary) {
    if (newSalary < 0) throw new RangeError("Invalid value.")
    this.#salario = newSalary
  }
}

const empleadoAna = new Empleado("Ana", 25000)
empleadoAna.salario = 50000
console.log(`Empleado ${empleadoAna.nombre}, Salario nuevo: ${empleadoAna.salario}`)

// 5. Utiliza la operación assign en un objeto
console.log("\n Ex 5. \n")

/**
 * Funcion que recibe un objeto con información básica de un producto y otro objeto con información adicional. Combina ambos utilizando `Object.assign()`.
 * @param {Object} basic cualquier objeto con información básica.
 * @param {Object} additional cualquier objeto con información adicional.
 * @returns {Object} la combinacion de ambos objetos mediante `Object.assign()`.
 */
const useAssign = (basic, additional) => {
  const unifiedObj = {}
  return Object.assign(unifiedObj, basic, additional)
}
const producto = {
  nombre: "Laptop",
  precio: 15000,
}

const detalles = {
  categoria: "Tecnología",
  disponible: true,
}

const product = useAssign(producto, detalles)
console.info(product)

// 6. Crea una clase abstracta
console.log("\n Ex 6. \n")
class Employee {
  /**
   * Constructor de la clase Employee.
   * @param {String} nombre nombre del empleado.
   * @param {Number} salario salario del empleado.
   */
  constructor(nombre, salario) {
    if (new.target === Employee) throw new Error("Employee it's an abstract class.")
    this.nombre = nombre
    this.salario = salario
  }
  /**
   * Funcion generica relacionada con el pago del salario mensual.
   */
  calculatePayout() {
    throw new Error("Only can be implemented on subclass.")
  }
}
class EmployeeRuben extends Employee {
  /**
   * Funcion relacionada con el pago del salario mensual.
   * @returns {Number} calculo del salario mensual del empleado.
   */
  calculatePayout() {
    return this.salario - this.salario * 0.08
  }
}
const ruben = new EmployeeRuben("Ruben", 3500)
console.info(ruben)
console.info("Calcular pago: ", ruben.calculatePayout())

// 7. Utiliza polimorfismo en dos clases diferentes
console.log("\n Ex 7. \n")
class Figura {
  /**
   * Figure constructor.
   */
  constructor() {}
  /**
   * Funcion generica de area.
   */
  area() {}
}

class Rectangulo extends Figura {
  /**
   * Funcion que calcula el area de un rectangulo dado.
   * @param {Number} base base del rectangulo
   * @param {Number} height altura del rectangulo.
   * @returns {Number} el area del rectangulo dado.
   */
  area(base, height) {
    return base * height
  }
}

class Circulo extends Figura {
  /**
   * Funcion que calcula el area de un circulo.
   * @param {Number} radio radio del circulo dado.
   * @returns {Number} el area del circulo.
   */
  area(radio) {
    return 3.14 * radio ** 2
  }
}

const house = new Rectangulo()
const tank = new Circulo()
console.log(`Area del rectangulo ${house.area(20, 4)} metros.`)
console.log(`Area del circulo ${tank.area(5)} metros.`)

// 8. Implementa un Mixin
console.log("\n Ex 8. \n")

const systemMixing = {
  /**
   * Registrar acciones realizadas en el sistema.
   */
  logActions() {
    const dateObj = new Date()
    const currentFullDay = `${dateObj.getDay()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`
    const actions = {}
    return () => {
      if (currentFullDay in actions) {
        actions[currentFullDay].push(`${this.name} logged.`)
      } else {
        actions[currentFullDay] = []
        actions[currentFullDay].push(`${this.name} logged.`)
      }
      return actions
    }
  },
}

class Usuario {
  /**
   * Class Usuario constructor.
   * @param {String} name user name.
   */
  constructor(name) {
    this.name = name
  }
}

class Administrador extends Usuario {}
Object.assign(Usuario.prototype, systemMixing)
Object.assign(Administrador.prototype, systemMixing)
const userDoble = new Usuario("codebydoble")
const sysLog = userDoble.logActions()
console.log("User system log -> ", sysLog())
console.log("User system log -> ", sysLog())
console.log("User system log -> ", sysLog())

const userSuperYoandy = new Administrador("xcode")
const adminLog = userSuperYoandy.logActions()
console.log("Admin system log -> ", adminLog())
console.log("Admin system log -> ", adminLog())
console.log("Admin system log -> ", adminLog())

// 9. Crea un Singleton
console.log("\n Ex 9. \n")
class ConfiguracionAplicacion {
  /**
   * Class `ConfiguracionAplicacion` constructor encargada de almacenar la configuración general de un sistema.
   * @param {String} idioma idioma activo en la aplicacion.
   * @param {String} tema tema aplicada.
   */
  constructor(idioma, tema) {
    if (ConfiguracionAplicacion.instance) {
      return ConfiguracionAplicacion.instance
    }
    this.idioma = idioma
    this.tema = tema
    ConfiguracionAplicacion.instance = this
  }
}

const pediaMNT = new ConfiguracionAplicacion("es", "oscuro")
const pediaAPK = new ConfiguracionAplicacion("en", "white")

console.log(pediaAPK)

// 10. Desarrolla un Proxy
console.log("\n Ex 10. \n")
const proxy = {
  /**
   *
   * @param {Object} target target element.
   * @param {String} property property to show in target.
   */
  get(target, property) {
    try {
      if (property in target) {
        return target[property]
      } else {
        throw new Error("Property not found.")
      }
    } catch (error) {
      console.log(error)
      return
    }
  },
  /**
   * Funcion que intercepta las modificaciones realizadas sobre el objeto.
   * @param {Object} target target element.
   * @param {String} property property to change in target.
   * @param {String|Number|null|undefined|Boolean|Symbol|Array|Object} value update value.
   */
  set(target, property, value) {
    try {
      if (!(property in target)) {
        throw new Error("Property not found.")
      }
      switch (property) {
        case "nombre":
          if (typeof value === "string") {
            target[property] = value
          } else {
            throw new TypeError("Value type not admited for name property.")
          }
          break
        case "edad":
          console.log("Attemp edad")
          if (typeof value === "number" && value > 0 && value < 130) {
            target[property] = value
          } else {
            throw new TypeError("Value type not admited for age property or invalid value.")
          }
          break
        case "email":
          console.log("Attemp email")
          const regex = new RegExp(/[a-z0-9]+\.?[a-z0-9]*@[a-z0-9]+.[a-z]{2,4}/, "g")
          if (typeof value === "string" && regex.test(value)) {
            target[property] = value
          } else {
            throw new TypeError("Value type not admited for email property or invalid value.")
          }
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
      return
    }
  },
}

const chef = {
  nombre: "Carlos",
  edad: 25,
  email: "carlos@email.com",
}

const usersProxy = new Proxy(chef, proxy)
console.log(usersProxy.nombre)
usersProxy.nombre = 3658
usersProxy.nombre = "Douglas"
console.log(usersProxy.nombre)
usersProxy.edad = 3658
usersProxy.email = "emailtoyoandy@email.com"
console.log(usersProxy)
