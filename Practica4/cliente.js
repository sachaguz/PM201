const { productos, pedidos, readline } = require('./datos')
const { prepararEnCocina } = require('./cocina')

let subtotal = 0
let total = 0
let idPedido = 1

function agregarPedido(nombre, cantidad) {
    pedidos.push({ idPedido: idPedido, nombre, cantidad , status: "En carrito"})
}

function calcularSubtotal() {
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
}

// ============================================================
// NUEVO: setTimeout + ASINCRONÍA
// Pequeño helper para esperar usando setTimeout dentro de una Promise.
// Sirve para mostrar los estados con delay entre cada uno.
// ============================================================
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Procesa el pedido mostrando estados intermedios.
// Llama al callback correspondiente de caja al terminar.
async function procesarPedido(idActual, onListo, onCancelado) {
    let misPedidos = pedidos.filter(p => p.idPedido === idActual)

    // Estado 1: Pedido recibido
    misPedidos.forEach(p => p.status = "Pedido recibido")
    console.log("Estado: Pedido recibido")
    await esperar(1500)

    // Estado 2: Preparando (cocina entra con su Promesa)
    misPedidos.forEach(p => p.status = "Preparando...")
    console.log("Estado: Preparando...")

    try {
        const respuesta = await prepararEnCocina(idActual)
        console.log("Cocina: " + respuesta)

        // Estado 3: Empacando
        misPedidos.forEach(p => p.status = "Empacando...")
        console.log("Estado: Empacando...")
        await esperar(1500)

        // Estado 4a: Entregado → callback de caja
        misPedidos.forEach(p => p.status = "Pedido Entregado")
        console.log("Estado: Pedido Entregado")
        onListo(idActual)

    } catch (error) {
        // Estado 4b: Cancelado → callback de caja
        misPedidos.forEach(p => p.status = "Cancelado")
        console.log("Estado: Cancelado (" + error + ")")
        onCancelado(idActual, error)
    }
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

            // NUEVO: procesamos el pedido con estados asíncronos
            // y callbacks hacia caja.
            const { onPedidoListo, onPedidoCancelado } = require('./caja')
            const idActual = idPedido
            idPedido++
            procesarPedido(idActual, onPedidoListo, onPedidoCancelado).then(() => {
                mostrarMenuCliente(volver)
            })

        } else if (opcion === "5") {
            volver()
        } else {
            console.log("Opción no válida. Intente de nuevo.")
            mostrarMenuCliente(volver)
        }
    })
}

module.exports = mostrarMenuCliente