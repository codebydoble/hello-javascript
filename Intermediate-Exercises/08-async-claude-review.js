/**
 * ════════════════════════════════════════════════════════════
 * MOUREDEV Clase 45 — Asincronía: REVIEW + CORRECTED SOLUTIONS
 * Author: Yoandy Doble Herrera | Senior Review: Claude
 * ════════════════════════════════════════════════════════════
 *
 * SCORES:
 *  Ex1   Callback + setTimeout          10/10  ✓ Perfect
 *  Ex2   Sequential callbacks           10/10  ✓ Perfect
 *  Ex3   Promise resolve/reject          5/10  BUG: promise hangs on invalid input
 *  Ex4   Sequential promises            10/10  ✓ Perfect
 *  Ex5   async/await conversion         10/10  ✓ Perfect
 *  Ex6   Simulated API + try/catch       6/10  BUG: same hang + spec requires try/catch inside async fn
 *  Ex7   Event loop prediction          10/10  ✓ Perfect — explained correctly
 *  Ex8   Promise.all concurrent         10/10  ✓ Perfect
 *  Ex9   Promise delay                   7/10  BUG: double timeout = 6s not 3s
 *  Ex10  ATM simulation                  8/10  BUG: Promise nested inside Promise (fragile pattern)
 * ────────────────────────────────────────────────────────────
 *  TOTAL                               86/100  ✓ PASS
 */

"use strict"

// ════════════════════════════════════════════════════════════
// Ex1 — Callback + setTimeout (10/10 ✓)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 1. Callback + setTimeout \n")

/**
 * PERFECT. Demonstrates callback pattern correctly:
 * - greet() doesn't call callback immediately
 * - delay is exactly 2000ms
 * - callback receives the message — caller decides what to do with it
 * - No Promises or async/await — pure callback
 *
 * REACT CONNECTION: React event handlers ARE callbacks.
 * <button onClick={handleClick}> passes handleClick as a callback.
 */

const greet = (name, callback) => {
  const message = `Hola, ${name}`
  setTimeout(() => {
    callback(message)
  }, 2000)
}

const callback = (message) => console.log(message)

greet("Yoandy", callback)


// ════════════════════════════════════════════════════════════
// Ex2 — Sequential Callback Tasks (10/10 ✓)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 2. Sequential Callback Tasks \n")

/**
 * PERFECT. This IS the callback hell pattern demonstrated correctly.
 * task2 only starts AFTER task1's callback fires — guaranteed sequential.
 *
 * This is exactly what Promises were designed to replace.
 * Understanding WHY this is painful = understanding WHY Promises exist.
 */

function task1(callback) {
  setTimeout(() => { console.log("Task 1 completed"); callback() }, 1000)
}
function task2(callback) {
  setTimeout(() => { console.log("Task 2 completed"); callback() }, 1000)
}
function task3(callback) {
  setTimeout(() => { console.log("Task 3 completed"); callback() }, 1000)
}

task1(() => { task2(() => { task3(() => {}) }) })


// ════════════════════════════════════════════════════════════
// Ex3 — Promise Resolve/Reject (5/10 → Fixed)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 3. Promise: Resolve or Reject \n")

/**
 * BUG — CRITICAL: try/catch inside the Promise executor swallows the error.
 *
 * WHAT HAPPENS with checkNumber("Yoandy"):
 *   1. setTimeout fires
 *   2. typeof "Yoandy" !== "number" → true → throw TypeError
 *   3. catch block runs: console.log(error.message) → "return null"
 *   4. The Promise is NEVER resolved or rejected
 *   5. It stays PENDING forever → .then() and .catch() NEVER fire
 *
 * WHY `return null` does nothing:
 *   The Promise executor's return value is IGNORED by the Promise machinery.
 *   You must call resolve() or reject() to settle a Promise.
 *   Returning null from the executor is like returning null from an event listener.
 *
 * THE RULE:
 *   Every code path inside a Promise executor MUST call resolve() OR reject().
 *   No code path should silently exit without settling the Promise.
 *
 * FIX: reject the Promise with the error instead of catching it locally.
 */

const checkNumber = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // FIX: no try/catch — let errors flow to reject()
      if (typeof number !== "number" || Number.isNaN(number)) {
        reject(new TypeError(`Valor inválido: ${number}`))
        return  // ← return after reject to stop execution
      }

      if (number % 2 === 0) {
        resolve("Número par")
      } else {
        reject("Número impar")
      }
    }, 100)
  })
}

