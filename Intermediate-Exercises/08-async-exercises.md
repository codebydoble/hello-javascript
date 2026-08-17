# Topic 08 - Asynchronous JavaScript Exercises

## Exercise 1. Callback + `setTimeout`

### Objective

[x] Create a function `greet(name, callback)` that simulates an asynchronous operation.

The function must wait **2 seconds** and then execute the callback to display:

```text
Hola, [nombre]
```

### Input

```javascript
greet(name, callback)
```

- `name`: a `string` containing the person's name.
- `callback`: a function executed after 2 seconds.

### Example Data

```javascript
greet("Yoandy", callback)

const callback = (message) => {
  console.log(message)
}
```

### Constraints

- Must use `setTimeout`.
- The delay must be exactly 2 seconds.
- The callback must not execute immediately.
- `greet` must receive the callback as a parameter.
- The message must use `name`.
- Do not use Promises or `async/await`.

### Expected Result

After approximately 2 seconds:

```text
Hola, Yoandy
```

### Concept Evaluated

**Callbacks + asynchronous execution with `setTimeout`.**

---

## Exercise 2. Sequential Callback Tasks

### Objective

[x] Create three asynchronous tasks and execute them **in sequence**, so `task2` starts only after `task1` finishes, and `task3` starts only after `task2` finishes.

### Input

```javascript
task1(callback)
task2(callback)
task3(callback)
```

### Example Data

Each task should produce:

```text
Task 1 completed
Task 2 completed
Task 3 completed
```

### Constraints

- Each task must take exactly 1 second.
- Must use `setTimeout`.
- `task2` starts after `task1` calls its callback.
- `task3` starts after `task2` calls its callback.
- Do not use Promises.
- Do not use `async/await`.

### Expected Result

```text
Task 1 completed
Task 2 completed
Task 3 completed
```

Approximate total time: **3 seconds**.

### Concept Evaluated

**Sequential callbacks and asynchronous task composition.**

---

## Exercise 3. Promise: Resolve or Reject

### Objective

[x] Create a function that determines whether a number is even or odd using a **Promise**.

### Input

```javascript
checkNumber(number)
```

- `number`: a JavaScript `number`.

### Example Data

```javascript
checkNumber(8)
checkNumber(7)
```

### Constraints

- The function must return a Promise.
- Even number: call `resolve`.
- Odd number: call `reject`.
- Use `%` for the validation.
- Resolve message: `Número par`.
- Reject message: `Número impar`.

### Expected Result

```text
checkNumber(8) → Promise fulfilled → "Número par"
checkNumber(7) → Promise rejected → "Número impar"
```

### Concept Evaluated

**Promise lifecycle: fulfilled and rejected states.**

---

## Exercise 4. Sequential Promises

### Objective

[x] Create three asynchronous operations using Promises and execute them **sequentially**.

### Input

```javascript
firstTask()
secondTask()
thirdTask()
```

### Example Data

| Function       | Delay | Message                    |
| -------------- | ----: | -------------------------- |
| `firstTask()`  |    1s | `Primera tarea completada` |
| `secondTask()` |    2s | `Segunda tarea completada` |
| `thirdTask()`  |  1.5s | `Tercera tarea completada` |

### Constraints

- Each function must return a Promise.
- Each Promise must resolve with its corresponding message.
- Tasks must execute sequentially.
- `secondTask()` cannot start before `firstTask()` finishes.
- `thirdTask()` cannot start before `secondTask()` finishes.

### Expected Result

```text
Primera tarea completada
Segunda tarea completada
Tercera tarea completada
```

Approximate total time: **4.5 seconds**.

### Concept Evaluated

**Promise chaining and sequential asynchronous execution.**

---

## Exercise 5. Convert Promise Chaining to `async/await`

### Objective

[x] Rewrite Exercise 4 using `async/await` while preserving exactly the same behavior.

### Input

Reuse:

```javascript
firstTask()
secondTask()
thirdTask()
```

Create:

```javascript
async function executeTasks()
```

### Example Data

```javascript
executeTasks()
```

### Constraints

- `executeTasks` must be an `async` function.
- Must use `await`.
- Tasks must execute sequentially.
- Do not use `.then()` inside `executeTasks`.
- Do not change the delays or messages.

### Expected Result

```text
Primera tarea completada
Segunda tarea completada
Tercera tarea completada
```

Approximate total time: **4.5 seconds**.

### Concept Evaluated

**Converting Promise chaining to `async/await`.**

---

## Exercise 6. Simulated API + Error Handling

### Objective

[x] Simulate an API request that searches for a user by ID and correctly handle both success and failure.

### Input

```javascript
getUser(id)
```

- `id`: a `number`.

### Example Data

```javascript
getUser(3) // existing user
getUser(5) // non-existing user
```

### Constraints

`getUser()`:

- Must return a Promise.
- Must wait exactly 2 seconds.
- If `id < 5`, resolve with:

```javascript
{
  id: 3,
  nombre: "Usuario 3"
}
```

- If `id >= 5`, reject with:

```text
Usuario no encontrado
```

The consumer must:

- use `async/await`;
- use `try/catch`;
- explicitly handle the rejection.

### Expected Result

For `getUser(3)`:

