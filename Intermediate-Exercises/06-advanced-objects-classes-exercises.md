# Clase 38 - Objetos y clases avanzados

## Ejercicio 1. Agregar una función al prototipo de un objeto

### Objetivo

[x] Crea una función constructora llamada `Libro` que permita crear objetos con las propiedades `titulo`, `autor` y `paginas`. Después, agrega una función al prototipo que permita obtener una descripción completa del libro.

### Entrada

La función constructora debe permitir crear objetos con una estructura similar a:

```javascript
{
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    paginas: 464
}
```

### Restricciones

- La función no debe definirse dentro del constructor.
- Debe agregarse utilizando el prototipo.
- Todos los objetos creados deben compartir el mismo método.

### Resultado esperado

Cada objeto creado debe poder invocar el método agregado al prototipo para obtener una descripción del libro.

---

# Ejercicio 2. Herencia entre objetos

### Objetivo

[x] Crea un objeto llamado `vehiculo` con propiedades y comportamientos comunes. Después, crea otro objeto llamado `automovil` que herede de `vehiculo` y agregue propiedades específicas.

### Entrada

Objeto base:

```javascript
{
    marca: "",
    modelo: "",
    arrancar() {}
}
```

Objeto derivado:

```javascript
{
  puertas: 4
}
```

### Restricciones

- Debes utilizar herencia entre objetos.
- No copies manualmente todas las propiedades del objeto base.

### Resultado esperado

El objeto derivado debe acceder tanto a sus propias propiedades como a las heredadas.

---

# Ejercicio 3. Método de instancia

### Objetivo

[x] Crea una clase llamada `CuentaBancaria` con un método de instancia que permita consultar el saldo disponible.

### Entrada

Cada instancia debe almacenar:

```javascript
{
    titular: "",
    saldo: 0
}
```

### Restricciones

- El método debe pertenecer a la clase.
- Cada instancia utilizará sus propios datos.

### Resultado esperado

Cada objeto creado debe poder consultar su propio saldo mediante el método de instancia.

---

# Ejercicio 4. Uso de getters y setters

### Objetivo

[x] Crea una clase `Empleado` que almacene el nombre y el salario. Utiliza un `getter` para consultar el salario y un `setter` para actualizarlo únicamente si el nuevo valor es válido.

### Entrada

```javascript
{
    nombre: "Ana",
    salario: 25000
}
```

### Restricciones

- El acceso al salario debe realizarse mediante `get`.
- La modificación debe realizarse mediante `set`.
- Evita asignar valores inválidos.

### Resultado esperado

El salario debe poder consultarse y modificarse únicamente mediante los accesores.

---

# Ejercicio 5. Utilizar `Object.assign()`

### Objetivo

[x] Crea una función que reciba un objeto con información básica de un producto y otro objeto con información adicional. Combina ambos utilizando `Object.assign()`.

### Entrada

```javascript
const producto = {
  nombre: "Laptop",
  precio: 15000,
}

const detalles = {
  categoria: "Tecnología",
  disponible: true,
}
```

### Restricciones

- Utiliza `Object.assign()`.
- Conserva intactos los objetos originales.

### Resultado esperado

La función debe devolver un nuevo objeto que contenga todas las propiedades.

---

# Ejercicio 6. Clase abstracta

### Objetivo

[x] Diseña una clase abstracta llamada `Empleado` que represente cualquier tipo de empleado de una empresa. Después crea una clase concreta que herede de ella e implemente el comportamiento requerido.

### Entrada

La clase abstracta debe contemplar información como:

```javascript
nombre
salario
```

Y declarar un comportamiento relacionado con el cálculo del pago.

### Restricciones

- La clase abstracta no debe poder instanciarse directamente.
- La clase derivada debe implementar el comportamiento definido por la clase base.

### Resultado esperado

Solo las clases concretas deben poder crear objetos funcionales.

---

# Ejercicio 7. Polimorfismo

### Objetivo

[x] Crea una clase base llamada `Figura` y dos clases derivadas (`Rectangulo` y `Circulo`). Ambas deben implementar un mismo método relacionado con el cálculo de su área.

### Entrada

Ejemplos:

```javascript
Rectangulo
```

```javascript
Circulo
```

### Restricciones

- Ambas clases deben compartir el mismo nombre de método.
- Cada clase debe implementar su propia lógica.

### Resultado esperado

Un mismo método debe producir resultados diferentes dependiendo del tipo de figura.

---

# Ejercicio 8. Implementar un Mixin

### Objetivo

[x] Crea dos clases diferentes (`Usuario` y `Administrador`) que compartan la capacidad de registrar acciones realizadas en el sistema. Implementa esa funcionalidad mediante un Mixin.

### Entrada

Clases:

```javascript
Usuario
Administrador
```

### Restricciones

- No dupliques código en ambas clases.
- El comportamiento compartido debe incorporarse mediante un Mixin.

### Resultado esperado

Ambas clases deben disponer del mismo comportamiento adicional sin modificar su jerarquía de herencia.

---

# Ejercicio 9. Singleton

### Objetivo

[x] Diseña una clase llamada `ConfiguracionAplicacion` encargada de almacenar la configuración general de un sistema. Asegúrate de que solo pueda existir una única instancia durante toda la ejecución.

### Entrada

La configuración puede contener información como:

```javascript
{
    idioma: "es",
    tema: "oscuro"
}
```

### Restricciones

- Solo puede existir una instancia.
- Si se intenta crear otra, debe reutilizarse la ya existente.

### Resultado esperado

Todas las referencias deben apuntar al mismo objeto.

---

# Ejercicio 10. Proxy

### Objetivo

[x] Crea un objeto que represente un usuario con propiedades como `nombre`, `edad` y `email`. Utiliza un `Proxy` para controlar la modificación de dichas propiedades.

### Entrada

```javascript
{
    nombre: "Carlos",
    edad: 25,
    email: "carlos@email.com"
}
```

### Restricciones

- Intercepta las modificaciones realizadas sobre el objeto.
- Valida que únicamente puedan modificarse propiedades existentes.
- Impide asignar valores que no cumplan las reglas definidas para cada propiedad.

### Resultado esperado

El objeto debe seguir funcionando normalmente, pero todas las modificaciones deberán pasar por el `Proxy`, que decidirá si son aceptadas o rechazadas.

---

## Observación

Creo que este formato es mucho más útil para aprender porque cada ejercicio **simula un pequeño requerimiento funcional**. En lugar de decir _"usa `Object.assign()`_ o _"crea un Proxy"_, primero plantea una necesidad del dominio (productos, empleados, cuentas bancarias, configuración, etc.) y luego la tecnología aparece como la herramienta adecuada para resolverla.

Esa es también la forma en que suelen plantearse las tareas en un entorno profesional: el objetivo no es demostrar que conoces una característica del lenguaje, sino aplicarla para resolver un problema concreto. De este modo, el ejercicio sigue evaluando los mismos conceptos avanzados de objetos y clases, pero elimina la ambigüedad sobre el contexto y el tipo de datos con los que debes trabajar.