// Now ALL cases settle the Promise — no hanging:
checkNumber("Yoandy")
  .then(v => console.log(v))
  .catch(e => console.log("Error:", e instanceof Error ? e.message : e))
  // → "Error: Valor inválido: Yoandy"

checkNumber(8)
  .then(v => console.log(v))
  .catch(e => console.log(e))
  // → "Número par"

checkNumber(7)
  .then(v => console.log(v))
  .catch(e => console.log(e))
  // → "Número impar"

checkNumber(NaN)
  .then(v => console.log(v))
  .catch(e => console.log("NaN error:", e instanceof Error ? e.message : e))
  // → "NaN error: Valor inválido: NaN"


// ════════════════════════════════════════════════════════════
// Ex4 — Sequential Promises (10/10 ✓)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 4. Sequential Promises \n")

/**
 * PERFECT. Chain is correct: each .then() returns the next Promise,
 * so the chain waits. Errors from any step go to .catch().
 *
 * Total time: 1s + 2s + 1.5s = 4.5s sequential — correct.
 */

function firstTask() {
  return new Promise(resolve => setTimeout(() => resolve("Primera tarea completada"), 1000))
}
function secondTask() {
  return new Promise(resolve => setTimeout(() => resolve("Segunda tarea completada"), 2000))
}
function thirdTask() {
  return new Promise(resolve => setTimeout(() => resolve("Tercera tarea completada"), 1500))
}

firstTask()
  .then(r => { console.log(r); return secondTask() })
  .then(r => { console.log(r); return thirdTask() })
  .then(r => console.log(r))


// ════════════════════════════════════════════════════════════
// Ex5 — async/await conversion (10/10 ✓)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 5. Convert Promise Chaining to async/await \n")

/**
 * PERFECT. The async/await version is semantically identical to Ex4's chain.
 * The code reads like synchronous top-to-bottom — that's the entire point.
 *
 * WHAT await DOES HERE:
 *   const r1 = await firstTask()
 *   — pauses executeTasks() until firstTask() resolves
 *   — r1 receives the resolved VALUE (not the Promise)
 *   — execution continues to the next line
 *
 * executeTasks() itself returns a Promise<void> because it's async.
 */

const executeTasks = async () => {
  console.log(await firstTask())
  console.log(await secondTask())
  console.log(await thirdTask())
}

executeTasks()


// ════════════════════════════════════════════════════════════
// Ex6 — Simulated API + Error Handling (6/10 → Fixed)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 6. Simulated API + Error Handling \n")

/**
 * BUG 1: Same try/catch-inside-executor pattern as Ex3.
 *   Invalid id → TypeError thrown → caught → return null → Promise hangs forever.
 *
 * BUG 2: Spec requires async/await + try/catch INSIDE the consuming function.
 *   Student's apiRequest: awaits getUser but has NO try/catch.
 *   Rejection propagates as an unhandled Promise rejection.
 *   Then .catch() is added externally — this is .then()/.catch() pattern,
 *   NOT the async/await + try/catch pattern the exercise requires.
 *
 * The spec explicitly says:
 *   "Usa async/await para llamar a getUser(id) y maneja los errores con try/catch"
 *
 * FIX:
 *   1. Reject invalid input instead of hanging
 *   2. Use try/catch INSIDE the async function that consumes getUser
 */

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // FIX 1: reject on invalid input — never catch/swallow inside executor
      if (typeof id !== "number" || Number.isNaN(id)) {
        reject(new TypeError(`ID inválido: ${id}`))
        return
      }

      if (id < 5) {
        resolve({ id, nombre: "Usuario " + id })
      } else {
        reject("Usuario no encontrado")
      }
    }, 500)  // reduced for demo
  })
}

/**
 * FIX 2: try/catch INSIDE the async function.
 * This is what "async/await + try/catch" means:
 * the error handling lives in the same function as the await.
 *
 * @param {Number} id user ID to fetch.
 */
const fetchUser = async (id) => {
  try {
    const user = await getUser(id)
    console.log(`User found:`, user)
    return user
  } catch (error) {
    // catch fires when the Promise rejects — error is the reject value
    console.log(`Error for id ${id}:`, error instanceof Error ? error.message : error)
    return null
  }
}

fetchUser(3)   // → { id: 3, nombre: 'Usuario 3' }
fetchUser(5)   // → "Usuario no encontrado"
fetchUser("x") // → TypeError: ID inválido: x


