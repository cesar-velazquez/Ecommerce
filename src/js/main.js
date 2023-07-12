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
                ${quantity
                ? `<button class='bx bx-cart-add  product__btn' id=${id}>Add</button>`
                : `<div class="div__sold"><p class="sold__out">Sold Out</p></div>`
            }
                </p>                                                                        
                <p class="category"><strong>${category}</strong></p>
                <p class="reseña" id=${id}>${name}</p>
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
        const { amount, price } = store.cart[key];
        totalProducts += amount;
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
    document.querySelector(".btnbuy").addEventListener('click', function () {
        const response = confirm('Proceder a hacer el pago');
        if (!response) return;

        const newArray = [];
        store.produ.forEach((product) => {
            if (store.cart[product.id]) {
                newArray.push({
                    ...product, quantity: product.quantity - store.cart[product.id].amount,
                });
            } else {
                newArray.push(product);
            }
        });
        console.log(newArray);
        store.produ = newArray;
        store.cart = {};
        localStorage.setItem('produ', JSON.stringify(store.produ));
        localStorage.setItem("cart", JSON.stringify(store.cart));
        printArticles(store.produ);
        printProductsInCart(store);
        printTotal(store);
    })
}

function printerModal() {    
    let modal = "";
    modal +=`
    <div class="content__modal ">
        <div class="modal__info">
            <i class='bx bx-comment-x' ></i>
            <div class="modal__img">
            <h1>dlfkjglfkdjgklfdjglkdf</h1>
                <img src="/src/img/loader.jpg" alt="">
            </div>
            </div>
        </div>
    `;  
    document.querySelector(".inicio__modal").innerHTML = modal;
    // const inicioModal = document.querySelector('.inicio__modal');
    // const cerrarModal = document.querySelector('.bx-comment-x');

    // cerrarModal.addEventListener('click', function () {
    //     inicioModal.classList.toggle('inicio__modal__show');
    // });
}


function showModal(store) {
    const containProductHTML = document.querySelector(".product__principal");
    containProductHTML.addEventListener('click', function (e) {
        if (e.target.classList.contains("reseña")) {
            const id = Number(e.target.id);
            console.log(id);
            if (id > 0) {
                printerModal(store);
                const inicioModal = document.querySelector('.inicio__modal');
                inicioModal.classList.toggle('inicio__modal__show');
            }
        }
    });
}

function hiddennav() {
    window.addEventListener("scroll", function () {
        var navbar = document.getElementById("navbar");
    
        if (window.scrollY > 0) {
            navbar.classList.add("scrolled");
            navbar.classList.remove("transparent");
        } else {
            navbar.classList.add("transparent");
            navbar.classList.remove("scrolled");
        }
    });
    
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
    printerBackgrounds();    
    showModal();
    hiddennav();
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

//inicio cambio de backgrounds en la pag apartir del change mode
function printerBackgrounds() {

    const changeThemeHTML = document.querySelector("#changeTheme");
    const changeIconHTML = document.getElementById('changeTheme');

    changeThemeHTML.addEventListener("click", function () {
        document.body.classList.toggle("darkmode");

        const DarkMode = document.body.classList.contains("darkmode");
        localStorage.setItem("theme", DarkMode ? "dark" : "light");
    });
    changeIconHTML.addEventListener('click', function () {
        const icon = changeIconHTML.querySelector('i');
        if (icon.classList.contains('bxs-moon')) {
            icon.classList.remove('bxs-moon');
            icon.classList.add('bxs-sun');
            icon.style.cursor = "pointer";                  
        } else {
            icon.classList.remove('bxs-sun');
            icon.classList.add('bxs-moon');
        }
    });
}
//fin cambio darmode
// INICIO DE UN LOADER para guardar el darkmode
window.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
        // Aplicar el tema guardado si existe
    if (savedTheme === "dark") {
        document.body.classList.add("darkmode");        
    } 
});

window.addEventListener("load", function () {
    loader();
});
// FIN DE CARGA DE LOADER
