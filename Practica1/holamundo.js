/* Js del lado del servidor*/

console.log("Hola Mundo JS con Node")

/* calculo */
let edad1 = 12
let edad2 = 34

console.log("Edad promedio:")
console.log((edad1+edad2)/2)

/* medir el tiempo del proceso */
console.time("Mi Proceso")

for(let i=0; i< 1000000; i++){

}

console.timeEnd("Mi Proceso")

/* Objetos tipo tabla */
let usuarios = [
    {nombre:"ivan", edad: 38},
    {nombre:"saul", edad: 21},
    {nombre:"pao", edad: 22}
]

console.table(usuarios)