/**
 * ════════════════════════════════════════════════════════════
 * MOUREDEV — Clase 38: Objetos y Clases Avanzados
 * Review + Corrected Solutions
 * Author: Yoandy Doble Herrera | Senior Review: Claude
 * ════════════════════════════════════════════════════════════
 *
 * SCORES:
 *  Ex2  Object inheritance    10/10  — prototype chain correct ✓
 *  Ex5  Object.assign         10/10  — immutability preserved ✓
 *  Ex6  Abstract class        10/10  — new.target + calculatePayout ✓
 *  Ex3  Instance method        9/10  — works, no return value (logs only)
 *  Ex9  Singleton             9/10  — works, instance is public (minor risk)
 *  Ex1  Prototype              8/10  — factory not "función constructora" per spec
 *  Ex4  get/set                6/10  — 3 setter validation gaps (0, string, NaN)
 *  Ex7  Polymorphism           7/10  — not true runtime polymorphism, 3.14 precision
 *  Ex8  Mixin                  7/10  — getDay/getMonth bugs, date key wrong
 *  Ex10 Proxy                  6/10  — missing `return true` crashes in strict mode,
 *                                      /g flag on regex, dot not escaped
 * ────────────────────────────────────────────────────────────
 *  TOTAL                      82/100  ✓ PASS
 */

"use strict"

// ════════════════════════════════════════════════════════════
// Ex1 — Prototype (8/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex1: Prototype ===")

/**
 * WHAT YOU DID: factory function using Object.create(book) — correct prototype chain.
 * All instances share `descripccion` via the prototype. ✓
 *
 * GAP: The spec says "función constructora" — in JS this specifically means a regular
 * function used with `new`. Arrow functions CANNOT be used as constructors.
 * Your Libro is a factory (also valid, also professional), but not a constructor function.
 *
 * WHEN TO USE EACH:
 *   Constructor function (new): when you want `instanceof` to work
 *   Factory function (Object.create): when you want explicit prototype control
 *   class keyword: modern standard — always prefer this in new code
 *
 * The exercise is testing that you know how to add to a prototype — you did that correctly.
 */

// Your approach — factory + Object.create (correct, professional):
const bookProto = { titulo: "", autor: "", paginas: undefined }

bookProto.descripccion = function () {
  return `Titulo: ${this.titulo}, autor: ${this.autor}, paginas: ${this.paginas}`
}

const Libro = (titulo, autor, paginas) => {
  const nb = Object.create(bookProto)
  nb.titulo = titulo
  nb.autor = autor
  nb.paginas = paginas
  return nb
}

// Constructor function approach (what "función constructora" means):
function LibroConstructor(titulo, autor, paginas) {
  this.titulo = titulo
  this.autor = autor
  this.paginas = paginas
}
LibroConstructor.prototype.descripccion = function () {
  return `Titulo: ${this.titulo}, autor: ${this.autor}, paginas: ${this.paginas}`
}

const hobbit = Libro("The Hobbit", "Tolkien", 310)
const hobbit2 = new LibroConstructor("The Hobbit", "Tolkien", 310)

console.log(hobbit.descripccion()) // ✓ via Object.create
console.log(hobbit2.descripccion()) // ✓ via constructor function
console.log("instanceof check:", hobbit2 instanceof LibroConstructor) // true — factory can't do this
console.log("proto chain:", Object.getPrototypeOf(hobbit) === bookProto) // true ✓

// ════════════════════════════════════════════════════════════
// Ex2 — Object Inheritance (10/10) ✓
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex2: Object Inheritance ===")

/**
 * PERFECT. Object.create(vehiculo) correctly sets the prototype chain.
 * automovil inherits from vehiculo — verified via Object.getPrototypeOf().
 *
 * WORTH KNOWING: own properties (marca, modelo) shadow prototype properties.
 * The prototype vehiculo.marca="" is never accessed once you set automovil.marca.
 * That's correct and expected behaviour.
 */

