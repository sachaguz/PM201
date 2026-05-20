const { productos, pedidos } = require('./datos')

let total = 0

function agregarPedido(nombre, cantidad) {
    pedidos.push({ nombre, cantidad })
}

function calcularSubtotal() {
    total = 0
    for (let pedido of pedidos) {
        let producto = productos.find(p => p.nombre === pedido.nombre)
        if (producto) {
            pedido.total = producto.precio * pedido.cantidad
            total += pedido.total
        } else {
            console.log("Producto no encontrado: " + pedido.nombre)
        }
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function mostrarMenu() {
    console.log("1. Agregar pedido")
    console.log("2. Listar mi pedido")
    console.log("3. Salir")
    readline.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            console.table(productos)
            readline.question("Ingrese el nombre del producto: ", nombre => {
                readline.question("Ingrese la cantidad: ", cantidad => {
                    agregarPedido(nombre, parseInt(cantidad))
                    calcularSubtotal()
                    console.log("Pedido agregado. Total actual: $" + total)
                    mostrarMenu()
                })
            })
        } else if (opcion === "2") {
            console.table(pedidos)
            console.log("Total a pagar: $" + total)
            mostrarMenu()
        } else if (opcion === "3") {
            console.log("Gracias por su compra.")
            readline.close()
        } else {
            console.log("Opción no válida. Intente de nuevo.")
            mostrarMenu()
        }
    })
}

mostrarMenu()