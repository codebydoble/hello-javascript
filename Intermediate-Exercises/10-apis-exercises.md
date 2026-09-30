# Topic 09 — APIs (Application Programming Interfaces)

## JavaScript Intermediate Exam

**Reference class:** Clase 60 — APIs  
**Reference video:** https://youtu.be/iJvLAZ8MJ2E?t=18710  
**Total:** 100 points  
**Exercises:** 10  
**Suggested environment:** JavaScript, Node.js 18+ or a modern browser

---

## Exam Instructions

This exam evaluates your ability to consume and interact with REST APIs using JavaScript.

For each exercise:

- Read the objective, input, constraints, and expected output carefully.
- Use `fetch()` unless another tool is explicitly requested.
- Handle both successful responses and HTTP errors.
- Prefer clear, reusable functions over duplicated code.
- Do not expose API keys in the repository.
- Use `console.log()` for successful results and `console.error()` for errors when appropriate.
- Include at least two meaningful test cases for each exercise when possible.

### Recommended response-handling pattern

```js
const response = await fetch(url)

if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`)
}

const data = await response.json()
```

> Important: `fetch()` does not automatically reject its promise when the server returns an HTTP error such as 404 or 500. You must check `response.ok`.

---

## Evaluation Criteria

Each exercise is worth **10 points**:

- **2 pts — Requirements:** Solves the requested problem.
- **2 pts — Input and configuration:** Uses appropriate parameters and data.
- **2 pts — Error handling:** Handles network, HTTP, or logical errors appropriately.
- **2 pts — Code quality:** Clear names, reusable functions, and readable structure.
- **2 pts — Testing:** Includes meaningful tests or demonstrates correct execution.

---

# Exercise 1 — GET Request with JSONPlaceholder

## Objective

[x] Create a function that retrieves a list of posts from JSONPlaceholder using an HTTP `GET` request.

## Input

- No function argument is required.
- API endpoint:

```text
https://jsonplaceholder.typicode.com/posts
```

## Requirements

1. Use `fetch()`.
2. Convert the response body to JSON.
3. Return the list of posts from the function.
4. Display the received posts in the console.
5. Do not manually recreate the API response.

## Expected Result

The function should resolve to an array of post objects. Each post should contain fields such as:

```js
{
  userId: 1,
  id: 1,
  title: "...",
  body: "..."
}
```

## Constraints

- Do not use external HTTP libraries.
- Use asynchronous code correctly.
- Keep the request logic inside a reusable function.

## Suggested Test

```js
const posts = await getPosts()
console.log(posts)
```

---

# Exercise 2 — Validate the HTTP Response

## Objective

[x] Improve Exercise 1 by validating the HTTP response using `response.ok`.

## Input

- The same JSONPlaceholder posts endpoint:

```text
https://jsonplaceholder.typicode.com/posts
```

## Requirements

1. Make a `GET` request.
2. Check `response.ok` before parsing the body.
3. If the response is unsuccessful, throw an error containing the HTTP status.
4. Parse and return the JSON only when the response is successful.
5. Catch and display the error without silently ignoring it.

## Expected Result

- For a successful request: return an array of posts.
- For an unsuccessful request: reject the promise with a meaningful error.

## Constraints

- Do not assume that `fetch()` rejects for HTTP status codes such as 404.
- Do not return an empty array as a substitute for an error.
- Preserve useful error information.

## Suggested Tests

Test the function with:

1. A valid endpoint.
2. An invalid endpoint such as:

```text
https://jsonplaceholder.typicode.com/invalid-endpoint
```

---

# Exercise 3 — Rewrite the GET Request with async/await

## Objective

[x] Rewrite the GET request from Exercise 1 using `async/await` and structured error handling.

## Input

- The JSONPlaceholder posts endpoint.
- No additional function argument is required.

## Requirements

1. Create an `async` function named `getPostsAsync`.
2. Use `await` for the fetch request.
3. Use `await` to parse the JSON body.
4. Validate the response with `response.ok`.
5. Use `try/catch` at the execution boundary to display errors.
6. Return the data from the function instead of only logging it.

## Expected Result

The function should return a promise that resolves to an array of posts or rejects with a meaningful error.

## Constraints

- Do not mix unnecessary `.then()` chains with `async/await`.
- Do not catch an error and pretend the operation succeeded.
- Separate data retrieval from console output.

## Suggested Test

```js
try {
  const posts = await getPostsAsync()
  console.log(posts)
} catch (error) {
  console.error(error.message)
}
```

---

# Exercise 4 — Create a Post with POST

## Objective

[x] Create a new post in JSONPlaceholder using an HTTP `POST` request.

## Input

Create an object with at least these properties:

```js
{
  title: "Learning APIs",
  body: "Practicing POST requests with fetch",
  userId: 1
}
```

## Requirements

1. Send a `POST` request to:

```text
https://jsonplaceholder.typicode.com/posts
```

2. Set the `Content-Type` header to `application/json`.
3. Serialize the request body with `JSON.stringify()`.
4. Validate the HTTP response with `response.ok`.
5. Parse and return the created resource.
6. Display the returned resource.

## Expected Result

The API should return a JSON object representing the submitted post, normally including a generated `id`.

## Constraints

- Do not send a JavaScript object directly as the request body.
- Do not omit the content type.
- Remember that JSONPlaceholder simulates creation; it does not permanently store the post.

## Suggested Test

Create two posts with different titles and bodies.

---

# Exercise 5 — Update a Complete Resource with PUT

## Objective

[x] Use `PUT` to replace the complete representation of an existing post.

## Input

- Resource ID: `1`
- Endpoint:

```text
https://jsonplaceholder.typicode.com/posts/1
```

- Complete replacement object:

```js
{
  id: 1,
  title: "Updated title",
  body: "Updated complete body",
  userId: 1
}
```

## Requirements

1. Send a `PUT` request.
2. Include the complete resource representation in the request body.
3. Set the correct content type.
4. Validate `response.ok`.
5. Parse and return the response JSON.
6. Explain in a comment how `PUT` differs from `PATCH`.

## Expected Result

Return the updated post representation supplied to the API.

## Constraints

- Use `PUT`, not `PATCH`.
- Include all relevant post fields.
- Do not assume the simulated update is permanently stored.

---

# Exercise 6 — Partially Update a Resource with PATCH

## Objective

[x] Use `PATCH` to modify only selected fields of an existing post.

## Input

- Resource ID: `1`
- Endpoint:

```text
https://jsonplaceholder.typicode.com/posts/1
```

- Partial update:

```js
{
  title: "Only the title changed"
}
```

## Requirements

1. Send a `PATCH` request.
2. Modify only one or two fields.
3. Set the `Content-Type` header to `application/json`.
4. Validate the response.
5. Parse and return the updated representation.
6. Explain why `PATCH` is appropriate for a partial update.

## Expected Result

The response should represent the requested partial modification.

## Constraints

- Do not send the complete object unless necessary.
- Do not use `PUT` for this exercise.
- Do not assume that the change is permanently stored by JSONPlaceholder.

## Suggested Tests

1. Update only the title.
2. Update the title and body.

---

# Exercise 7 — Delete a Resource with DELETE

## Objective

[x] Delete a post using an HTTP `DELETE` request and verify the result.

## Input

- Resource ID: `1`
- Endpoint:

```text
https://jsonplaceholder.typicode.com/posts/1
```

## Requirements

1. Send a `DELETE` request.
2. Validate the response with `response.ok`.
3. Return a meaningful result from the function.
4. Display the HTTP status.
5. Handle unsuccessful responses.
6. Avoid attempting to parse JSON if the response has no body.

## Expected Result

Return an object similar to:

```js
{
  success: true,
  status: 200
}
```

The exact status may depend on the API behavior.

## Constraints

- Use the `DELETE` method.
- Do not report success when the HTTP response is unsuccessful.
- Do not assume every successful DELETE response contains JSON.

---

# Exercise 8 — Retrieve Weather Data from OpenWeatherMap

## Objective

[x] Create a reusable function that retrieves current weather data from OpenWeatherMap.

## Input

The function should receive:

```text
city
apiKey
```

Example:

```js
getWeather("London", process.env.OPENWEATHER_API_KEY)
```

## Requirements

1. Use the OpenWeatherMap current weather endpoint.
2. Include the city and API key in the request.
3. Use appropriate query parameters, including units.
4. Validate the HTTP response.
5. Parse and return the JSON data.
6. Handle missing API keys and API errors.
7. Do not hardcode the API key in the source code.

## Expected Result

Return weather data containing information such as:

- City name
- Temperature
- Weather description
- Humidity

## Constraints

- Use an environment variable or another secure local configuration method.
- Do not publish your API key.
- Do not claim that a request succeeded when the API returned an error.
- If you cannot access a valid API key, create a mock or clearly documented test strategy without exposing credentials.

## Suggested Tests

1. Valid city and valid API key.
2. Invalid city.
3. Missing or invalid API key.

---

# Exercise 9 — Follow Pokémon API Relationships

## Objective

[x] Use the PokéAPI to retrieve a Pokémon, its species data, and its evolution chain through multiple dependent API requests.

## Input

The function should receive a Pokémon name, for example:

```js
"pikachu"
```

## Required API Flow

### Step 1 — Pokémon data

Request:

```text
https://pokeapi.co/api/v2/pokemon/{name}
```

Extract the species URL from the response.

### Step 2 — Species data

Request the species URL obtained in Step 1.

Extract the evolution chain URL from the species response.

### Step 3 — Evolution chain

Request the evolution chain URL.

Extract and return the evolution chain information.

## Requirements

1. Implement the three-step request flow.
2. Use the URL returned by the previous response instead of manually hardcoding every dependent URL.
3. Validate every HTTP response.
4. Handle an unknown Pokémon name.
5. Return a structured result containing:
   - Pokémon name
   - Species URL or species data
   - Evolution chain URL or evolution chain data
6. Use helper functions when they improve readability.

## Expected Result

For a valid Pokémon, return a structured object similar to:

```js
{
  pokemon: { /* Pokémon data */ },
  species: { /* Species data */ },
  evolutionChain: { /* Evolution chain data */ }
}
```

## Constraints

- Do not make all requests independent; later requests depend on earlier responses.
- Do not ignore failed requests.
- The evolution chain may contain nested structures. Preserve the API data or transform it clearly.

## Suggested Tests

1. `"pikachu"`
2. `"eevee"`
3. An invalid Pokémon name.

---

# Exercise 10 — Test API Endpoints with Postman or Thunder Client

## Objective

[x] Use Postman or Thunder Client to manually test different endpoints of a public API and document the results.

## Input

Test at least the following JSONPlaceholder endpoints:

1. `GET /posts`
2. `GET /posts/1`
3. `POST /posts`
4. `PUT /posts/1`
5. `PATCH /posts/1`
6. `DELETE /posts/1`
7. One invalid endpoint

Base URL:

```text
https://jsonplaceholder.typicode.com
```

## Requirements

For each request, document:

- HTTP method
- Complete URL
- Request headers
- Request body, when applicable
- HTTP status
- Relevant response body
- Whether the request was successful
- One observation about the result

Create a Markdown report containing a table similar to:

| #   | Method | Endpoint   | Status | Result  | Observation        |
| --- | ------ | ---------- | -----: | ------- | ------------------ |
| 1   | GET    | `/posts`   |    200 | Success | Returned a list    |
| 2   | GET    | `/invalid` |    404 | Error   | Resource not found |

## Expected Result

A Markdown file named:

```text
api-testing-report.md
```

The report must contain evidence of the requests, such as copied response details or screenshots.

## Constraints

- Use Postman or Thunder Client.
- Do not include private tokens or credentials.
- Clearly distinguish successful responses from error responses.
- Do not write only general explanations; include actual test results.

---

# Final Submission Checklist

Before submitting, verify that:

- [x] All 10 exercises are completed.
- [x] Functions return useful values instead of only logging them.
- [x] `response.ok` is checked for HTTP responses.
- [x] Errors are not silently swallowed.
- [x] Request bodies are serialized with `JSON.stringify()` when required.
- [x] JSON headers are configured correctly.
- [x] `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` are used appropriately.
- [x] API keys are not hardcoded or committed.
- [x] Dependent requests use data from previous responses.
- [x] At least two test cases are included where practical.
- [x] Code is readable and uses meaningful names.
- [x] The Postman or Thunder Client report is included.

---

# Pre-Code Planning Template

Complete this template before implementing each exercise.

```text
OBJECTIVE:
What problem am I solving?