const vehiculo = { marca: "", modelo: "", year: undefined, arrancar() {} }
const automovil = Object.create(vehiculo)
automovil.marca = "Tesla"
automovil.modelo = "Y"
automovil.year = 2026
automovil.puertas = 4
automovil.arrancar = function () {
  return `The engine of ${this.marca} started.`
}

console.log("proto chain:", Object.getPrototypeOf(automovil) === vehiculo) // true ✓
console.log(automovil.arrancar()) // "The engine of Tesla started." ✓

// Demonstrate inheritance:
const moto = Object.create(vehiculo)
moto.marca = "Honda"
// moto doesn't override arrancar — inherits vehiculo's (empty) method
// That's the prototype chain working exactly as designed

// ════════════════════════════════════════════════════════════
// Ex3 — Instance Method (9/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex3: Instance Method ===")

/**
 * CORRECT: availableSaldo() lives on CuentaBancaria.prototype — every instance
 * shares the same function object (memory efficient).
 *
 * MINOR: The spec asks to "consultar el saldo" — a getter function should RETURN
 * the value, not console.log it. The caller should decide whether to display it.
 * console.info inside a method is a side effect — in production code this would
 * make the class untestable.
 *
 * FIX: return this.saldo; let the caller log it.
 */

class CuentaBancaria {
  constructor(titular, saldo) {
    this.titular = titular
    this.saldo = saldo
  }

  // FIX: return value, don't log
  availableSaldo() {
    return this.saldo
  }

  // Better: also add deposit/withdraw as real instance methods
  depositar(amount) {
    if (amount <= 0) throw new RangeError("Deposit must be positive")
    this.saldo += amount
    return this.saldo
  }
}

const cuenta = new CuentaBancaria("Yoandy", 5999)
console.log(`Saldo: ${cuenta.availableSaldo()}`) // 5999 ✓ — caller decides display
console.log("After deposit:", cuenta.depositar(1000)) // 6999 ✓

// ════════════════════════════════════════════════════════════
// Ex4 — get/set (6/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex4: get/set ===")

/**
 * BUGS IN SETTER (3 gaps):
 *
 * BUG 1: Allows salary = 0
 *   Condition: if (v < 0) — zero passes. Salary must be > 0 (positive).
 *   Fix: if (v <= 0)
 *
 * BUG 2: Allows non-numbers
 *   e.salario = "fifty thousand" — typeof check missing.
 *   Salary of type string silently accepted.
 *   Fix: check typeof === "number" first.
 *
 * BUG 3: Allows NaN
 *   e.salario = NaN — NaN < 0 is FALSE → passes the check.
 *   Fix: Number.isNaN(v) check.
 *
 * WHAT YOU GOT RIGHT:
 *   - #salario private field ✓ (no external access without getter)
 *   - RangeError for invalid value ✓ (correct error type)
 *   - getter returns private value ✓
 */

class Empleado {
  #salario

  constructor(nombre, salario) {
    this.nombre = nombre
    this.#salario = salario
  }

  get salario() {
    return this.#salario
  }

  set salario(newSalary) {
    // FIX 1: check type first
    if (typeof newSalary !== "number") {
      throw new TypeError(`Salary must be a number, got: ${typeof newSalary}`)
    }
    // FIX 2: NaN check (NaN passes typeof === "number")
    if (Number.isNaN(newSalary)) {
      throw new TypeError("Salary cannot be NaN")
    }
    // FIX 3: must be positive, not just non-negative
    if (newSalary <= 0) {
      throw new RangeError(`Salary must be positive, got: ${newSalary}`)
    }
    this.#salario = newSalary
  }
}

const emp = new Empleado("Ana", 25000)
emp.salario = 50000
console.log("valid salary:", emp.salario) // 50000 ✓

// All invalid inputs now throw correctly:
const trySet = (val) => {
  try {
    emp.salario = val
    return `ACCEPTED: ${val}`
  } catch (e) {
    return `REJECTED (${e.constructor.name}): ${val}`
  }
}
console.log(trySet(0)) // REJECTED (RangeError)
console.log(trySet(-100)) // REJECTED (RangeError)
console.log(trySet(NaN)) // REJECTED (TypeError)
console.log(trySet("fifty thousand")) // REJECTED (TypeError)
console.log(trySet(60000)) // ACCEPTED: 60000

