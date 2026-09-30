/**
 * ════════════════════════════════════════════════════════════
 * APIs IN JAVASCRIPT — Complete Study Guide
 * Senior Fullstack Teacher Approach
 * Author: Claude | Student: Yoandy Doble Herrera
 * Run: node apis-study-guide.js
 * ════════════════════════════════════════════════════════════
 *
 * TOPICS:
 *  1.  What is an API — the mental model
 *  2.  HTTP fundamentals — methods, status codes, headers
 *  3.  fetch() — the native browser API
 *  4.  Request configuration — method, headers, body
 *  5.  Response handling — json, text, status checks
 *  6.  Error handling — network vs HTTP errors
 *  7.  async/await with fetch — production pattern
 *  8.  REST API patterns — CRUD operations
 *  9.  Headers — Authorization, Content-Type, CORS
 * 10.  AbortController — cancelling requests
 * 11.  Real-world service layer — how to structure API code
 * 12.  React connection — useEffect + fetch patterns
 */

// NOTE: fetch() is a browser API. In Node.js it's available from v18+.
// All examples use the public JSONPlaceholder API (https://jsonplaceholder.typicode.com)
// which is free, no auth required, perfect for learning.

"use strict"

// ════════════════════════════════════════════════════════════
// PART 1 — WHAT IS AN API
// ════════════════════════════════════════════════════════════

/**
 * API = Application Programming Interface
 *
 * A contract between two systems:
 *  "If you send me THIS, I'll give you THAT."
 *
 * A REST API (most common type on the web):
 *  - Uses HTTP as the transport layer
 *  - Data in JSON format (usually)
 *  - Stateless — each request is independent
 *  - Resources identified by URLs
 *
 * Mental model — a restaurant:
 *
 *   YOU (client)       WAITER (API)       KITCHEN (server/database)
 *   "I want users"  →  GET /users      →  runs DB query
 *                   ←  [{id:1,...}]    ←  returns results
 *
 * The API is the waiter. You don't need to know how the kitchen works.
 * You just need to know the menu (the API documentation).
 *
 * Three types of APIs you'll use as a frontend developer:
 *   1. REST APIs         — most common (this file)
 *   2. GraphQL           — single endpoint, you specify exact shape
 *   3. Browser APIs      — DOM, localStorage, Geolocation, etc (next file)
 */

// ════════════════════════════════════════════════════════════
// PART 2 — HTTP FUNDAMENTALS
// The language APIs speak
// ════════════════════════════════════════════════════════════

/**
 * ── HTTP METHODS (verbs — what you want to DO) ──────────────
 *
 *  GET     → Read data       — "give me the user with id 1"
 *  POST    → Create data     — "create a new user"
 *  PUT     → Replace data    — "replace the entire user object"
 *  PATCH   → Update data     — "only update the email field"
 *  DELETE  → Delete data     — "delete user with id 1"
 *
 * ── HTTP STATUS CODES (what happened) ───────────────────────
 *
 *  2xx — Success
 *    200 OK           → standard success
 *    201 Created      → resource was created (POST response)
 *    204 No Content   → success but no body (DELETE response)
 *
 *  3xx — Redirect
 *    301 Moved Permanently → resource moved to new URL
 *    304 Not Modified      → use your cached version
 *
 *  4xx — Client errors (YOU did something wrong)
 *    400 Bad Request    → malformed JSON, missing field
 *    401 Unauthorized   → no credentials / expired token
 *    403 Forbidden      → authenticated but no permission
 *    404 Not Found      → resource doesn't exist
 *    422 Unprocessable  → validation failed (invalid email format)
 *    429 Too Many Req   → rate limited
 *
 *  5xx — Server errors (SERVER did something wrong)
 *    500 Internal Error → bug on the server
 *    502 Bad Gateway    → upstream server down
 *    503 Unavailable    → server overloaded or maintenance
 *
 * ── CRITICAL RULE ────────────────────────────────────────────
 * fetch() does NOT throw on 4xx/5xx.
 * A 404 or 500 response is still a "successful" fetch from JS's point of view.
 * You MUST manually check response.ok or response.status.
 * This is the #1 mistake beginners make with fetch.
 *
 * ── HTTP HEADERS ─────────────────────────────────────────────
 * Key-value pairs sent with every request and response.
 *
 * Request headers you'll send:
 *   Content-Type: application/json    → "my body is JSON"
 *   Authorization: Bearer <token>     → "here's my auth token"
 *   Accept: application/json          → "I want JSON back"
 *
 * Response headers you'll read:
 *   Content-Type: application/json    → "the response body is JSON"
 *   Cache-Control: max-age=3600       → "cache this for 1 hour"
 *   X-RateLimit-Remaining: 59         → "59 requests left this minute"
 */

