// INICIO DEL PROCESO DE OBTENCION DE UNA API CON UNA FUNCIÓN
const BASE_URL = "https://ecommercebackend.fundamentos-29.repl.co";

async function getApi() {
    try {
        const data = await fetch(BASE_URL);
        const res = await data.json();
        return res;
    } catch (error) {
        console.log(error, "esto es un error");
    }
}

function printArticles(products) {
    html = "";

    for (const { image, name, price, quantity, description, category } of products) {
        html += `
        <div class="contain__product ${category}">
            <div class="img__prod">
                <img src="${image}" alt="${name}">
            </div>            
            <div class="precio">
                <p class="precioprod">$${price} <span class="noresaltar">Stock: ${quantity}</span> <br><strong>${category}</strong> </p>                
                <p class="reseña">${description}</p>
            </div>              
        </div>
        `;
    }
    document.querySelector(".product__principal").innerHTML = html;
}



async function main() {
    const articles = await getApi();
    printArticles(articles);

    mixitup(".product__principal", {
        selectors: {
            target: '.contain__product'
        },
        animation: {
            duration: 300
        }
    });
}
// FIN DEL PROCESO DE OBTENCION DE UNA API CON UNA FUNCIÓN

//inicio cambio de backgrounds en la pag
const changeThemeHTML = document.querySelector("#changeTheme");
changeThemeHTML.addEventListener("click", function () {
    document.body.classList.toggle("darkmode");
});

const changeIconHTML = document.getElementById('changeTheme');
const rectangulo = document.querySelector('.muestraropa');
const headerSection = document.querySelector('.segundaMitad');
const btnShowMore = document.querySelector('.show__more');
const buttonFiltros = document.querySelectorAll(".btn__products .btn__filtros");
const footercont = document.querySelector(".section__container");
const footertitle = document.querySelectorAll(".footer__title");
const linkRepositorio = document.querySelector(".parrafo__a");
const spaceSocial = document.querySelector(".footer__ul__social");

changeIconHTML.addEventListener('click', function () {
    const icon = changeIconHTML.querySelector('i');
    if (icon.classList.contains('bxs-moon')) {
        icon.classList.remove('bxs-moon');
        icon.classList.add('bxs-sun');
        console.log(icon.style.color = "red");

        buttonFiltros.forEach((boton) => {
            boton.style.backgroundColor = "#000000";
            boton.style.color = "#ffffff";
        });
        document.addEventListener("DOMContentLoaded", function () {
            const fondotarjetas = document.querySelectorAll(".contain__product .img__prod");
            fondotarjetas.forEach((fondo) => {
                fondo.style.backgroundColor = "#000039";
            });
        });
        console.log(footercont.style.backgroundColor = "#1b1b1b");
        footertitle.forEach((titulo) => {
            titulo.style.color = "#FFFFFF";
        });
        console.log(spaceSocial.style.backgroundColor = "#ffffff");
        console.log(linkRepositorio.style.color = "#000");
        console.log((rectangulo.style.backgroundColor = "aqua"));
        console.log((btnShowMore.style.color = "#FFFFFF"));
        console.log((btnShowMore.style.backgroundColor = "#161616"));
    } else {
        icon.classList.remove('bxs-sun');
        icon.classList.add('bxs-moon');
        buttonFiltros.forEach((boton) => {
            boton.style.backgroundColor = "#ffffff";
            boton.style.color = "#000";
        });
        footertitle.forEach((titulo) => {
            titulo.style.color = "#000";
        });
        console.log(spaceSocial.style.backgroundColor = "#d7d1d1");
        console.log(linkRepositorio.style.color = "#ffffff");
        console.log(footercont.style.backgroundColor = "#e6e6e6");
        console.log((rectangulo.style.backgroundColor = "#fd135a"));
        console.log((btnShowMore.style.color = "#FFFFFF"));
        console.log((btnShowMore.style.backgroundColor = "#000000"));
    }
});
//fin cambio de backgrounds en la pag



// INICIO DE UN LOADER
function loader() {
    setTimeout(function () {
        document
            .querySelector(".content__loader")
            .classList.add("content__loader__hidden");
        console.log("se quita el loader");
    }, 1000);
}

window.addEventListener("load", function () {
    main();
    loader();
});
// FIN DE CARGA DE LOADER
