// -------------- Llamado a la API de MercadoLibre - en construcción --------------
// const API_URL = 'https://api.mercadolibre.com/sites/MLA/categories';
// const HTMLResponse = document.querySelector("#apiMELI");
// const tpl;

// fetch(`${API_URL}/sites/MLA/categories`)
//     .then((response) => response.json())
//     .then((name) => {
//         const tpl = name.map
//     })
// -------------- Fin del llamado a la API en construcción --------------


/*ARRAYS PARA RECORRER EL LOCALSTORAGE*/
var arrayOfKeys = Object.keys(localStorage);
var arrayOfValues = Object.values(localStorage);

/*ONLOAD PARA PRE-POBLAR LA TABLA */
window.addEventListener("load", poblarTabla);
function poblarTabla() {
    arrayOfValues.forEach(element => {
        pushALista(JSON.parse(element));
    });
}

/*VARIABLES DE EVENT LISTENERS */
const botonGenerar = document.querySelector("#btn-generador");
const botonAgregar = document.querySelector("#btn-agregar");
const botonAgregarCustom = document.querySelector("#btn-agregar-custom");
const botonLimpiar = document.querySelector("#btn-limpiar");

/* LISTA DE PRODUCTOS - Esta sección NO es un constructor porque más adelante va a ser reemplazado por los datos que trae la API, es solo un placeholder */
const listaProductos = [
    {
        categoria:"Hogar, Muebles y Jardín",
        nombre:"Placa 3d Vinilo Autoadhesivo Para Pared 70 X 77 Piedra Beige",
        precio: 500,
        enlace:"https://articulo.mercadolibre.com.ar/MLA-1108814518-placa-3d-vinilo-autoadhesivo-para-pared-70-x-77-piedra-beige-_JM",
        imagen: "./assets/imgs-productos/placa-vinilo-autoadh.jpg",
    },
    {
        categoria:"Libros, Revistas y Comics",
        nombre:"Libro El Bosque De Las Cosas Perdidas Shea Ernshan",
        precio: 1500,
        enlace:"https://articulo.mercadolibre.com.ar/MLA-1129317844-libro-el-bosque-de-las-cosas-perdidas-shea-ernshan-2-_JM",
        imagen: "./assets/imgs-productos/bosque-cosas-perdidas.jpg",
    },
    {
        categoria:"Deportes y Fitness",
        nombre:"Bicicleta Nordic X1.0 By Slp R29 Shim. 21v Disco Susp+linga",
        precio: 40998,
        enlace:"https://articulo.mercadolibre.com.ar/MLA-739946718-bicicleta-nordic-x10-by-slp-r29-shim-21v-disco-susplinga-_JM",
        imagen: "./assets/imgs-productos/bicicleta-nordic.jpg",
    },
    {
        categoria:"Electrodomésticos y Aires Ac.",
        nombre:"Calefactor Infrarrojo Liliana De Pared Cipar-2000",
        precio: 11999,
        enlace:"https://articulo.mercadolibre.com.ar/MLA-921138581-calefactor-infrarrojo-liliana-de-pared-cipar-2000-_JM",
        imagen: "./assets/imgs-productos/calefactor-infrarrojo.jpg",
    },
    {
        categoria:"Hogar, Muebles y Jardín",
        nombre:"Lampara Led Rgbw 12w E27 220v Control Remoto 16 Colores B",
        precio: 869,
        enlace:"https://articulo.mercadolibre.com.ar/MLA-793583797-lampara-led-rgbw-12w-e27-220v-control-remoto-16-colores-b-_JM",
        imagen: "./assets/imgs-productos/lampara-led.jpg",
    },
];



/* Llamado a un item random del array + Agregar datos del objeto random a los campos del generador */
var item = {}
function generarItemRandom() {
    item = listaProductos[Math.floor(Math.random()*listaProductos.length)];

    let categoria = document.getElementById("categoria");
    categoria.innerText = item.categoria;
    
    let nombre = document.getElementById("nombre");
    nombre.innerText = item.nombre;
    
    let precio = document.getElementById("precio");
    precio.innerText = `$ ${item.precio}`;
    
    let enlace = document.getElementById("enlace");
    enlace.innerHTML = `<a href="${item.enlace}">Click aquí</a>`;
    
    let imagen = document.getElementById("imagen");
    imagen.innerHTML = `<img src="${item.imagen}" alt="${item.nombre}">`;
}
botonGenerar.addEventListener("click", generarItemRandom);

/* ITEM CUSTOM - Añade el objeto ingresado en el form a la tabla custom */

function agregarCustom(event) {
    event.preventDefault();
    if (document.getElementById("categoriaCustom").value === "" || document.getElementById("nombreCustom").value === "" || document.getElementById("precioCustom").value === "" || document.getElementById("enlaceCustom").value === "") {
        alert("Por favor completá todos los campos.")
    } else {
        let objetoCustom = {
            categoria: document.getElementById("categoriaCustom").value,
            nombre: document.getElementById("nombreCustom").value,
            precio: document.getElementById("precioCustom").value,
            enlace: document.getElementById("enlaceCustom").value,
        };
        let obj = listaUsuario.find(o => o.nombre === objetoCustom.nombre);
        if (obj) {
            alert("Este item ya está en tu lista!");
        } else {
            pushALista(objetoCustom);
            localStorage.setItem(objetoCustom.nombre, JSON.stringify(objetoCustom));
            document.getElementById("categoriaCustom").value = "";
            document.getElementById("nombreCustom").value = "";
            document.getElementById("precioCustom").value = "";
            document.getElementById("enlaceCustom").value = "";
        }
    }
}

botonAgregarCustom.addEventListener("click", agregarCustom);

/* Añade el objeto generado a partir del item random a la tabla custom */
let listaUsuario = []

function pushALista(objeto) {
    listaUsuario.push(objeto);
        let lista = document.getElementById("tabla-custom");
        lista.innerHTML += 
        `<tr>
            <td>${objeto.categoria}</td>
            <td>${objeto.nombre}</td>
            <td>$ ${objeto.precio}</td>
            <td><a href="${objeto.enlace}">Click aquí!</a></td>
            <td><button class="btn btn-warning" onclick="borrarItem('${objeto.nombre}')">X</button></td>
        </tr>`
}

function agregarAMiLista() {
    let obj = listaUsuario.find(o => o.nombre === item.nombre);
    if (obj) {
        alert("Este item ya está en tu lista!");
    } else {
        pushALista(item);
        localStorage.setItem(item.nombre, JSON.stringify(item));
    }
}


botonAgregar.addEventListener("click", agregarAMiLista);


/*LIMPIAR ITEMS DE LA TABLA CUSTOM */
botonLimpiar.addEventListener("click", limpiarTabla);
function limpiarTabla(){
    localStorage.clear();
    location.reload();
}


/*BORRAR ITEM DE LA TABLA Y LOCALSTORAGE */
const borrarItem = (nombre) => {
    localStorage.removeItem(nombre);
    location.reload();
}