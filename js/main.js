// -------------- Llamado y procesamiento de API de MercadoLibre --------------
let categorias = [];
let categoriaRandom = {};
let productosDeApi = [];
let productoAlAzar = {};
let urlcategoria = ""
const url ='https://api.mercadolibre.com/sites/MLA/categories';

function shuffle (o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

async function traerCategorias () {
    await fetch(url)
        .then(resp => resp.json())
        .then ((data) => {
            data.forEach(element => {
                categorias.push(element)
            });
        categoriaRandom = categorias[Math.floor(Math.random()*categorias.length)];
        return categoriaRandom;
    })}

async function traerProductos () {
    await fetch(`https://api.mercadolibre.com/sites/MLA/search?status=active&category=${categoriaRandom.id}`)
        .then(resp => resp.json())
        .then(data => ((data.results).forEach(element => {
            productosDeApi.push(element)
        })));
}

// -------------- Fin del llamado y procesamiento de API --------------

/*ARRAYS PARA RECORRER EL LOCALSTORAGE*/
let arrayOfKeys = Object.keys(localStorage);
let arrayOfValues = Object.values(localStorage);

/*ONLOAD PARA PRE-POBLAR LA TABLA */
window.addEventListener("load", poblarTabla);
function poblarTabla() {
    arrayOfValues.forEach(element => {
        pushALista(JSON.parse(element));
    });
}

/* Llamado a un item random del array + Agregar datos del objeto random a los campos del generador */

async function generarItemRandom () {
    await traerCategorias();
    await traerProductos();
    productosDeApi = shuffle(productosDeApi);
    productoAlAzar = productosDeApi[0];
    
    let categoria = $("#categoria")[0];
    categoria.innerText = categoriaRandom.name;
    
    let nombre = $("#nombre")[0];
    nombre.innerText = productoAlAzar.title;
    
    let precio = $("#precio")[0];
    precio.innerText = `$ ${productoAlAzar.price}`;
    
    let enlace = $("#enlace")[0];
    enlace.innerHTML = `<a href="${productoAlAzar.permalink}">Click aquí</a>`;
    
    let imagen = $("#imagen")[0];
    imagen.innerHTML = `<img src="${productoAlAzar.thumbnail}" alt="${productoAlAzar.title}">`;
}

/* ITEM CUSTOM - Añade el objeto ingresado en el form a la tabla custom */

function agregarCustom(event) {
    event.preventDefault();
    if ($("#categoriaCustom").val() === "" || $("#nombreCustom").val() === "" || $("#precioCustom").val() === "" || $("#enlaceCustom").val() === "") {
        Swal.fire({
            text: "Por favor completá todos los campos.",
            confirmButtonColor: "#ffc107",
            padding: "2em",
        })
    } else {
        let objetoCustom = {
            categoria: $("#categoriaCustom").val(),
            nombre: $("#nombreCustom").val(),
            precio: $("#precioCustom").val(),
            enlace: $("#enlaceCustom").val(),
        };
        let obj = listaUsuario.find(o => o.nombre === objetoCustom.nombre);
        if (obj) {
            Swal.fire({
                text: "Este item ya está en tu lista!",
                confirmButtonColor: "#ffc107",
                padding: "2em",
            })
        } else {
            pushALista(objetoCustom);
            localStorage.setItem(objetoCustom.nombre, JSON.stringify(objetoCustom));
            $("#categoriaCustom").val('');
            $("#nombreCustom").val('');
            $("#precioCustom").val('');
            $("#enlaceCustom").val('');
            Toastify({
                text: "Agregado a la lista!",
                offset: {
                  x: 50,
                  y: 10
                },
                backgroundColor: "#ffc107",
              }).showToast();
        }
    }
}


/* Añade el objeto generado a partir del item random a la tabla custom */
let listaUsuario = []

function pushALista(objeto) {
    listaUsuario.push(objeto);
        let lista = $("#tabla-custom")[0];
        console.log(categoriaRandom.name);
        lista.innerHTML += 
        `<tr>
            <td>${categoriaRandom.name}</td>
            <td>${objeto.title}</td>
            <td>$ ${objeto.price}</td>
            <td><a href="${objeto.permalink}">Click aquí!</a></td>
            <td><button class="btn btn-warning" onclick="borrarItem('${objeto.title}')">X</button></td>
        </tr>`
}


function agregarAMiLista() {
    let obj = listaUsuario.find(o => o.title === productoAlAzar.title);
    if (obj) {
        Swal.fire({
            text: "Este item ya está en tu lista!",
            confirmButtonColor: "#ffc107",
            padding: "2em",
        });
    } else {
        pushALista(productoAlAzar);
        localStorage.setItem(productoAlAzar.title, JSON.stringify(productoAlAzar));
        Toastify({
            text: "Agregado a la lista!",
            offset: {
              x: 50,
              y: 10
            },
            backgroundColor: "#ffc107",
          }).showToast();
    }
}



/*BORRAR ITEM DE LA TABLA Y LOCALSTORAGE */
const borrarItem = (nombre) => {
    localStorage.removeItem(nombre);
    location.reload();
}



/*-------------BOTONES-------------*/
$("#btn-generador").on("click", generarItemRandom);
$("#btn-agregar").on("click", agregarAMiLista);
$("#btn-agregar-custom").on("click", agregarCustom);
/*LIMPIAR ITEMS DE LA TABLA CUSTOM */
$("#btn-limpiar").on("click", function limpiarTabla(){
    localStorage.clear();
    location.reload();
});
$("#btn-modal").on("click", function agregarHidden() {
    $("#my-modal").modal("show");
})

$(".btn-cerrar").on("click", function cerrarModal(){
    $("#my-modal").modal("hide");
})
/*ENVIAR LOS OBJETOS EN LOCALSTORAGE POR EMAIL */
$("#btn-enviar").on("click", function sendMail() {
    let mailBody=arrayOfValues;
    window.location="mailto:email@ejemplo.com?subject=Lista&body="+mailBody;
 });
/*-----------FIN BOTONES-----------*/

window.onload = generarItemRandom();