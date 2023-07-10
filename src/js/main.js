// INICIO DEL PROCESO DE OBTENCION DE UNA API CON UNA FUNCIÓN
const BASE_URL = "https://ecommercebackend.fundamentos-29.repl.co";

async function getProducts() {
    try {
        const data = await fetch(BASE_URL);
        const response = await data.json();
        localStorage.setItem('produ', JSON.stringify(response));
        return response;
    } catch (error) {
        console.log(error, "esto es un error");
    }
}

function printArticles(produ) {
    html = "";
    produ.forEach(function ({ id, image, name, price, quantity, description, category }) {
        html += `
        <div class="contain__product ${category} ${id}">
            <div class="img__prod">
                <img src="${image}" alt="${name}">
            </div>            
            <div class="precio">
                <p class="precioprod">$${price}.00 
                <span class="noresaltar">Stock: ${quantity}</span>
                ${
                    quantity 
                    ? `<button class='bx bx-cart-add  product__btn' id=${id}>Add</button>` 
                    : `<div class="div__sold"><p class="sold__out">Sold Out</p></div>`
                }
                </p>                                                                        
                <p class="category"><strong>${category}</strong></p>
                <p class="reseña">${name}</p>
            </div>              
        </div>
        `;
    });
    document.querySelector(".product__principal").innerHTML = html;
}

function HandleShowCart() {
    const faShoppingCart = document.querySelector('.fa-shopping-cart');
    const cart = document.querySelector('.cart');
    faShoppingCart.addEventListener('click', function () {
        cart.classList.toggle('cart__show');
    });
}
function filtrar() {
    mixitup(".product__principal", {
        selectors: {
            target: '.contain__product'
        },
        animation: {
            duration: 300
        }
    });
}


function loader() {
    setTimeout(function () {
        document
            .querySelector(".content__loader")
            .classList.add("content__loader__hidden");
        console.log("se quita el loader");
    }, 1000);
}
function printProductsInCart(store) {
    let html = "";

    for (const key in store.cart) {
        const { amount, id, image, name, price, quantity } = store.cart[key];
        html += `
        <div class="cart__product">
        <div class="cart__product__img">
            <img class="img__cart" src="${image}" alt="${name}">
        </div>

        <div class="cart__product__body">
            <p>
                <b>${name}</b>
            </p>
            <p>
            <small>price:$${price} |  $${amount * price}</small>
            </p>
            <p>
            <b><small>Disponibles: ${quantity}</small></b>
            </p>
            <div class="cart__product__opt" id="${id}">
            <i class='bx bx-minus'></i>
            <span>${amount}</span>
            <i class='bx bx-plus'></i>
            <i class='bx bxs-trash'></i>
            </div>
        </div>
    </div>        
        `
    }
    document.querySelector(".cart__products").innerHTML = html;
}

function validateAmountProduct(store, id) {
    if (store.cart[id].amount === store.cart[id].quantity) {
        alert('No hay más unidades disponibles');
    } else {
        store.cart[id].amount++;
    }
}

function addtoCartFromProducts(store) {
    const containProductHTML = document.querySelector(".product__principal");
    containProductHTML.addEventListener('click', function (e) {
        if (e.target.classList.contains("product__btn")) {
            const id = Number(e.target.id);
            const productFound = store.produ.find(function (product) {
                return product.id === id;
            });
            if (store.cart[productFound.id]) {
                validateAmountProduct(store, productFound.id);
            } else {
                store.cart[productFound.id] = {
                    ...productFound,
                    amount: 1,
                };
            }
            localStorage.setItem("cart", JSON.stringify(store.cart));
            printProductsInCart(store);
            printTotal(store);
        }
    });
}
function printTotal(store) {
    let totalProducts = 0;
    let totalPrice = 0;
    for (const key in store.cart) {
        const {amount, price} = store.cart[key];                
        totalProducts +=amount;
        totalPrice += amount * price;
    }

    document.querySelector("#totalProducts").textContent = totalProducts;
    document.querySelector("#totalPrice").textContent = totalPrice;
    document.querySelector(".ball").textContent = totalProducts;
}
function controllerCart(store) {
    const prueba = document.querySelector(".cart__products")
    prueba.addEventListener("click", function (e) {
        if (e.target.classList.contains("bx")) {
            if (e.target.classList.contains("bx-minus")) {
                const id = Number(e.target.parentElement.id);
                if (store.cart[id].amount === 1) {
                    const resp = confirm("¿estás seguro de querer eliminar?");
                    if (resp) delete store.cart[id];
                } else {
                    store.cart[id].amount--;
                }
            }
            if (e.target.classList.contains("bx-plus")) {
                validateAmountProduct(store, e.target.parentElement.id);
            }
            if (e.target.classList.contains("bxs-trash")) {
                const id = Number(e.target.parentElement.id);
                const resp = confirm("¿estás seguro de querer eliminar?");
                if (resp) delete store.cart[id];
            }
            localStorage.setItem("cart", JSON.stringify(store.cart));
            printProductsInCart(store);
            printTotal(store);
        }
    });
}
function controllerTotal(store) {
    document.querySelector(".btnbuy").addEventListener('click', function() {
        const response = confirm('Proceder a hacer el pago');
        if (!response) return;

        const newArray = [];
        store.produ.forEach((product)=>{
            if (store.cart[product.id]) {
                newArray.push({
                    ...product, quantity: product.quantity - store.cart[product.id].amount,
                });
            }else{
                newArray.push(product);
            }            
        });
        console.log(newArray);
        store.produ = newArray;
        store.cart  = {};
        localStorage.setItem('produ', JSON.stringify(store.produ));
        localStorage.setItem("cart", JSON.stringify(store.cart));
        printArticles(store.produ);
        printProductsInCart(store); 
        printTotal(store);                  
    })
}

