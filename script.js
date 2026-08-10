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

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        cartCount++;

        cartCountElement.textContent = cartCount;

        // Small animation
        button.style.transform = "scale(1.15)";

        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 200);

    });

});

// ================= CART PANEL =================

const cartButton = document.querySelector(".cart");
const cartPanel = document.querySelector(".cart-panel");
const cartClose = document.querySelector(".cart-close");
const cartOverlay = document.querySelector(".cart-overlay");


// OPEN CART

cartButton.addEventListener("click", (e) => {

    e.preventDefault();

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

});


// CLOSE CART

cartClose.addEventListener("click", () => {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

});


// CLOSE CART WHEN CLICKING OVERLAY

cartOverlay.addEventListener("click", () => {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

});