// ════════════════════════════════════════════════════════════
// PART 3 — fetch() BASICS
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 3: fetch() basics ════\n")

/**
 * fetch(url, options?) returns a Promise<Response>
 *
 * TWO-STEP PROCESS:
 *   Step 1: await fetch()          → get the Response object (headers, status)
 *   Step 2: await response.json()  → parse the body (also async — streams)
 *
 * Why two steps? The response body is a stream.
 * Headers arrive first, body arrives after.
 * fetch resolves when headers arrive, not when the full body is downloaded.
 */

// ── Simplest GET request ──────────────────────────────────
const getUser = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = await response.json()
  return user
}

// ── With proper error handling ────────────────────────────
const getUserSafe = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

    // CRITICAL: check if response was successful
    // response.ok = true when status is 200-299
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const user = await response.json()
    return user
  } catch (error) {
    // Two types of errors reach here:
    // 1. Network error (no internet, DNS failure, CORS) → fetch rejects
    // 2. HTTP error (404, 500) → we threw manually above
    console.error("getUser failed:", error.message)
    throw error // rethrow so caller can handle it
  }
}

// Run it:
;(async () => {
  try {
    const user = await getUserSafe(1)
    console.log("User:", user.name, "|", user.email)
  } catch (e) {
    console.log("Caught:", e.message)
  }
})()

// Test 404:
;(async () => {
  try {
    const user = await getUserSafe(9999) // doesn't exist
    console.log("This won't print:", user)
  } catch (e) {
    console.log("404 handled:", e.message)
  }
})()

// ════════════════════════════════════════════════════════════
// PART 4 — REQUEST CONFIGURATION
// POST, PUT, PATCH, DELETE
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 4: HTTP Methods ════\n")

const BASE_URL = "https://jsonplaceholder.typicode.com"

// ── POST — Create ────────────────────────────────────────
/**
 * POST sends data to CREATE a new resource.
 * Body must be serialized to JSON string.
 * Content-Type header tells the server what format the body is in.
 */
const createPost = async (postData) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // required — tells server to parse as JSON
      Accept: "application/json", // tells server we want JSON back
    },
    body: JSON.stringify(postData), // must be a string, not an object
  })

  if (!response.ok) throw new Error(`Create failed: ${response.status}`)

  const created = await response.json()
  return created // JSONPlaceholder returns the created object with an id
}

;(async () => {
  try {
    const newPost = await createPost({
      title: "Async JavaScript mastered",
      body: "Promises, async/await, and fetch explained",
      userId: 1,
    })
    console.log("Created post:", newPost)
    // JSONPlaceholder returns: { id: 101, title: ..., body: ..., userId: 1 }
  } catch (e) {
    console.log("Create error:", e.message)
  }
})()

// ── PUT — Full Replace ────────────────────────────────────
const updatePost = async (id, postData) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
  if (!response.ok) throw new Error(`Update failed: ${response.status}`)
  return await response.json()
}

// ── PATCH — Partial Update ────────────────────────────────
/**
 * PATCH only sends the fields you want to change.
 * PUT replaces the entire resource.
 * In practice, most APIs accept PATCH for updates.
 */