```javascript
{
  id: 3,
  nombre: "Usuario 3"
}
```

For `getUser(5)`:

```text
Usuario no encontrado
```

### Concept Evaluated

**`async/await` + Promise rejection + `try/catch` + simulated API calls.**

---

## Exercise 7. Event Loop

### Objective

[x] Predict the execution order between synchronous code, Promise microtasks, and `setTimeout`.

### Input

Execute exactly:

```javascript
console.log("Inicio")

setTimeout(() => {
  console.log("setTimeout ejecutado")
}, 0)

Promise.resolve().then(() => {
  console.log("Promesa resuelta")
})

console.log("Fin")
```

### Example Data

Use the exact code above without modifications.

### Constraints

Before executing:

1. Write the expected output order.
2. Explain why that order occurs.
3. Execute the code.
4. Compare the prediction with the actual output.

Do not modify the code.

### Expected Result

```text
Inicio
Fin
Promesa resuelta
setTimeout ejecutado
```

### Concept Evaluated

**Event loop, call stack, microtask queue, and task/macrotask queue.**

---

## Exercise 8. `Promise.all()` and Concurrent Execution

### Objective

[x] Execute three asynchronous operations **concurrently** and wait for all of them using `Promise.all()`.

### Input

```javascript
task1()
task2()
task3()
```

Each function must return a Promise.

### Example Data

```text
task1 → 1000 ms
task2 → 2000 ms
task3 → 1500 ms
```

All three tasks resolve successfully.

### Constraints

- All three tasks must be started before waiting for their results.
- Must use `Promise.all()`.
- Do not execute them sequentially with three independent `await` statements.
- `Promise.all()` must receive all three Promises.
- Display the success message only after all three resolve.

### Expected Result

```text
Todas las promesas resueltas
```

Approximate total time: **2 seconds**, not 4.5 seconds.

### Concept Evaluated

**Concurrent asynchronous execution with `Promise.all()`.**

---

## Exercise 9. Promise-Based Delay

### Objective

[x] Create a reusable function that pauses execution for a specified number of seconds and consume it using `async/await`.

### Input

```javascript
waitSeconds(seconds)
```

- `seconds`: a positive `number` representing seconds.

### Example Data

```javascript
await waitSeconds(3)
console.log("Tiempo finalizado")
```

### Constraints

- `waitSeconds()` must return a Promise.
- Must use `setTimeout`.
- Input represents seconds, not milliseconds.
- Do not use external libraries.
- The Promise must resolve after the requested delay.
- The consumer must use `await`.
- The main test must use exactly 3 seconds.

### Expected Result

After approximately 3 seconds:

```text
Tiempo finalizado
```

### Concept Evaluated

**Wrapping a callback-based API in a Promise and consuming it with `async/await`.**

---

## Exercise 10. Asynchronous ATM

### Objective

[x] Simulate an ATM that:

1. checks the current balance;
2. performs a withdrawal;
3. updates the balance;
4. attempts a second withdrawal;
5. rejects the second withdrawal because there are insufficient funds.

### Input

Create:

```javascript
checkBalance()
withdrawMoney(amount)

async function atm()
```

### Example Data

Initial balance:

```text
500$
```

Withdrawals:

```text
300$
300$
```

### Constraints

#### `checkBalance()`

- Must return a Promise.
- Must take exactly 1 second.
- Must initially return `500`.

#### `withdrawMoney(amount)`

- Must return a Promise.
- Must take exactly 2 seconds.
- Must use the current balance.
- If sufficient funds exist, subtract `amount` and resolve.
- If insufficient funds exist, do not modify the balance and reject with:

```text
Fondos insuficientes
```

#### `atm()`

- Must use `async/await`.
- Must check the balance first.
- Must withdraw 300.
- Must then attempt to withdraw another 300.
- The second withdrawal must fail because only 200 remain.
- Must handle the error using `try/catch`.
- Operations must execute sequentially.

### Expected Result

```text
Saldo disponible: 500$
Retirando 300$...
Operación exitosa, saldo restante: 200$
Retirando 300$...
Error: Fondos insuficientes
```

### Concept Evaluated

**Promises + `async/await` + `try/catch` + mutable state + sequential operations + asynchronous errors.**

---

# Completion Criteria

For every exercise, verify:

- [ ] The stated objective is solved.
- [ ] The function/API has the required input.
- [ ] The example data is used correctly.
- [ ] Every restriction is respected.
- [ ] The expected result is produced.
- [ ] The requested JavaScript concept is actually demonstrated.
- [ ] The implementation does not solve a different problem that merely produces similar output.

# Senior Review Rule

A solution is not considered correct merely because it produces the expected console output.

The implementation must demonstrate the **specific JavaScript concept requested by the exercise**.

Examples:

- A callback exercise must actually pass and invoke a callback.
- A Promise exercise must actually return a Promise.
- An `async/await` exercise must actually use `async` and `await`.
- A `Promise.all()` exercise must actually execute the operations concurrently.
- An Event Loop exercise must preserve the original scheduling scenario.
- An error-handling exercise must actually handle Promise rejection rather than hide or avoid the error.

The goal is to transform each exercise from a vague syntax challenge into a **small, testable functional requirement**, while preserving the original learning objective.
