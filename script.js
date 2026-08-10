// ================= MOBILE MENU =================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

    if (navLinks.classList.contains("active")) {

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

        menuToggle.setAttribute("aria-label", "Close menu");

    } else {

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuToggle.setAttribute("aria-label", "Open menu");
    }

});


// ================= CLOSE MOBILE MENU =================

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        menuToggle.setAttribute("aria-label", "Open menu");

    });

});


// ================= CART ELEMENTS =================

const cartButton = document.querySelector(".cart");
const cartPanel = document.querySelector(".cart-panel");
const cartClose = document.querySelector(".cart-close");
const cartOverlay = document.querySelector(".cart-overlay");

const cartCountElement = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total strong");

const addToCartButtons = document.querySelectorAll(".add-to-cart");


// ================= CART DATA =================

let cartCount = 0;
let cartProducts = [];


// ================= ADD TO CART =================

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        const productName =
            productCard.querySelector(".product-info h3").textContent;

        const productPrice =
            productCard.querySelector(".product-bottom strong").textContent;

        const productImage =
            productCard.querySelector(".product-image img").src;

        const price = parseFloat(
            productPrice.replace("$", "").replace(",", "")
        );

        cartProducts.push({
            name: productName,
            price: price,
            image: productImage
        });

        cartCount++;

        cartCountElement.textContent = cartCount;

        updateCart();

        // Button animation

        button.style.transform = "scale(1.15)";

        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 200);

    });

});


// ================= UPDATE CART =================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cartProducts.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <strong>$${product.price.toFixed(2)}</strong>

                <button
                    class="remove-cart-item"
                    data-index="${index}"
                    type="button"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        cartItems.appendChild(item);

    });


    // Update total

    cartTotal.textContent = `$${total.toFixed(2)}`;


    // Empty cart

    if (cartProducts.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    // Remove products

    const removeButtons =
        document.querySelectorAll(".remove-cart-item");

    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cartProducts.splice(index, 1);

            cartCount--;

            cartCountElement.textContent = cartCount;

            updateCart();

        });

    });

}


// ================= OPEN CART =================

cartButton.addEventListener("click", (e) => {

    e.preventDefault();

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

});


// ================= CLOSE CART =================

cartClose.addEventListener("click", () => {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

});


// ================= CLOSE CART WITH OVERLAY =================

cartOverlay.addEventListener("click", () => {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

});

// ================= CHECKOUT =================

const checkoutButton = document.querySelector(".checkout-btn");

checkoutButton.addEventListener("click", () => {

    if (cartProducts.length === 0) {

        alert("Your cart is empty. Please add a product first.");

        return;
    }

    let total = 0;

    cartProducts.forEach((product) => {
        total += product.price;
    });

    alert(
        "Order Summary\n\n" +
        "Items: " + cartProducts.length + "\n" +
        "Total: $" + total.toFixed(2) + "\n\n" +
        "Thank you for shopping with NovaMart!"
    );

});

// ================= CHECKOUT =================



const checkoutButton = document.querySelector(".checkout-btn");
const checkoutModal = document.querySelector("#checkoutModal");
const checkoutOk = document.querySelector("#checkoutOk");
const checkoutClose = document.querySelector("#checkoutClose");

if (checkoutButton && checkoutModal && checkoutOk && checkoutClose) {

checkoutButton.addEventListener("click", () => {

    if (cartProducts.length === 0) {
        checkoutModal.classList.add("active");
        return;
    }

    checkoutModal.classList.add("active");

});


checkoutOk.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

    cartProducts = [];
    cartCount = 0;

    cartCountElement.textContent = "0";

    updateCart();

});


checkoutClose.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

});


checkoutModal.addEventListener("click", (event) => {

    if (event.target === checkoutModal) {
        checkoutModal.classList.remove("active");
    }

});

}