const patchPost = async (id, fields) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields), // only the fields to update
  })
  if (!response.ok) throw new Error(`Patch failed: ${response.status}`)
  return await response.json()
}

;(async () => {
  const updated = await patchPost(1, { title: "Updated title only" })
  console.log("Patched:", updated.title)
})()

// ── DELETE ────────────────────────────────────────────────
const deletePost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
  // 200 or 204 (No Content) = success
  if (!response.ok) throw new Error(`Delete failed: ${response.status}`)
  return true // nothing to parse for 204 No Content
}

;(async () => {
  const deleted = await deletePost(1)
  console.log("Deleted:", deleted) // true
})()

// ════════════════════════════════════════════════════════════
// PART 5 — RESPONSE HANDLING
// Parsing different content types
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 5: Response handling ════\n")

/**
 * The Response object has multiple body parsers:
 *
 *   response.json()     → parse body as JSON → object
 *   response.text()     → parse body as string
 *   response.blob()     → parse body as binary (images, files)
 *   response.arrayBuffer() → raw binary data
 *
 * IMPORTANT: you can only consume the body ONCE.
 * Calling response.json() after response.text() throws.
 * If you need to inspect the body AND parse it, clone first:
 *   const clone = response.clone()
 */

// Reading response metadata:
const inspectResponse = async () => {
  const response = await fetch(`${BASE_URL}/users/1`)

  console.log("Status:", response.status) // 200
  console.log("OK:", response.ok) // true
  console.log("Status text:", response.statusText) // "OK"
  console.log("URL:", response.url)

  // Read headers:
  console.log("Content-Type:", response.headers.get("content-type"))
  console.log("X-RateLimit:", response.headers.get("x-ratelimit-limit"))

  const data = await response.json()
  return data
}

;(async () => {
  await inspectResponse()
})()

// ── Handling non-JSON responses ───────────────────────────
const fetchText = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
  // Check Content-Type before assuming JSON:
  const contentType = response.headers.get("content-type")
  if (contentType?.includes("application/json")) {
    return await response.json()
  }
  return await response.text()
}

// ════════════════════════════════════════════════════════════
// PART 6 — HEADERS IN DEPTH
// Auth, CORS, Content negotiation
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 6: Headers ════\n")

/**
 * ── Authorization header ─────────────────────────────────
 * Most real APIs require authentication.
 * The most common pattern: Bearer token (JWT)
 *
 * After login, server gives you a token.
 * You send it on every subsequent request.
 */

const authenticatedFetch = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (response.status === 401) {
    throw new Error("Unauthorized — token expired or invalid")
  }
  if (response.status === 403) {
    throw new Error("Forbidden — you don't have permission")
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json()
}

// ── Headers class ─────────────────────────────────────────
// You can also use the Headers object for more control:
const buildHeaders = (token) => {
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  headers.set("Accept", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)
  return headers
}

/**
 * ── CORS (Cross-Origin Resource Sharing) ─────────────────
 *
 * Browser security rule: a web page at domain-a.com cannot
 * fetch from domain-b.com UNLESS domain-b.com explicitly allows it.
 *
 * The server controls CORS via response headers:
 *   Access-Control-Allow-Origin: https://your-app.com
 *   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
 *   Access-Control-Allow-Headers: Authorization, Content-Type
 *
 * When you see "CORS error" in the browser:
 *   → The server didn't include these headers
 *   → Solution: fix it on the SERVER (not the frontend)
 *   → Development workaround: a proxy (Vite dev server handles this)
 *
 * fetch() options for CORS mode:
 *   mode: "cors"        → default, enforce CORS rules
 *   mode: "no-cors"     → send request but can't read response
 *   mode: "same-origin" → only allow same domain
 *
 * credentials: "include"  → send cookies cross-origin (needs server allow)
 * credentials: "same-origin" → default, only send cookies same domain
 */

