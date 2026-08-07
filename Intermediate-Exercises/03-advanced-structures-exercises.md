# Clase 23 - Estructuras avanzadas

## Ejercicio 1. `map`, `filter` y `reduce`

### Objetivo

[x] Crea una función que reciba un arreglo de productos. Obtén únicamente los productos disponibles, transforma el resultado para obtener solo los precios y calcula el costo total de esos productos utilizando `filter`, `map` y `reduce`.

### Entrada

Un arreglo de objetos con la siguiente estructura:

```javascript
;[
  { nombre: "Mouse", precio: 20, disponible: true },
  { nombre: "Teclado", precio: 45, disponible: false },
  { nombre: "Monitor", precio: 300, disponible: true },
  { nombre: "Webcam", precio: 80, disponible: true },
]
```

### Restricciones

- Debes utilizar los tres métodos (`filter`, `map` y `reduce`).
- No modifiques el arreglo original.

### Resultado esperado

La función debe devolver un número correspondiente al costo total de los productos disponibles.

## Ejercicio 2. Cubos y números pares

### Objetivo

[x] Crea una función que reciba un arreglo de números. Genera un nuevo arreglo donde cada número sea elevado al cubo y conserva únicamente aquellos resultados que sean números pares.

### Entrada

```javascript
;[2, 3, 4, 5, 6, 7]
```

### Restricciones

- Utiliza los métodos adecuados para transformar y filtrar los datos.
- El arreglo original no debe modificarse.

### Resultado esperado

La función debe devolver un nuevo arreglo de números.

## Ejercicio 3. `flat` y `flatMap`

### Objetivo

[x] Trabaja con un arreglo de cursos donde cada curso contiene una lista de estudiantes. Obtén un único arreglo con los nombres de todos los estudiantes utilizando `flatMap`. Después, utiliza `flat` para convertir un arreglo anidado de niveles académicos en un único arreglo.

### Entrada

```javascript
;[
  {
    curso: "JavaScript",
    estudiantes: ["Ana", "Luis"],
  },
  {
    curso: "Python",
    estudiantes: ["Carlos", "María"],
  },
]
```

y

```javascript
;[["Básico", "Intermedio"], ["Avanzado"], ["Experto"]]
```

### Restricciones

- Utiliza `flatMap` para el primer caso.
- Utiliza `flat` para el segundo.
- No modifiques las estructuras originales.

### Resultado esperado

La función debe devolver dos nuevos arreglos completamente planos.

---

## Ejercicio 4. Ordenar números

### Objetivo

[x] Crea una función que reciba un arreglo de números y los ordene de mayor a menor.

### Entrada

```javascript
;[18, 7, 25, 3, 40, 12]
```

### Restricciones

- No escribas los números manualmente en otro arreglo.
- Evita modificar el arreglo original.

### Resultado esperado

La función debe devolver un nuevo arreglo ordenado de forma descendente.

---

## Ejercicio 5. Operaciones con `Set`

### Objetivo

[x] Crea una función que reciba dos objetos `Set` de números y obtenga la unión, la intersección y la diferencia entre ambos conjuntos.

### Entrada

```javascript
const setA = new Set([1, 2, 3, 4, 5])
const setB = new Set([4, 5, 6, 7, 8])
```

### Restricciones

- No conviertas los `Set` en arreglos para realizar toda la lógica.
- Conserva los conjuntos originales.

### Resultado esperado

La función debe devolver un objeto con tres propiedades:

- unión
- intersección
- diferencia

Cada propiedad debe contener un nuevo `Set`.

---

## Ejercicio 6. Recorrer los `Set`

### Objetivo

[x] Crea una función que reciba el objeto generado en el ejercicio anterior y recorra cada uno de los conjuntos mostrando todos sus elementos.

### Entrada

El objeto devuelto por el ejercicio anterior.

### Restricciones

- Debes recorrer los tres conjuntos.
- No recalcules la unión, intersección o diferencia.

### Resultado esperado

La función no necesita devolver información. Su objetivo es recorrer correctamente los datos y mostrarlos.

---

## Ejercicio 7. Crear un `Map`

### Objetivo

[x] Crea una función que construya un `Map` donde la clave sea el identificador del usuario y el valor sea un objeto con su información personal.

### Entrada

```javascript
;[
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
    email: "laura@email.com",
  },
  {
    id: 3,
    nombre: "Ana",
    edad: 28,
    email: "ana@email.com",
  },
]
```

### Restricciones

- Utiliza un `Map`.
- La clave debe ser el `id`.

### Resultado esperado

La función debe devolver un `Map` con todos los usuarios almacenados.

---

## Ejercicio 8. Obtener nombres desde un `Map`

### Objetivo

[x] Crea una función que reciba el `Map` del ejercicio anterior y obtenga un arreglo únicamente con los nombres de todos los usuarios.

### Entrada

El `Map` creado anteriormente.

### Restricciones

- No conviertas el `Map` directamente en un objeto.
- Recorre correctamente su contenido.

### Resultado esperado

La función debe devolver un arreglo de cadenas de texto.

---

## Ejercicio 9. Filtrar usuarios mayores de edad

### Objetivo

[x] Crea una función que reciba el `Map` del ejercicio anterior, obtenga únicamente los usuarios mayores o iguales a 18 años, extraiga sus correos electrónicos y elimine posibles duplicados convirtiendo el resultado en un `Set`.

### Entrada

El mismo `Map` del ejercicio anterior.

### Restricciones

- No modifiques el `Map`.
- Elimina automáticamente los correos repetidos utilizando un `Set`.

### Resultado esperado

La función debe devolver un `Set` cuyos elementos sean únicamente direcciones de correo electrónico.

---

## Ejercicio 10. Transformación entre estructuras

### Objetivo

[x] Crea una función que reciba el `Map` de usuarios. Primero conviértelo en un objeto. Después, utilizando ese objeto, crea un nuevo `Map` donde la clave sea el correo electrónico del usuario y el valor sea el objeto completo con toda su información.

### Entrada

El `Map` creado en el ejercicio 7.

### Restricciones

- Debes realizar ambas transformaciones:

  1. `Map` → Objeto.
  2. Objeto → `Map`.

- No pierdas información durante las conversiones.
- No modifiques el `Map` original.

### Resultado esperado

La función debe devolver un nuevo `Map` cuya clave sea el email de cada usuario y cuyo valor sea el objeto completo del usuario.

---

## Observación

He mantenido la esencia de los ejercicios originales, pero eliminando la ambigüedad. Ahora cada uno define claramente:

- **Qué problema resolver** (Objetivo).
- **Qué datos recibe** (Entrada).
- **Con qué información practicar** (Datos de ejemplo).
- **Qué reglas debe respetar** (Restricciones).
- **Qué tipo de resultado debe producir** (Resultado esperado).

Este es un formato muy cercano al que encontrarás en historias de usuario, pruebas técnicas y requerimientos de desarrollo, donde el reto consiste en implementar la lógica, no en adivinar el contexto.