async function main() {
    const store = {
        produ: JSON.parse(localStorage.getItem('produ')) || (await getProducts()),
        cart: JSON.parse(localStorage.getItem('cart')) || {},
    }
    printArticles(store.produ);
    printerMenu();
    HandleShowCart();
    addtoCartFromProducts(store);
    printTotal(store);
    printProductsInCart(store);
    controllerCart(store);
    controllerTotal(store);
    filtrar();
}

main();


// DENTRO DEL MAIN ESTÁ TAMBIEN LA HERRAMIENTA PARA FILTRAR 
// FIN DEL PROCESO DE OBTENCION DE UNA API CON UNA FUNCIÓN
// inicio de menu bar
// function ContolMenu() {
function printerMenu() {
    const menuHtml = document.querySelector(".menu_des");
    const iconmenuHTML = document.querySelector(".bx-menu");
    const links = document.querySelectorAll(".menu_des .inicio");

    function controllerMenu() {
        menuHtml.classList.toggle("menu__show");
    }
    iconmenuHTML.addEventListener("click", controllerMenu);

    links.forEach((link) => {
        link.addEventListener("click", controllerMenu);
    });
    window.addEventListener('click', function (event) {
        if (!menuHtml.contains(event.target) && !iconmenuHTML.contains(event.target)) {
            menuHtml.classList.remove("menu__show");
        }
    });
}
//fin funcion de mostrar menú





function printBtnsFilterDark() {
    const btnFilters = document.querySelectorAll(".btn__products .btn__filtros");
    btnFilters.forEach((btnFilter) => {
        btnFilter.style.backgroundColor = "var(--bgd-100)";
        btnFilter.style.color = "var(--textd-100)"
    });
}
function printBtnsFilterLigth() {
    const btnFilters = document.querySelectorAll(".btn__products .btn__filtros");
    btnFilters.forEach((btnFilter) => {
        btnFilter.style.backgroundColor = "var(--bg-100)";
        btnFilter.style.color = "var(--text-100)"
    });
}

function printerImgDark() {
    const cardsImgs = document.querySelectorAll(".contain__product .img__prod");
    cardsImgs.forEach((cardImg) => {
        cardImg.style.backgroundColor = "var(--bgd-200)";
    })
}
function printerImgLight() {
    const cardsImgs = document.querySelectorAll(".contain__product .img__prod");
    cardsImgs.forEach((cardImg) => {
        cardImg.style.backgroundColor = " var(--bg-300)";
    });
}

function printPriceDark() {
    const linePrices = document.querySelectorAll(".precio .precioprod");
    linePrices.forEach((linePrice) => {
        linePrice.style.backgroundColor = "var(--textd-100)";
    });
}

function printPriceLigth() {
    const linePrices = document.querySelectorAll(".precio .precioprod");
    linePrices.forEach((linePrice) => {
        linePrice.style.backgroundColor = "var(--primary-100)";
    });
}

function printerDescriptionDark() {
    const cardsDescriptions = document.querySelectorAll(".contain__product .precio");
    cardsDescriptions.forEach((cardDescription) => {
        cardDescription.style.backgroundColor = "var(--primary-100)";
        // cardDescription.style.color= "var(--text-100)";
    });
}
function printerDescriptionLight() {
    const cardsDescriptions = document.querySelectorAll(".contain__product .precio");
    cardsDescriptions.forEach((cardDescription) => {
        cardDescription.style.backgroundColor = "var(--bg-100)";
    });
}

function printerCartLight() {
    const iconsCarts = document.querySelectorAll(".iconos__nav .bx-menu")
    iconsCarts.forEach((iconCart) => {
        iconCart.style.backgroundColor = "var(--academlo)";
    });
}
function printerCartDark() {
    const iconsCarts = document.querySelectorAll(".iconos__nav .bx-menu")
    iconsCarts.forEach((iconCart) => {
        iconCart.style.backgroundColor = "#FFFFFF";
    });
}

// }
//inicio cambio de backgrounds en la pag apartir del change mode
const changeThemeHTML = document.querySelector("#changeTheme");
changeThemeHTML.addEventListener("click", function () {
    document.body.classList.toggle("darkmode");
});

const changeIconHTML = document.getElementById('changeTheme');
const rectangulo = document.querySelector('.muestraropa');


changeIconHTML.addEventListener('click', function () {
    const icon = changeIconHTML.querySelector('i');
    if (icon.classList.contains('bxs-moon')) {
        icon.classList.remove('bxs-moon');
        icon.classList.add('bxs-sun');
        icon.style.cursor = "pointer";
        printBtnsFilterDark();
        printerCartDark();
        printerImgDark();
        printPriceDark();
        printerDescriptionDark();
        console.log((rectangulo.style.backgroundColor = "var(--accentd-100)"));
    } else {
        icon.classList.remove('bxs-sun');
        icon.classList.add('bxs-moon');
        printBtnsFilterLigth()
        printerCartLight();
        printerImgLight();
        printerDescriptionLight();
        console.log((rectangulo.style.backgroundColor = "var(--primary-100)"));
    }
});
//fin cambio de backgrounds en la pag



// INICIO DE UN LOADER


window.addEventListener("load", function () {
    loader();
});
// FIN DE CARGA DE LOADER
