const { productos } = require('./datos')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function mostrarMenu() {
    console.log("1. Listar productos")
    console.log("2. Agregar producto")
    console.log("3. Editar producto")
    console.log("4. Eliminar producto")
    console.log("5. Salir")

    readline.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            console.table(productos)
            mostrarMenu()

        } else if (opcion === "2") {
            readline.question("Nombre: ", nombre => {
                readline.question("Precio: ", precio => {
                    productos.push({ nombre, precio: parseFloat(precio) })
                    console.log("Producto agregado.")
                    mostrarMenu()
                })
            })

        } else if (opcion === "3") {
            console.table(productos)
            readline.question("Nombre del producto a editar: ", nombre => {
                let producto = productos.find(p => p.nombre === nombre)
                if (producto) {
                    readline.question("Nuevo precio: ", precio => {
                        producto.precio = parseFloat(precio)
                        console.log("Producto actualizado")
                        mostrarMenu()
                    })
                } else {
                    console.log("Producto no encontrado")
                    mostrarMenu()
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
                mostrarMenu()
            })

        } else if (opcion === "5") {
            console.log("Hasta luego.")
            readline.close()

        } else {
            console.log("Opción no válida.")
            mostrarMenu()
        }
    })
}

mostrarMenu()