// ════════════════════════════════════════════════════════════
// Ex5 — Object.assign (10/10) ✓
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex5: Object.assign ===")

/**
 * PERFECT. Target is {} so originals are never mutated.
 * Key collision rule: last argument wins — `additional` overwrites `basic` on conflict.
 */

const useAssign = (basic, additional) => Object.assign({}, basic, additional)

const laptop = { nombre: "Laptop", precio: 15000 }
const detalles = { categoria: "Tecnología", disponible: true }
const combined = useAssign(laptop, detalles)

console.log("combined:", combined)
console.log("basic unchanged:", !("categoria" in laptop)) // true ✓

// Key collision demo:
const a = { x: 1, shared: "from a" }
const b = { y: 2, shared: "from b" }
console.log("collision:", Object.assign({}, a, b)) // shared = "from b" — b wins

// ════════════════════════════════════════════════════════════
// Ex6 — Abstract Class (10/10) ✓
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex6: Abstract Class ===")

/**
 * PERFECT. new.target === Employee is the correct JS pattern for preventing
 * direct instantiation. There's no native `abstract` keyword — this is the idiom.
 *
 * calculatePayout() on base class throws if subclass forgets to implement it.
 * This is the "template method" pattern.
 *
 * REACT CONNECTION: Error Boundaries use a similar pattern — they're class
 * components that implement a required lifecycle method (componentDidCatch).
 */

class EmployeeBase {
  constructor(nombre, salario) {
    if (new.target === EmployeeBase) {
      throw new Error("EmployeeBase is abstract — cannot instantiate directly")
    }
    this.nombre = nombre
    this.salario = salario
  }

  calculatePayout() {
    throw new Error(`${this.constructor.name} must implement calculatePayout()`)
  }
}

class FullTimeEmployee extends EmployeeBase {
  calculatePayout() {
    return this.salario
  }
}

class ContractEmployee extends EmployeeBase {
  calculatePayout() {
    return this.salario - this.salario * 0.08
  }
}

// Direct instantiation blocked:
try {
  new EmployeeBase("X", 1000)
} catch (e) {
  console.log("Abstract guard:", e.message)
} // ✓

const ft = new FullTimeEmployee("Ruben", 3500)
const ct = new ContractEmployee("Maria", 4000)
console.log("FullTime payout:", ft.calculatePayout()) // 3500
console.log("Contract payout:", ct.calculatePayout()) // 3680

// ════════════════════════════════════════════════════════════
// Ex7 — Polymorphism (7/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex7: Polymorphism ===")

/**
 * WHAT YOU DEMONSTRATED: two subclasses with the same method name — correct start.
 *
 * GAP 1: Not demonstrating RUNTIME polymorphism.
 * True polymorphism means: you call the same method on a base-type reference,
 * and the runtime picks the correct subclass implementation.
 * Your code calls each concrete class directly: r.area(20,4), ci.area(5)
 * — that's just method overriding, not polymorphism in action.
 *
 * GAP 2: area() takes DIFFERENT parameters per subclass (base+height vs radio).
 * In true polymorphism, the method signature must be the same across all subclasses.
 * A Figura variable shouldn't need to know if it's a Rectangulo or Circulo to call area().
 * Store dimensions in the constructor, then area() takes no args.
 *
 * GAP 3: 3.14 — use Math.PI for precision.
 *
 * FIX: store shape data in constructor, area() takes no args → then you can call
 * the SAME method on any Figura without knowing its subtype.
 */

class Figura {
  area() {
    throw new Error(`${this.constructor.name} must implement area()`)
  }
  toString() {
    return `${this.constructor.name}: area = ${this.area()}`
  }
}

class Rectangulo extends Figura {
  constructor(base, height) {
    super()
    this.base = base
    this.height = height
  }
  area() {
    return this.base * this.height
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super()
    this.radio = radio
  }
  area() {
    return Math.PI * this.radio ** 2
  } // Math.PI not 3.14
}

