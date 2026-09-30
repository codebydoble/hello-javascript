/**
 * APIs Exam
 * Author: Yoandy Doble Herrera - codebydoble
 * Date: 18/09/2026
 * Time start: 04:00 pm
 * Time end:  12:00 am
 */
"use strict"
import dotenv from "dotenv"
const BASEURL = `https://jsonplaceholder.typicode.com`
const POKEAPI = `https://pokeapi.co/api/v2/pokemon/`
// Load .env file contents into process.env by default
dotenv.config()
const apiKey = process.env.OPENWEATHER_API_KEY

/* Exercise 1 */
console.log(` ---- Exercise 1 ----\n`)

/**
 * Function that retrieves a list of posts from JSONPlaceholder using an HTTP `GET` request.
 * Async/Await used. Handling errors used.
 * @returns {Object[]} a list of posts from JSONPlaceholder if response error throw error.
 */
const getPosts = async () => {
  try {
    const response = await fetch(`${BASEURL}/posts`)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const posts = await response.json()
    return posts
  } catch (error) {
    throw error
  }
}

console.log("Ex 1 test 1 - success\n")

try {
  console.log(await getPosts())
} catch (error) {
  console.error(error.message)
}

console.log("Ex 1 test 2 - posts\n")
try {
  const posts = await getPosts()
  console.log(posts)
} catch (error) {
  console.error(error.message)
}

console.log(` ---- Exercise 2 ----\n`)

/**
 * Function that retrieves a list of posts from JSONPlaceholder using an HTTP `GET` request.
 * @returns {Object[]} a list of posts from JSONPlaceholder if response error throw error.
 */
const getPostsValidated = async (enpoint) => {
  try {
    const response = await fetch(`${enpoint}`)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const posts = await response.json()
    return posts
  } catch (error) {
    throw error
  }
}

console.log("Ex 2 test 1 - success\n")
try {
  const postsEx2T1 = await getPostsValidated(`https://jsonplaceholder.typicode.com/posts`)
  console.log(postsEx2T1)
} catch (error) {
  console.error(error.message)
}

console.log("Ex 2 test 2 - error\n")
;(async () => {
  try {
    const postsEx2T2 = await getPostsValidated(`https://jsonplaceholder.typicode.com/invalid-endpoint`)
    console.log(postsEx2T2)
  } catch (error) {
    console.log(error.message)
  }
})()

console.log(` ---- Exercise 3 ----\n`)

/**
 * Function that retrieves a list of posts from JSONPlaceholder using an HTTP `GET` request.
 * @param {String} endpoint The JSONPlaceholder posts endpoint.
 * @returns {Object[]} a list of posts from JSONPlaceholder. If response error throw error.
 */
const getPostsAsync = async (endpoint) => {
  try {
    const response = await fetch(`${BASEURL}${endpoint}`)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const posts = await response.json()
    return posts
  } catch (error) {
    throw error
  }
}

console.log(`Test Ex 3 case 1\n`)
try {
  const posts = await getPostsAsync("/posts")
  console.log(posts)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 3 case 2\n`)
try {
  const posts = await getPostsAsync("/admins")
  console.log(posts)
} catch (error) {
  console.error(error.message)
}

console.log(` ---- Exercise 4 ----\n`)

/**
 * Create a new post in JSONPlaceholder using an HTTP `POST` request.
 * @param {Object} data any post information.
 * @returns {Object} return a JSON object representing the submitted post. If response error throw error.
 */
const createPost = async (data) => {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(`${BASEURL}/posts`, config)
    if (!response.ok) throw new Error(`New post failed, HTTP POST error: ${response.status}`)
    const post = await response.json()
    return post
  } catch (error) {
    throw error
  }
}

console.log(`Test Ex 4 case 1\n`)
try {
  const firstPost = await createPost({
    title: "Learning APIs",
    body: "Practicing POST requests with fetch",
    userId: 1,
  })
  console.log(firstPost)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 4 case 2\n`)