INPUT:
What data, parameters, or configuration does the function receive?

BASE CASE / SIMPLE CASE:
What should happen with the simplest valid input?

SUCCESS CONDITION:
What indicates that the operation succeeded?

FAILURE CONDITION:
What errors or invalid situations must be handled?

EXECUTION MODEL:
Are requests sequential, concurrent, or independent? Why?

HTTP METHOD:
Which method am I using, and why?

RESPONSE VALIDATION:
How will I verify that the HTTP response is successful?

OUTPUT:
What exact value should the function return?

TEST CASES:
Which successful and failing cases will I test?
```

## Submission Format

Recommended project structure:

```text
topic-09-apis/
├── src/
│   ├── exercise-01.js
│   ├── exercise-02.js
│   ├── exercise-03.js
│   ├── exercise-04.js
│   ├── exercise-05.js
│   ├── exercise-06.js
│   ├── exercise-07.js
│   ├── exercise-08.js
│   └── exercise-09.js
├── api-testing-report.md
└── README.md
```

**Do not include API keys, passwords, or private credentials in your submission.**
"""

# Topic 09 - APIs Application Programming Interface

Clase 60 - APIs: [Video](https://youtu.be/iJvLAZ8MJ2E?t=18710)

## Exercise 1

[] Realiza una petición GET con fetch() a JSONPlaceholder y muestra en la consola la lista de publicaciones

## Exercise 2

[] Modifica el ejercicio anterior para que verifique si la respuesta es correcta usando response.ok. Si no lo es, lanza y muestra un error

## Exercise 3

[] Reescribe el ejercicio 1 usando la sintaxis async/await en lugar de promesas

## Exercise 4

[] Realiza una petición POST a JSONPlaceholder para crear una nueva publicación. Envía un objeto con propiedades como title o body

## Exercise 5

[] Utiliza el método PUT para actualizar completamente un recurso (por ejemplo, modificar una publicación) en JSONPlaceholder

## Exercise 6

[] Realiza una petición PATCH para modificar únicamente uno o dos campos de un recurso existente

## Exercise 7

[] Envía una solicitud DELETE a la API para borrar un recurso (por ejemplo, una publicación) y verifica la respuesta

## Exercise 8

[] Crea una función que realice una solicitud GET (la que quieras) a OpenWeatherMap

## Exercise 9

[] Utiliza la PokéAPI para obtener los datos de un Pokémon concreto, a continuación los detalles de la especie y, finalmente, la cadena evolutiva a partir de la especie

## Exercise 10

[] Utiliza una herramienta como Postman o Thunder Client para probar diferentes endpoint de una API