// TRUE RUNTIME POLYMORPHISM — one loop, one method call, no type checks:
const figuras = [new Rectangulo(20, 4), new Circulo(5), new Rectangulo(10, 10), new Circulo(3)]

// Same call `.area()` — runtime picks the right implementation automatically
figuras.forEach((f) => console.log(f.toString()))
// Rectangulo: area = 80
// Circulo: area = 78.539...
// Rectangulo: area = 100
// Circulo: area = 28.274...

// This is polymorphism: iterate Figura references, each responds with its own logic

// ════════════════════════════════════════════════════════════
// Ex8 — Mixin (7/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex8: Mixin ===")

/**
 * WHAT YOU GOT RIGHT:
 * - Object.assign(Class.prototype, mixin) is the standard Mixin pattern ✓
 * - No code duplication — both Usuario and Administrador get the same behaviour ✓
 * - Closure over `actions` object accumulates log entries correctly ✓
 *
 * BUGS (3):
 *
 * BUG 1: getDay() returns 0-6 (day of WEEK: Sunday=0, Monday=1...).
 *   You want getDate() which returns 1-31 (day of MONTH).
 *   Today: getDay()=1 (Monday), getDate()=10 (10th day of month).
 *
 * BUG 2: getMonth() is 0-indexed (January=0, July=6, August=7).
 *   Log key shows "1-7-2026" but real date is August 10, 2026.
 *   Fix: getMonth() + 1
 *
 * BUG 3: `this` inside the returned arrow function — subtle.
 *   The returned arrow captures `this` from logActions()'s execution context.
 *   When called as userDoble.logActions(), `this` = userDoble ✓ (works here).
 *   But if the function is detached: const fn = userDoble.logActions; fn() → `this` = undefined.
 *   Worth knowing.
 */

const systemMixin = {
  logActions() {
    const date = new Date()
    // FIX: getDate() for day of month, getMonth()+1 for human month
    const key = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const actions = {}

    return () => {
      if (key in actions) {
        actions[key].push(`${this.name} logged.`)
      } else {
        actions[key] = [`${this.name} logged.`]
      }
      return actions
    }
  },
}

class UsuarioFixed {
  constructor(name) {
    this.name = name
  }
}
class AdministradorFixed extends UsuarioFixed {}

Object.assign(UsuarioFixed.prototype, systemMixin)
Object.assign(AdministradorFixed.prototype, systemMixin)

const user = new UsuarioFixed("codebydoble")
const logger = user.logActions()
logger()
logger()
const log = logger()
console.log("mixin log:", log) // date key is now correct

const admin = new AdministradorFixed("xcode")
const adminLogger = admin.logActions()
console.log("admin log:", adminLogger())

// ════════════════════════════════════════════════════════════
// Ex9 — Singleton (9/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex9: Singleton ===")

/**
 * WORKS CORRECTLY: first call wins, subsequent calls return the same instance.
 * s1 === s2 is true ✓
 *
 * RISK: ConfiguracionAplicacion.instance is a PUBLIC static property.
 * Anyone can do: ConfiguracionAplicacion.instance = null → Singleton broken.
 * Fix: use static #instance private field.
 *
 * ALSO WORTH KNOWING: Modules (ESM) naturally create singletons — an exported
 * object is created once and shared across all imports. In React apps this is
 * often how global config/state is managed without a Singleton class.
 */

class ConfiguracionAplicacion {
  // FIX: private static field — cannot be reset from outside
  static #instance = null

  constructor(idioma, tema) {
    if (ConfiguracionAplicacion.#instance) {
      return ConfiguracionAplicacion.#instance
    }
    this.idioma = idioma
    this.tema = tema
    ConfiguracionAplicacion.#instance = this
  }

  // Optional: reset for testing purposes (controlled access)
  static _resetForTesting() {
    ConfiguracionAplicacion.#instance = null
  }
}

const app1 = new ConfiguracionAplicacion("es", "oscuro")
const app2 = new ConfiguracionAplicacion("en", "white")