try {
  const newPost = await createPost({
    title: "Mastering JS",
    body: "Chapter 10: APIs.",
    userId: 4,
  })
  console.log(newPost)
} catch (error) {
  console.error(error.message)
}

console.log(` ---- Exercise 5 ----\n`)

/**
 * Update a resource in JSONPlaceholder using an HTTP `PUT` request.
 * @param {String} id Resource ID.
 * @param {String} endpoint any JSONPlaceholder url endpoint like: /posts | /users | /comments    
 * @param {Object} replacement any complete replacement object. Example
> {
  id: 1,
  title: "Updated title",
  body: "Updated complete body",
  userId: 1
}
 * @returns {Object} return a JSON object representing the updated post. If response error throw error.
 */
const updateResource = async (id, endpoint, replacement) => {
  try {
    const url = `${BASEURL}${endpoint}/${id}`
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(replacement),
    }
    const response = await fetch(url, config)
    if (!response.ok) throw new Error(`Post update failed, HTTP PUT error: ${response.status}`)
    const post = await response.json()
    return post
  } catch (error) {
    throw error
  }
}

/** 6. Explain in a comment how `PUT` differs from `PATCH`. */
// R/ Method PUT replaces the complete representation of an existing resource and method PATCH only replace the section selected of an existing resource. Patch partially update a resource.

console.log(`Test Ex 5 case 1\n`)
try {
  const post = await updateResource("1", "/posts", {
    id: 1,
    title: "Updated title",
    body: "Updated complete body",
    userId: 1,
  })
  console.log(post)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 5 case 2\n`)
try {
  const post = await updateResource("5", "/users", {
    id: 5,
    name: "Yoandy Doble Herrera",
    username: "codebydoble",
    email: "codebydoble@js.mx",
    address: {
      street: "Skiles Walks St.",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-4400",
    website: "codebydoble.github.io",
    company: {
      name: "Star LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
  })
  console.log(post)
} catch (error) {
  console.error(error.message)
}

console.log(` ---- Exercise 6 ----\n`)

/**
 * Partially update a resource in JSONPlaceholder using an HTTP `PUT` request.
 * @param {String} id Resource ID.
 * @param {String} endpoint any JSONPlaceholder url endpoint like: /posts | /users | /comments    
 * @param {Object} replacement any fields replacement object. Example
> {
  title: "Updated title",
}
 * @returns {Object} return a JSON object representing the updated post. If response error throw error.
 */
const partialUpdateResource = async (id, endpoint, replacement) => {
  try {
    const url = `${BASEURL}${endpoint}/${id}`
    console.log(url)
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(replacement),
    }
    const response = await fetch(url, config)
    if (!response.ok) throw new Error(`Fields update failes, HTTP PATCH error: ${response.status}`)
    const post = await response.json()
    return post
  } catch (error) {
    throw error
  }
}

/** 6. Explain why `PATCH` is appropriate for a partial update. */
// R. Because partial update fields in a resource. The program only needs the section to update. So, it's rewrite the new information only.

console.log(`Test Ex 6 case 1\n`)
try {
  const post = await partialUpdateResource("2", "/posts", {
    title: "Only the title changed",
  })
  console.log(post)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 6 case 2\n`)
try {
  const post = await partialUpdateResource("6", "/users", {
    name: "Kevin Hart",
  })
  console.log(post)
} catch (error) {
  console.error(error.message)
}

console.log(` ---- Exercie 7 ----\n`)

/**
 * Function that delete a post using an HTTP `DELETE` request and verify the result.
 * @param {String} id Resource ID.
 * @param {String} endpoint any JSONPlaceholder url endpoint like: /posts | /users | /comments
 * @returns {Object} Return an object with keys success and status 
 * > {
  success: true,
  status: 200
  }
 */
