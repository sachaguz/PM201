const { productos, readline } = require('./datos')

function mostrarMenuCocina(volver) {
    console.log("--- Menú Cocina ---")
    console.log("1. Listar productos")
    console.log("2. Agregar producto")
    console.log("3. Editar producto")
    console.log("4. Eliminar producto")
    console.log("5. Volver al menú principal")

    readline.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            readline.question("¿Quieres filtrarlos?: ", respuesta => {
                if (respuesta.toLowerCase() === "sí" || respuesta.toLowerCase() === "si") {
                    console.log("1. Productos baratos (menos de $20)")
                    console.log("2. Productos caros (más de $20)")
                    console.log("3. Postres")
                    console.log("4. Bebidas")
                    console.log("5. Salir")
                    readline.question("Seleccione una opción de filtro: ", filtro => {
                        let filtrados = []
                        if (filtro === "1") {
                            filtrados = productos.filter(p => p.precio < 20)
                            console.table(filtrados)
                            mostrarMenuCocina(volver)
                        }
                        else if (filtro === "2") {
                            filtrados = productos.filter(p => p.precio >= 20)
                            console.table(filtrados)
                            mostrarMenuCocina(volver)
                        }
                        else if (filtro === "3") {
                            filtrados = productos.filter(p => p.tipo.toLowerCase() === "postres")
                            console.table(filtrados)
                            mostrarMenuCocina(volver)
                        }
                        else if (filtro === "4") {
                            filtrados = productos.filter(p => p.tipo.toLowerCase() === "bebidas")
                            console.table(filtrados)
                            mostrarMenuCocina(volver)
                        } else if (filtro === "5") {
                            mostrarMenuCocina(volver)
                        }
                    })
                } else {
                    console.table(productos)
                    mostrarMenuCocina(volver)
                }
            })
        } else if (opcion === "2") {
            readline.question("Nombre: ", nombre => {
                readline.question("Precio: ", precio => {
                    readline.question("Tipo (ej. Bebida, Postre, etc.): ", tipo => {
                        readline.question("Tipo de promoción: ", promocion => {
                            productos.push({ nombre, precio: parseFloat(precio), tipo, promocion })
                            console.log("Producto agregado.")
                            mostrarMenuCocina(volver)
                        })
                    })
                })
            })

        } else if (opcion === "3") {
            console.table(productos)
            readline.question("Nombre del producto a editar: ", nombre => {
                let producto = productos.find(p => p.nombre === nombre)
                if (producto) {
                    readline.question("Nuevo precio: ", precio => {
                        readline.question("Nuevo tipo: ", tipo => {
                            readline.question("Nuevo tipo de promocion: ", promocion => {
                                producto.precio = parseFloat(precio)
                                producto.tipo = tipo
                                producto.promocion = promocion
                                console.log("Producto actualizado")
                                mostrarMenuCocina(volver)
                            })
                        })
                    })
                } else {
                    console.log("Producto no encontrado")
                    mostrarMenuCocina(volver)
                }
            })

        } else if (opcion === "4") {
            console.table(productos)
            readline.question("Nombre del producto a eliminar: ", nombre => {
                let index = productos.findIndex(p => p.nombre === nombre)
                if (index !== -1) {
                    productos.splice(index, 1)
                    console.log("Producto eliminado.")
                } else {
                    console.log("Producto no encontrado.")
                }
                mostrarMenuCocina(volver)
            })

        } else if (opcion === "5") {
            volver()

        } else {
            console.log("Opción no válida.")
            mostrarMenuCocina(volver)
        }
    })
}

// ============================================================
// NUEVO: PROMESAS
// Cocina prepara un pedido y devuelve una Promise.
// Por defecto resuelve (éxito). Para forzar un fallo en la
// próxima preparación se cambia "modoCocina".
// ============================================================
let modoCocina = "exito" // exito | error | ingrediente

function setModoCocina(modo) {
    modoCocina = modo
}

function prepararEnCocina(idPedido) {
    return new Promise((resolve, reject) => {
        console.log("Cocina: recibido pedido #" + idPedido + ", preparando...")
        setTimeout(() => {
            if (modoCocina === "exito") {
                resolve("Pedido preparado correctamente")
            } else if (modoCocina === "error") {
                reject("Error en cocina")
            } else if (modoCocina === "ingrediente") {
                reject("Falta ingrediente")
            }
            modoCocina = "exito" // se resetea después de cada pedido
        }, 2000)
    })
}

module.exports = mostrarMenuCocina
module.exports.prepararEnCocina = prepararEnCocina
module.exports.setModoCocina = setModoCocina