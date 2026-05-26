const { pedidos, readline } = require('./datos')
const mostrarMenuCocina = require('./cocina')
const { setModoCocina } = require('./cocina')
const mostrarMenuCliente = require('./cliente')

let subtotal = 0
let iva = 0
let total = 0

function calcularTotales() {
    subtotal = 0

    for (let pedido of pedidos) {
        if (pedido.total) {
            subtotal += pedido.total
        }
    }

    iva = subtotal * 0.16
    total = subtotal + iva
}

// ============================================================
// NUEVO: CALLBACKS
// Caja expone dos callbacks. El cliente los invoca al terminar
// el flujo asíncrono del pedido.
// ============================================================
function onPedidoListo(idPedido) {
    console.log(">> Caja notificada: pedido #" + idPedido + " LISTO para cobrar")
}

function onPedidoCancelado(idPedido, motivo) {
    console.log(">> Caja notificada: pedido #" + idPedido + " CANCELADO (" + motivo + ")")
}

function mostrarMenuPedidos(volver) {
    console.log("--- Menú Caja ---")
    console.log("1. Listar pedidos")
    console.log("2. Ver subtotal, IVA y total del pedido")
    console.log("3. Forzar resultado del próximo pedido en cocina")
    console.log("4. Volver al menú principal")

    readline.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            console.table(pedidos)
            mostrarMenuPedidos(volver)
        } else if (opcion === "2") {
            calcularTotales()
            console.log("Subtotal: $" + subtotal)
            console.log("IVA: $" + iva)
            console.log("Total: $" + total)
            mostrarMenuPedidos(volver)
        } else if (opcion === "3") {
            console.log("1. Éxito (por defecto)")
            console.log("2. Error en cocina")
            console.log("3. Falta ingrediente")
            readline.question("Seleccione modo: ", modo => {
                if (modo === "1") setModoCocina("exito")
                else if (modo === "2") setModoCocina("error")
                else if (modo === "3") setModoCocina("ingrediente")
                console.log("Modo aplicado.")
                mostrarMenuPedidos(volver)
            })
        } else if (opcion === "4") {
            volver()
        } else {
            console.log("Opción no válida.")
            mostrarMenuPedidos(volver)
        }
    })
}

function mostrarMenuPrincipal() {
    console.log("=== Menú Principal ===")
    console.log("1. Menú Cliente")
    console.log("2. Menú Cocina")
    console.log("3. Menú Caja")
    console.log("4. Salir")

    readline.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            mostrarMenuCliente(mostrarMenuPrincipal)
        } else if (opcion === "2") {
            mostrarMenuCocina(mostrarMenuPrincipal)
        } else if (opcion === "3") {
            mostrarMenuPedidos(mostrarMenuPrincipal)
        } else if (opcion === "4") {
            console.log("Hasta luego.")
            readline.close()
        } else {
            console.log("Opción no válida.")
            mostrarMenuPrincipal()
        }
    })
}

module.exports = { onPedidoListo, onPedidoCancelado }

mostrarMenuPrincipal()