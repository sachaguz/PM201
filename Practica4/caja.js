const { pedidos, readline } = require('./datos')
const mostrarMenuCocina = require('./cocina')
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

function mostrarMenuPedidos(volver) {
    console.log("--- Menú Caja ---")
    console.log("1. Listar pedidos")
    console.log("2. Ver subtotal, IVA y total del pedido")
    console.log("3. Volver al menú principal")

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

mostrarMenuPrincipal()