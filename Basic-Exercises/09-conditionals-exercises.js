/*
Clase 24 - Ejercicios: Condicionales
Vídeo: https://youtu.be/1glVfFxj8a4?t=8652
*/

// if/else/else if/ternaria

// 1. Imprime por consola tu nombre si una variable toma su valor
const userName = "Yoandy"
if (userName === "Yoandy") {
  console.log("Yoandy")
}

// 2. Imprime por consola un mensaje si el usuario y contraseña concide con unos establecidos
let user = "codebydoble"
let pass = "Mouredev1@"
if (user === "codebydoble" && pass === "Mouredev1@") {
  console.log(`Welcome ${user}!`)
}

// 3. Verifica si un número es positivo, negativo o cero e imprime un mensaje
let numberTest = 10
if (numberTest === 0) {
  console.log("Cero")
} else {
  numberTest > 0 ? console.log("Positivo") : console.log("Negativo")
}

// 4. Verifica si una persona puede votar o no (mayor o igual a 18) e indica cuántos años le faltan
let age = 14
age >= 18
  ? console.log("Ud puede votar.")
  : console.log(`No puedes votar, tienes ${age} años. Te faltan ${18 - age} años para poder votar.`)

// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad
let ageStatus
age >= 18 ? (ageStatus = "Adulto") : (ageStatus = "Menor")

// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"
let mes = "April"
if (mes === "March" || mes === "April" || mes === "May") {
  console.log(`Month: ${mes}, Season: Spring.`)
} else if (mes === "June" || mes === "July" || mes === "August") {
  console.log(`Month: ${mes}, Season: Summer.`)
} else if (mes === "September" || mes === "October" || mes === "November") {
  console.log(`Month: ${mes}, Season:  Autumn.`)
} else {
  /*
  mes === "December" ||
  mes === "January" ||
  mes === "February"
  */
  console.log(`Month: ${mes}, Season:  Winter.`)
}

// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior

if (mes === "February") {
  console.log("Month " + mes + "has 28 days")
} else if (
  mes === "January" ||
  mes === "March" ||
  mes === "May" ||
  mes === "July" ||
  mes === "August" ||
  mes === "October" ||
  mes === "December"
) {
  console.log("Month " + mes + "has 31 days")
} else {
  /*
  mes === "April" ||
  mes === "June" ||
  mes === "September" ||
  mes === "November"
  */
  console.log("Month " + mes + " has 30 days")
}

// switch

// 8. Usa un switch para imprimir un mensaje de saludo diferente dependiendo del idioma

let languageSystem = "Spanish"
//Respuesta esperada: incorrect language

switch (languageSystem) {
  case "Spanish":
    console.log("Un saludo en idioma ".concat("Español."))
    break
  case "English":
    console.log("Hello in ".concat(languageSystem, " language."))
    break
  case "French":
    console.log("Salutations en français.")
    break
  case "German":
    console.log("Grüße auf Deutsch.")
    break
  case "Italian":
    console.log("Saluti in italiano.")
    break
  default:
    console.log("Incorrect language.")
}
// 9. Usa un switch para hacer de nuevo el ejercicio 6
// switch
switch (mes) {
  case "Enero":
    console.log("Mes", mes, "Estación del año: Invierno")
    break
  case "Febrero":
    console.log("Mes", mes, "Estación del año: Invierno")
    break
  case "Marzo":
    console.log("Mes", mes, "Estación del año: Primavera")
    break
  case "Abril":
    console.log("Mes", mes, "Estación del año: Primavera")
    break
  case "Mayo":
    console.log("Mes", mes, "Estación del año: Primavera")
    break
  case "Junio":
    console.log("Mes", mes, "Estación del año: Verano")
    break
  case "Julio":
    console.log("Mes", mes, "Estación del año: Verano")
    break
  case "Agosto":
    console.log("Mes", mes, "Estación del año: Verano")
    break
  case "Septiembre":
    console.log("Mes", mes, "Estación del año: Otoño")
    break
  case "Octubre":
    console.log("Mes", mes, "Estación del año: Otoño")
    break
  case "Noviembre":
    console.log("Mes", mes, "Estación del año: Otoño")
    break
  case "Diciembre":
    console.log("Mes", mes, "Estación del año: Invierno")
    break
  default:
    console.log(mes, "No es un mes.")
    break
}

// 10. Usa un switch para hacer de nuevo el ejercicio 7
// switch
switch (mes) {
  case "Enero":
    console.log("Mes", mes, "Días: 31")
    break
  case "Febrero":
    console.log("Mes", mes, "Días: 28")
    break
  case "Marzo":
    console.log("Mes", mes, "Días: 31")
    break
  case "Abril":
    console.log("Mes", mes, "Días: 30")
    break
  case "Mayo":
    console.log("Mes", mes, "Días: 31")
    break
  case "Junio":
    console.log("Mes", mes, "Días: 30")
    break
  case "Julio":
    console.log("Mes", mes, "Días: 31")
    break
  case "Agosto":
    console.log("Mes", mes, "Días: 31")
    break
  case "Septiembre":
    console.log("Mes", mes, "Días: 30")
    break
  case "Octubre":
    console.log("Mes", mes, "Días: 31")
    break
  case "Noviembre":
    console.log("Mes", mes, "Días: 30")
    break
  default:
    console.log("Mes", mes, "Días: 31")
    break
}