// ════════════════════════════════════════════════════════════
// Ex7 — Event Loop (10/10 ✓)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 7. Event Loop \n")

/**
 * PERFECT PREDICTION AND EXPLANATION.
 *
 * Your explanation mapped each line to the correct queue:
 *   console.log("Inicio")  → call stack → runs first
 *   setTimeout(fn, 0)      → macrotask queue → runs last
 *   Promise.resolve().then → microtask queue → runs after stack empties
 *   console.log("Fin")     → call stack → runs second
 *
 * Output: Inicio → Fin → Promesa resuelta → setTimeout ejecutado ✓
 *
 * This is the most important async concept to understand deeply.
 * Every React developer gets caught by this at some point.
 */

console.log("Inicio")
setTimeout(() => console.log("setTimeout ejecutado"), 0)
Promise.resolve().then(() => console.log("Promesa resuelta"))
console.log("Fin")


// ════════════════════════════════════════════════════════════
// Ex8 — Promise.all concurrent (10/10 ✓)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 8. Promise.all and Concurrent Execution \n")

/**
 * PERFECT.
 *
 * All three Promises are created and started BEFORE any awaiting happens.
 * Promise.all() waits for all three simultaneously.
 * Total time = max(1000, 2000, 1500) = 2000ms NOT 4500ms.
 *
 * DESTRUCTURING THE RESULTS:
 * Your destructuring ([onfulfilled1, onfulfilled2, onfulfilled3]) is correct
 * but the variables are never used. Minor: name them meaningfully.
 */

const job1 = () => new Promise(resolve => setTimeout(() => resolve("Job 1 done."), 1000))
const job2 = () => new Promise(resolve => setTimeout(() => resolve("Job 2 done."), 2000))
const job3 = () => new Promise(resolve => setTimeout(() => resolve("Job 3 done."), 1500))

const t8 = Date.now()
Promise.all([job1(), job2(), job3()])
  .then(([r1, r2, r3]) => {
    console.log(`Todas las promesas resueltas (${Date.now() - t8}ms)`)
    console.log(r1, r2, r3)  // Log the actual results
  })
  .catch(error => console.log("Error:", error))


// ════════════════════════════════════════════════════════════
// Ex9 — Promise-Based Delay (7/10 → Fixed)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 9. Promise-Based Delay \n")

/**
 * BUG 1: Same try/catch-inside-executor pattern.
 *   waitSeconds("bad") → catch logs → return null → Promise hangs.
 *
 * BUG 2: DOUBLE TIMEOUT.
 *   Student writes:
 *     setTimeout(async () => {
 *       await waitSeconds(3)
 *       console.log("Tiempo finalizado")
 *     }, 3000)
 *
 *   This waits 3000ms for the setTimeout, THEN waits another 3000ms
 *   for waitSeconds(3). Total: ~6 seconds, not 3.
 *
 *   The spec says: "wait 3 seconds before showing Tiempo finalizado"
 *   FIX: call waitSeconds(3) directly — it already handles the delay.
 *
 * waitSeconds is a SLEEP utility. The caller just awaits it.
 * No outer setTimeout needed.
 */

const waitSeconds = (segundos) => {
  return new Promise((resolve, reject) => {
    // FIX 1: reject invalid input — don't try/catch inside executor
    if (typeof segundos !== "number" || Number.isNaN(segundos)) {
      reject(new TypeError(`Valor inválido: ${segundos}`))
      return
    }
    if (segundos < 0) {
      reject(new RangeError(`El valor no puede ser negativo: ${segundos}`))
      return
    }
    // No need for special 0 case — setTimeout(fn, 0) works correctly
    setTimeout(() => resolve(), segundos * 1000)
  })
}

// FIX 2: just await waitSeconds — no outer setTimeout
;(async () => {
  try {
    await waitSeconds(1)  // 1 second for demo (would be 3 in production)
    console.log("Tiempo finalizado")
  } catch (error) {
    console.log("waitSeconds error:", error.message)
  }

  // Invalid inputs now reject properly:
  try {
    await waitSeconds("tres")
  } catch (e) {
    console.log("String rejected:", e.message)
  }

  try {
    await waitSeconds(-1)
  } catch (e) {
    console.log("Negative rejected:", e.message)
  }
})()