const corsAwareFetch = async (url, token) => {
  return fetch(url, {
    mode: "cors",
    credentials: "include", // send cookies (for session-based auth)
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}

// ════════════════════════════════════════════════════════════
// PART 7 — AbortController
// Cancelling requests
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 7: AbortController ════\n")

/**
 * AbortController lets you cancel a fetch request mid-flight.
 *
 * WHY THIS MATTERS IN REACT:
 * If a component unmounts while a fetch is in progress,
 * the response arrives and tries to call setState on an unmounted component.
 * This causes memory leaks and React warnings.
 * The fix: cancel the request in the useEffect cleanup function.
 *
 *   useEffect(() => {
 *     const controller = new AbortController()
 *
 *     const load = async () => {
 *       try {
 *         const res = await fetch(url, { signal: controller.signal })
 *         const data = await res.json()
 *         setData(data)
 *       } catch (error) {
 *         if (error.name === 'AbortError') return  // expected — component unmounted
 *         setError(error.message)
 *       }
 *     }
 *
 *     load()
 *
 *     return () => controller.abort()  // cleanup: cancel on unmount
 *   }, [url])
 */

const fetchWithAbort = async () => {
  const controller = new AbortController()
  const signal = controller.signal

  // Cancel after 100ms to demonstrate:
  const cancelTimeout = setTimeout(() => {
    controller.abort()
    console.log("Request aborted!")
  }, 100)

  try {
    const response = await fetch(`${BASE_URL}/posts`, { signal })
    clearTimeout(cancelTimeout)
    const posts = await response.json()
    console.log("Posts received:", posts.length)
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch was cancelled — AbortError caught correctly")
    } else {
      console.log("Different error:", error.message)
    }
  }
}

;(async () => {
  await fetchWithAbort()
})()

// Timeout pattern using AbortController:
const fetchWithTimeout = async (url, timeoutMs = 5000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`)
    }
    throw error
  }
}

// ════════════════════════════════════════════════════════════
// PART 8 — REST API PATTERNS: CRUD
// Complete example with all operations
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 8: Complete CRUD service ════\n")

/**
 * In production, you create a service layer:
 * - Centralizes API logic
 * - Consistent error handling
 * - Easy to swap the base URL (dev/staging/prod)
 * - Single place to add auth headers
 *
 * This is the pattern you'll use in every React project.
 */

class ApiService {
  #baseUrl
  #token

  constructor(baseUrl, token = null) {
    this.#baseUrl = baseUrl
    this.#token = token
  }

  // Build standard headers for every request
  #buildHeaders(extraHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...extraHeaders,
    }
    if (this.#token) {
      headers["Authorization"] = `Bearer ${this.#token}`
    }
    return headers
  }

  // Core request method — all others go through this
  async #request(endpoint, options = {}) {
    const url = `${this.#baseUrl}${endpoint}`
    const config = {
      ...options,
      headers: this.#buildHeaders(options.headers),
    }

    const response = await fetch(url, config)

    // Handle common error codes:
    if (response.status === 401) throw new Error("Session expired — please login again")
    if (response.status === 403) throw new Error("You don't have permission to do this")
    if (response.status === 404) throw new Error("Resource not found")
    if (response.status === 429) throw new Error("Too many requests — please slow down")
    if (!response.ok) throw new Error(`Server error: ${response.status}`)

    // 204 No Content — DELETE responses have no body
    if (response.status === 204) return null

    return await response.json()
  }

  // ── CRUD methods ──────────────────────────────────────
  async get(endpoint, signal) {
    return this.#request(endpoint, { method: "GET", signal })
  }

  async post(endpoint, data) {
    return this.#request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put(endpoint, data) {
    return this.#request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async patch(endpoint, data) {
    return this.#request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint) {
    return this.#request(endpoint, { method: "DELETE" })
  }
}

// Usage — clean and readable:
const api = new ApiService("https://jsonplaceholder.typicode.com")