console.log("same instance:", app1 === app2) // true ✓
console.log("idioma:", app2.idioma) // "es" — first wins ✓

// Attempt to break public singleton: ConfiguracionAplicacion.instance = null
// With #instance: ConfiguracionAplicacion.#instance = null → SyntaxError outside class ✓

// ════════════════════════════════════════════════════════════
// Ex10 — Proxy (6/10)
// ════════════════════════════════════════════════════════════
console.log("\n=== Ex10: Proxy ===")

/**
 * BUGS (3):
 *
 * BUG 1 — CRITICAL: set() trap doesn't return true/false.
 *   In strict mode, a Proxy set() trap MUST return true to signal success.
 *   If it returns undefined (falsy), Node.js throws:
 *   TypeError: 'set' on proxy: trap returned falsish for property 'x'
 *   This crashes the entire program. Your code had this bug.
 *   Fix: return true at end of set(), return false in error paths.
 *
 * BUG 2: /g flag with .test() — stateful lastIndex.
 *   regex.test() with /g flag advances lastIndex after each match.
 *   First call: returns true. Second call on SAME string: returns false.
 *   Fix: remove /g flag from the regex (not needed for .test()).
 *
 * BUG 3: Unescaped dot in email regex.
 *   /[a-z0-9]+.[a-z]{2,4}/ — the `.` matches ANY character, not just a literal dot.
 *   "user@domainXcom" would pass (X matches the dot).
 *   Fix: escape the dot: `\.`
 *
 * WHAT'S CORRECT:
 *   - get() trap with property existence check ✓
 *   - set() validates type per property ✓
 *   - Error catching and logging ✓
 *   - switch/case structure for per-property rules ✓
 */

const proxyHandler = {
  get(target, property) {
    if (property in target) return target[property]
    throw new Error(`Property "${property}" not found.`)
  },

  set(target, property, value) {
    // If property doesn't exist, reject
    if (!(property in target)) {
      console.log(new Error(`Property "${property}" not found.`))
      return false // ← CRITICAL: must return boolean
    }

    try {
      switch (property) {
        case "nombre":
          if (typeof value !== "string") throw new TypeError("nombre must be a string")
          target[property] = value
          break

        case "edad":
          if (typeof value !== "number" || Number.isNaN(value) || value <= 0 || value >= 130) {
            throw new TypeError("edad must be a number between 1 and 129")
          }
          target[property] = value
          break

        case "email": {
          // FIX 1: no /g flag on .test()
          // FIX 2: escaped dot \.
          const emailRegex = /^[a-z0-9]+\.?[a-z0-9]*@[a-z0-9]+\.[a-z]{2,4}$/
          if (typeof value !== "string" || !emailRegex.test(value)) {
            throw new TypeError("email must be a valid email address")
          }
          target[property] = value
          break
        }

        default:
          target[property] = value // allow other props without validation
      }
    } catch (error) {
      console.log(error.message)
      return false // signal failure
    }

    return true // ← REQUIRED: signal success
  },
}

const chef = { nombre: "Carlos", edad: 25, email: "carlos@email.com" }
const proxyChef = new Proxy(chef, proxyHandler)

// All scenarios work without crashing:
console.log(proxyChef.nombre) // "Carlos" ✓
proxyChef.nombre = 3658 // "nombre must be a string" logged, rejected
proxyChef.nombre = "Douglas" // accepted ✓
console.log(proxyChef.nombre) // "Douglas" ✓
proxyChef.edad = 3658 // rejected ✓
proxyChef.edad = -5 // rejected ✓
proxyChef.email = "invalid" // rejected ✓
proxyChef.email = "yoandy@email.com" // accepted ✓
console.log("final:", proxyChef)

// Regex /g flag demo — the bug:
const badRegex = /test/g
console.log("\n/g flag bug:")
console.log(badRegex.test("test")) // true
console.log(badRegex.test("test")) // false! — lastIndex advanced past match
console.log(badRegex.test("test")) // true — wraps around
// This is why you NEVER use /g with .test() unless you specifically need to iterate matches
