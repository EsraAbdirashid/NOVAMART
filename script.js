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

// Close mobile menu after clicking a navigation link

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


// ================= ADD TO CART =================

let cartCount = 0;

const cartCountElement = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total strong");

let cartProducts = [];

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

        button.style.transform = "scale(1.15)";

        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 200);

    });

});


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

                <button class="remove-cart-item" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        cartItems.appendChild(item);

    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    if (cartProducts.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    // REMOVE PRODUCT

    const removeButtons =
        document.querySelectorAll(".remove-cart-item");

    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cartProducts.splice(index, 1);

            cartCount--;

            cartCountElement.textContent = cartCount;

            updateCart();

        });

    });

}
