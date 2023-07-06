//inicio cambio de backgrounds en la pag
const changeThemeHTML = document.querySelector("#changeTheme");
changeThemeHTML.addEventListener("click", function () {
    document.body.classList.toggle("darkmode");
});

const changeIconHTML = document.getElementById('changeTheme');
const rectangulo = document.querySelector('.muestraropa');
const headerSection = document.querySelector('.segundaMitad');
const btnShowMore = document.querySelector('.show__more');
// const btnFiltros = document.querySelectorAll('.btn__filtros');


changeIconHTML.addEventListener('click', function () {
    const icon = changeIconHTML.querySelector('i');
    if (icon.classList.contains('bxs-moon')) {
        icon.classList.remove('bxs-moon');
        icon.classList.add('bxs-sun');
        console.log((rectangulo.style.backgroundColor = "aqua"));        
        console.log((btnShowMore.style.color = "#FFFFFF"));
        console.log((btnShowMore.style.backgroundColor = "#161616"));        
    } else {
        icon.classList.remove('bxs-sun');
        icon.classList.add('bxs-moon');
        console.log((rectangulo.style.backgroundColor = "#fd135a"));
        console.log((btnShowMore.style.color = "#FFFFFF"));
        console.log((btnShowMore.style.backgroundColor = "#000000"));
    }
});
//fin cambio de backgrounds en la pag

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
        <div class="contain__product">
            <div class="img__prod">
                <img src="${image}" alt="${name}">
            </div>            
            <div class="precio">
                $${price} <span class="noresaltar">Stock: ${quantity}</span>
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
}
// FIN DEL PROCESO DE OBTENCION DE UNA API CON UNA FUNCIÓN

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

})
// FIN DE CARGA DE LOADER