;(async () => {
  try {
    // GET
    const user = await api.get("/users/1")
    console.log("GET user:", user.name)

    // GET list
    const posts = await api.get("/users/1/posts")
    console.log("GET posts count:", posts.length)

    // POST
    const created = await api.post("/posts", {
      title: "My first React project",
      body: "Built with the skills from this learning path",
      userId: 1,
    })
    console.log("POST created id:", created.id)

    // PATCH
    const patched = await api.patch("/posts/1", { title: "Updated!" })
    console.log("PATCH title:", patched.title)

    // DELETE
    await api.delete("/posts/1")
    console.log("DELETE: success")
  } catch (error) {
    console.log("API error:", error.message)
  }
})()

// ════════════════════════════════════════════════════════════
// PART 9 — PARALLEL REQUESTS PATTERN
// Loading dashboard data efficiently
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 9: Parallel requests ════\n")

/**
 * Loading a dashboard needs multiple resources.
 * Sequential: slow. Parallel: fast.
 * Use Promise.all for independent requests.
 */

const loadDashboard = async (userId) => {
  const start = Date.now()

  const [user, posts, todos] = await Promise.all([
    api.get(`/users/${userId}`),
    api.get(`/users/${userId}/posts`),
    api.get(`/users/${userId}/todos`),
  ])

  console.log(`Dashboard loaded in ${Date.now() - start}ms`)
  console.log(`  User: ${user.name}`)
  console.log(`  Posts: ${posts.length}`)
  console.log(`  Todos: ${todos.length}`)

  return { user, posts, todos }
}

;(async () => {
  await loadDashboard(1)
})()

// ════════════════════════════════════════════════════════════
// PART 10 — ERROR HANDLING PATTERNS
// ════════════════════════════════════════════════════════════

console.log("\n════ PART 10: Error handling patterns ════\n")

/**
 * Production error handling has layers:
 *
 * 1. Network errors → fetch rejects (no internet, DNS failure)
 * 2. HTTP errors   → 4xx/5xx (must check manually)
 * 3. Parse errors  → response.json() throws on invalid JSON
 * 4. Business errors → 200 OK but { error: "insufficient funds" }
 *
 * A complete error handler covers all four.
 */

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data // server's error response body
  }
}

const robustFetch = async (url, options = {}) => {
  // Network errors:
  let response
  try {
    response = await fetch(url, options)
  } catch (networkError) {
    throw new ApiError("Network unavailable — check your internet connection", 0)
  }

  // HTTP errors:
  if (!response.ok) {
    let errorData = null
    try {
      errorData = await response.json() // server might send { message: "..." }
    } catch (_) {} // ignore parse error on error response

    throw new ApiError(errorData?.message || `HTTP ${response.status}: ${response.statusText}`, response.status, errorData)
  }

  // Parse errors:
  try {
    return await response.json()
  } catch (parseError) {
    throw new ApiError("Server returned invalid JSON", response.status)
  }
}

// Caller handles by error type:
;(async () => {
  try {
    const data = await robustFetch(`${BASE_URL}/users/9999`)
    console.log("data:", data)
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 0:
          console.log("Offline:", error.message)
          break
        case 401:
          console.log("Login required")
          break
        case 403:
          console.log("No permission")
          break
        case 404:
          console.log("Not found:", error.message)
          break
        case 500:
          console.log("Server problem — try later")
          break
        default:
          console.log(`API error (${error.status}):`, error.message)
      }
    } else {
      console.log("Unexpected error:", error.message)
    }
  }
})()

// ════════════════════════════════════════════════════════════
// PART 11 — REACT CONNECTION
// How all this maps to real component code
// ════════════════════════════════════════════════════════════

