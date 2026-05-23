const { productos, pedidos, readline } = require('./datos')

let subtotal = 0
let total = 0

function agregarPedido(nombre, cantidad) {
    pedidos.push({ nombre, cantidad })
}

function calcularSubtotal() {
    subtotal = 0
    for (let pedido of pedidos) {
        let producto = productos.find(p => p.nombre === pedido.nombre)
        if (producto) {
            pedido.total = producto.precio * pedido.cantidad
            subtotal += pedido.total
        } else {
            console.log("Producto no encontrado: " + pedido.nombre)
        }
    }
    total = subtotal * 1.16
}

function mostrarMenuCliente(volver) {
    console.log("--- Menú Cliente ---")
    console.log("1. Agregar pedido")
    console.log("2. Listar mi pedido")
    console.log("3. Promociones")
    console.log("4. Volver al menú principal")
    readline.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            console.table(productos)
            readline.question("Ingrese el nombre del producto (o escriba 0 para filtrar): ", nombre => {
                if (nombre === "0") {
                    readline.question("Ingrese el tipo de producto a filtrar: ", tipo => {
                        let filtrados = productos.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase())
                        if (filtrados.length > 0) {
                            console.table(filtrados)
                            readline.question("Ingrese el nombre del producto: ", nombre => {
                                readline.question("Ingrese la cantidad: ", cantidad => {
                                    agregarPedido(nombre, parseInt(cantidad))
                                    calcularSubtotal()
                                    console.log("Pedido agregado.")
                                    console.log("Subtotal: $" + subtotal)
                                    console.log("Total: $" + total)
                                    mostrarMenuCliente(volver)
                                })
                            })
                        } else {
                            console.log("No se encontraron productos del tipo: " + tipo)
                            mostrarMenuCliente(volver)
                        }
                    })
                } else {
                    readline.question("Ingrese la cantidad: ", cantidad => {
                        agregarPedido(nombre, parseInt(cantidad))
                        calcularSubtotal()
                        console.log("Pedido agregado.")
                        console.log("Subtotal: $" + subtotal)
                        console.log("Total: $" + total)
                        mostrarMenuCliente(volver)
                    })
                }
            })
        } else if (opcion === "2") {
            console.table(pedidos)
            calcularSubtotal()
            console.log("Subtotal: $" + subtotal)
            console.log("Total a pagar: $" + total)
            mostrarMenuCliente(volver)
        } else if (opcion === "3") {
            let filtrados = productos.filter(p => p.promocion === "En promoción")
            console.table(filtrados)
            mostrarMenuCliente(volver)
        } else if (opcion === "4") {
            volver()
        } else {
            console.log("Opción no válida. Intente de nuevo.")
            mostrarMenuCliente(volver)
        }
    })
}

module.exports = mostrarMenuCliente