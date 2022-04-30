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

    let categoria = $("#categoria")[0];
    categoria.innerText = item.categoria;
    
    let nombre = $("#nombre")[0];
    nombre.innerText = item.nombre;
    
    let precio = $("#precio")[0];
    precio.innerText = `$ ${item.precio}`;
    
    let enlace = $("#enlace")[0];
    enlace.innerHTML = `<a href="${item.enlace}">Click aquí</a>`;
    
    let imagen = $("#imagen")[0];
    imagen.innerHTML = `<img src="${item.imagen}" alt="${item.nombre}">`;
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
        Swal.fire({
            text: "Este item ya está en tu lista!",
            confirmButtonColor: "#ffc107",
            padding: "2em",
        });
    } else {
        pushALista(item);
        localStorage.setItem(item.nombre, JSON.stringify(item));
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
/*ENVIAR LOS OBJETOS EN LOCALSTORAGE POR EMAIL */
$("#btn-enviar").on("click", function sendMail() {
    let mailBody=arrayOfValues;
    window.location="mailto:email@ejemplo.com?subject=Hola&body="+mailBody;
 });
/*-----------FIN BOTONES-----------*/