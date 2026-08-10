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


