const { productos, pedidos, readline } = require('./datos')

let subtotal = 0
let total = 0
let idPedido = 1

function agregarPedido(nombre, cantidad) {
    /* Asignar todos los productos a un mismo pedido hasta seleccionar finalizar pedido */
    
    pedidos.push({ idPedido: idPedido, nombre, cantidad , status: "En carrito"})
}

function calcularSubtotal() {
    /* Calcular el subtotal sumando el total de cada producto que pertenezca al mismo idPedido, luego calcular el total sumando el IVA */
    subtotal = 0
    filtrarPedidos = pedidos.filter(p => p.idPedido === idPedido)
    for (let pedido of filtrarPedidos) {
        
        let producto = productos.find(p => p.nombre === pedido.nombre && idPedido === pedido.idPedido)
        if (producto) {
            pedido.total = producto.precio * pedido.cantidad
            subtotal += pedido.total
        } else {
            console.log("Producto no encontrado: " + pedido.nombre)
        }

        
    }
    total = subtotal * 1.16

    /*subtotal = 0
    for (let pedido of pedidos) {
        let producto = productos.find(p => p.nombre === pedido.nombre)
        if (producto) {
            pedido.total = producto.precio * pedido.cantidad
            subtotal += pedido.total
        } else {
            console.log("Producto no encontrado: " + pedido.nombre)
        }
    }
    total = subtotal * 1.16*/
}

function mostrarMenuCliente(volver) {
    console.log("--- Menú Cliente ---")
    console.log("1. Agregar a mi pedido")
    console.log("2. Listar mi pedido")
    console.log("3. Promociones")
    console.log("4. Terminar y guardar pedido")
    console.log("5. Volver al menú principal")
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
            let misPedidos = pedidos.filter(p => p.idPedido === idPedido)
            console.table(misPedidos)
            calcularSubtotal()
            console.log("Subtotal: $" + subtotal)
            console.log("Total a pagar: $" + total)
            mostrarMenuCliente(volver)
        } else if (opcion === "3") {
            let filtrados = productos.filter(p => p.promocion === "En promoción")
            console.table(filtrados)
            mostrarMenuCliente(volver)
        } else if (opcion === "4") {
            calcularSubtotal()
            console.log("Pedido finalizado.")
            console.log("Subtotal: $" + subtotal)
            console.log("Total a pagar: $" + total)
            let misPedidos = pedidos.filter(p => p.idPedido === idPedido)
            for (let pedido of misPedidos) {
                pedido.status = "Pedido recibido"
            }
            idPedido++
            mostrarMenuCliente(volver)
        } else if (opcion === "5") {
            volver()
        } else {
            console.log("Opción no válida. Intente de nuevo.")
            mostrarMenuCliente(volver)
        }
    })
}

module.exports = mostrarMenuCliente