/**
 *
 * // ── The standard data-fetching component pattern ──────────
 *
 * import { useState, useEffect } from 'react'
 * import { api } from './services/api'  // your ApiService instance
 *
 * const UserPosts = ({ userId }) => {
 *   const [posts, setPosts]     = useState([])
 *   const [loading, setLoading] = useState(true)
 *   const [error, setError]     = useState(null)
 *
 *   useEffect(() => {
 *     const controller = new AbortController()
 *
 *     const loadPosts = async () => {
 *       try {
 *         setLoading(true)
 *         setError(null)
 *         const data = await api.get(`/users/${userId}/posts`, controller.signal)
 *         setPosts(data)
 *       } catch (err) {
 *         if (err.name === 'AbortError') return  // unmounted — ignore
 *         setError(err.message)
 *       } finally {
 *         setLoading(false)
 *       }
 *     }
 *
 *     loadPosts()
 *     return () => controller.abort()  // cleanup on unmount or userId change
 *
 *   }, [userId])  // re-run when userId changes
 *
 *   if (loading) return <LoadingSpinner />
 *   if (error)   return <ErrorMessage message={error} />
 *   if (!posts.length) return <EmptyState message="No posts yet" />
 *
 *   return (
 *     <ul>
 *       {posts.map(post => (
 *         <li key={post.id}>{post.title}</li>
 *       ))}
 *     </ul>
 *   )
 * }
 *
 * // ── Create with form submit ───────────────────────────────
 *
 * const CreatePost = ({ userId, onSuccess }) => {
 *   const [submitting, setSubmitting] = useState(false)
 *   const [error, setError] = useState(null)
 *
 *   const handleSubmit = async (formData) => {
 *     try {
 *       setSubmitting(true)
 *       setError(null)
 *       const created = await api.post('/posts', { ...formData, userId })
 *       onSuccess(created)          // notify parent
 *     } catch (err) {
 *       setError(err.message)       // show inline error
 *     } finally {
 *       setSubmitting(false)        // re-enable submit button
 *     }
 *   }
 * }
 */

// ════════════════════════════════════════════════════════════
// CHEATSHEET
// ════════════════════════════════════════════════════════════

console.log(`
╔════════════════════════════════════════════════════════════╗
║              APIs IN JAVASCRIPT — CHEATSHEET               ║
╠══════════════════════╦═════════════════════════════════════╣
║ GET                  ║ fetch(url)                          ║
║ POST                 ║ fetch(url, {method:"POST",body:..}) ║
║ PATCH                ║ fetch(url, {method:"PATCH",...})    ║
║ DELETE               ║ fetch(url, {method:"DELETE"})       ║
╠══════════════════════╬═════════════════════════════════════╣
║ response.ok          ║ true if status 200-299              ║
║ response.status      ║ numeric code (200, 404, 500...)     ║
║ await response.json()║ parse body as JSON (async!)         ║
║ await response.text()║ parse body as string                ║
╠══════════════════════╬═════════════════════════════════════╣
║ Content-Type         ║ header: "application/json"          ║
║ Authorization        ║ header: "Bearer <token>"            ║
╠══════════════════════╬═════════════════════════════════════╣
║ AbortController      ║ cancel requests on unmount          ║
║ Promise.all          ║ parallel independent requests       ║
╠══════════════════════╬═════════════════════════════════════╣
║ 200 OK               ║ success                             ║
║ 201 Created          ║ POST success                        ║
║ 204 No Content       ║ DELETE success, no body             ║
║ 401 Unauthorized     ║ need to login                       ║
║ 403 Forbidden        ║ logged in but no permission         ║
║ 404 Not Found        ║ resource missing                    ║
║ 500 Server Error     ║ bug on server side                  ║
╠══════════════════════╬═════════════════════════════════════╣
║ GOLDEN RULES:                                               ║
║  1. fetch() NEVER throws on 4xx/5xx — check response.ok    ║
║  2. response.json() is async — always await it             ║
║  3. Cancel requests in useEffect cleanup (AbortController) ║
║  4. Always handle errors — show the user something useful  ║
║  5. Parallel requests with Promise.all when independent    ║
╚════════════════════════════════════════════════════════════╝
`)