// ════════════════════════════════════════════════════════════
// Ex10 — Asynchronous ATM (8/10 → Fixed)
// ════════════════════════════════════════════════════════════
console.log("\n Exercise 10. Asynchronous ATM \n")

/**
 * BUG: Promise nested inside a Promise executor.
 *
 * Student's withdrawMoney():
 *   new Promise((resolve, reject) => {
 *     setTimeout(() => {
 *       const balance = checkBalance()   ← returns a Promise
 *       balance.then(...)                ← another async chain INSIDE executor
 *     }, 2000)
 *   })
 *
 * WHY THIS IS FRAGILE:
 *   1. If checkBalance() rejects, the .catch() only logs it
 *      — the outer Promise is NEVER settled (hangs).
 *   2. The timing is wrong: 2000ms (setTimeout) + 100ms (checkBalance) = 2100ms,
 *      not 2000ms as the spec requires.
 *   3. "Promise inside Promise" is the async equivalent of callback hell.
 *      It's a sign the function should be async instead.
 *
 * THE RIGHT PATTERN:
 *   When you need to call another async function inside your async operation,
 *   make your function async and use await.
 *   Don't nest Promises inside Promise executors.
 *
 * FIX: withdrawMoney becomes async, uses await internally.
 *
 * NOTE: Your atm() function is correct — good async/await structure,
 * correct try/catch, correct sequential flow. The bug was only in withdrawMoney.
 */

let balance = 500  // renamed from balanceYoandy for clarity

const checkBalance = () =>
  new Promise(resolve => setTimeout(() => resolve(balance), 1000))

/**
 * FIX: async function instead of Promise-in-Promise.
 * @param {Number} amount amount to withdraw.
 * @returns {Promise<Number>} remaining balance.
 */
const withdrawMoney = async (amount) => {
  // simulate 2 second processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  // now check balance — clean, no nesting
  const current = await checkBalance()

  if (current < amount) {
    throw new Error("Fondos insuficientes")  // ← throw in async fn = rejection
  }

  balance = current - amount
  return balance
}

const atm = async () => {
  try {
    const currentBalance = await checkBalance()
    console.log(`Saldo disponible: ${currentBalance}$`)

    console.log("Retirando 300$...")
    const after1 = await withdrawMoney(300)
    console.log(`Operación exitosa, saldo restante: ${after1}$`)

    console.log("Retirando 300$...")
    const after2 = await withdrawMoney(300)
    console.log(`Operación exitosa, saldo restante: ${after2}$`)

  } catch (error) {
    // catch fires when withdrawMoney throws "Fondos insuficientes"
    console.log(`Error: ${error.message}`)
  }
}

atm()
/*
Expected output:
Saldo disponible: 500$
Retirando 300$...
Operación exitosa, saldo restante: 200$
Retirando 300$...
Error: Fondos insuficientes
*/


// ════════════════════════════════════════════════════════════
// MASTER RULE — The Promise Executor Contract
// ════════════════════════════════════════════════════════════
/**
 *
 * THE ONE RULE YOU MUST NEVER BREAK:
 *
 *   Every code path inside a Promise executor MUST call resolve() OR reject().
 *   No path should exit silently.
 *
 * This catches the bug in Ex3, Ex6, and Ex9:
 *
 *   ✗ WRONG — try/catch swallows error, promise hangs:
 *   new Promise((resolve, reject) => {
 *     try {
 *       if (invalid) throw new Error("bad")
 *       resolve(value)
 *     } catch (e) {
 *       console.log(e.message)
 *       return null  // ← executor return is IGNORED. Promise hangs forever.
 *     }
 *   })
 *
 *   ✓ CORRECT — all paths settle the Promise:
 *   new Promise((resolve, reject) => {
 *     if (invalid) { reject(new Error("bad")); return }
 *     resolve(value)
 *   })
 *
 * MENTAL MODEL:
 *   A Promise is a box. Once you open the box (create it), someone
 *   MUST put either a value (resolve) or an error (reject) inside.
 *   A Promise that never settles is an empty box that nobody can open.
 *   .then() and .catch() wait for the box to be filled — forever, silently.
 *
 * CHECKING FOR HUNG PROMISES IN PRODUCTION:
 *   Any Promise that takes unexpectedly long is likely hung.
 *   Always add timeout logic for external operations:
 *
 *   const withTimeout = (p, ms) =>
 *     Promise.race([
 *       p,
 *       new Promise((_, r) => setTimeout(() => r(new Error("Timeout")), ms))
 *     ])
 */