const deleteResource = async (id, endpoint) => {
  try {
    const url = `${BASEURL}${endpoint}/${id}`
    console.log(url)

    const config = {
      method: "DELETE",
    }
    const response = await fetch(url, config)
    if (!response.ok) throw new Error(`Delete failed, HTTP error: ${response.status}`)
    return {
      success: true,
      status: 200,
    }
  } catch (error) {
    throw error
  }
}

console.log(`Test Ex 7 case 1\n`)

try {
  const response = await deleteResource("1", "/posts")
  console.log(`Post deleted status ${response.status}`)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 7 case 2\n`)
try {
  const post = await deleteResource("6", "/comments")
  console.log(`Comment deleted ${post.success} status ${post.status}`)
} catch (error) {
  console.error(error.message)
  return error.message
}

console.log(` ---- Exercie 8 ----\n`)

/**
 * Function that retrieves current weather data from OpenWeatherMap.
 * @param {String} city any city name to request.
 * @param {String} apiKey any api key from OpenWeatherMap.
 * @returns {Object} return weather data containing information such as:
  > {
   city: "City name",
   temperature: number,
   weather: "weather description",
   humidity: "humidity"
  }
 */
const currentWeather = async (city, apiKey) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
    const response = await fetch(url)
    if (response.status === 401) throw new Error(`Missing or invalid API key. HTTP error: ${response.status}`)
    if (response.status === 404) throw new Error(`Invalid city. HTTP error: ${response.status}`)
    if (!response.ok) {
      throw new Error(`Weather fetch failed, HTTP error: ${response.status}`)
    }
    const weather = await response.json()
    return { name: weather.name, temperature: weather?.main?.temp, weather: weather.weather, humidity: weather?.main?.humidity }
  } catch (error) {
    throw error
  }
}

console.log(`Test Ex 8 case 1 Valid city and valid API key.\n`)
try {
  const response = await currentWeather("London", apiKey)
  console.log(response)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 8 case 2 Invalid city.\n`)
try {
  const response = await currentWeather("Invalid city", apiKey)
  console.log(response)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 8 case 3 Missing or invalid API key.\n`)
try {
  const response = await currentWeather("Ontario", "OPENWEATHER_API_KEY")
  console.log(response)
} catch (error) {
  console.error(error.message)
}

console.log(` ---- Exercie 9 ----\n`)

/**
 * Funtion that use the PokéAPI to retrieve a Pokémon, its species data, and its evolution chain through multiple dependent API requests.
 * @param {String} pokemonName any pokemon name
 * @returns {Object}
 */
const pokemonRelationships = async (pokemonName) => {
  try {
    const r1 = await fetch(`${POKEAPI}${pokemonName}`)
    if (!r1.ok) throw new Error(`Fetching ${pokemonName} failed: ${r1.status}`)
    const pokemon = await r1.json()

    // Step 2: fetch species URL from pokemon.species.url
    const r2 = await fetch(pokemon.species.url)
    if (!r2.ok) throw new Error(`Species fetch failed: ${r2.status}`)
    const species = await r2.json()

    // Step 3: fetch evolution chain URL from species.evolution_chain.url
    const r3 = await fetch(species.evolution_chain.url)
    if (!r3.ok) throw new Error(`Evolution chain fetch failed: ${r3.status}`)
    const evolutionChain = await r3.json()

    return { pokemon: { name: pokemon.name, id: pokemon.id }, species, evolutionChain }
  } catch (error) {
    throw error
  }
}

console.log(`Test Ex 9 case 1 valid Pokémon.\n`)
try {
  const response = await pokemonRelationships("pikachu")
  console.log(response)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 9 case 2 valid Pokémon.\n`)
try {
  const response = await pokemonRelationships("eevee")
  console.log(response)
} catch (error) {
  console.error(error.message)
}

console.log(`Test Ex 9 case 3 an invalid Pokémon.\n`)
try {
  const response = await pokemonRelationships("poke")
  console.log(response)
} catch (error) {
  console.error(error.message)
}
