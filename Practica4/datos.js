let productos = [
    { nombre: "Latte Caliente", precio: 20, tipo: "Bebidas", promocion: "En promoción" },
    { nombre: "Latte", precio: 18, tipo: "Bebidas", promocion: "" },
    { nombre: "Jugo de Naranja", precio: 22, tipo: "Bebidas", promocion: "" },
    { nombre: "Pay", precio: 19, tipo: "Postres", promocion: "" }
]

let pedidos = [
    { idPedido: 1, nombre: "Latte Caliente", cantidad: 1, total: 20 , status: "En carrito"}
]

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = { productos, pedidos, readline }