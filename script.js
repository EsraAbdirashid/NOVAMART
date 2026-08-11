// ======================================================
// NOVAMART - MAIN JAVASCRIPT
// ======================================================


// ======================================================
// MOBILE MENU
// ======================================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

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

}


// ======================================================
// CART
// ======================================================

let cartProducts = [];

const cartButton = document.querySelector(".cart");
const cartPanel = document.querySelector(".cart-panel");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");

const cartCountElement = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total strong");


// ======================================================
// OPEN CART
// ======================================================

if (cartButton && cartPanel && cartOverlay) {

    cartButton.addEventListener("click", (event) => {

        event.preventDefault();

        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");

    });

}


// ======================================================
// CLOSE CART
// ======================================================

function closeCart() {

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }

}


if (cartClose) {
    cartClose.addEventListener("click", closeCart);
}


if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
}


// ======================================================
// ADD TO CART
// ======================================================

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        if (!productCard) return;


        const productName =
            productCard.querySelector(".product-info h3").textContent.trim();


        const productPriceText =
            productCard.querySelector(".product-bottom strong").textContent.trim();


        const productImage =
            productCard.querySelector(".product-image img").src;


        const price = parseFloat(
            productPriceText
                .replace("$", "")
                .replace(",", "")
        );


        cartProducts.push({

            name: productName,
            price: price,
            image: productImage

        });


        updateCart();


        // BUTTON ANIMATION

        button.style.transform = "scale(1.15)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        }, 200);

    });

});


// ======================================================
// UPDATE CART
// ======================================================

function updateCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    let total = 0;


    cartProducts.forEach((product, index) => {

        total += product.price;


        const item = document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <strong>
                    $${product.price.toFixed(2)}
                </strong>

                <button
                    class="remove-cart-item"
                    data-index="${index}"
                    title="Remove"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    if (cartTotal) {

        cartTotal.textContent =
            `$${total.toFixed(2)}`;

    }


    // CART COUNT

    if (cartCountElement) {

        cartCountElement.textContent =
            cartProducts.length;

    }


    // EMPTY CART

    if (cartProducts.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

    }


    // REMOVE BUTTONS

    const removeButtons =
        document.querySelectorAll(".remove-cart-item");


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            cartProducts.splice(index, 1);


            updateCart();

        });

    });

}


// ======================================================
// CHECKOUT
// ======================================================

const checkoutBtn =
    document.querySelector(".checkout-btn");

const checkoutModal =
    document.querySelector("#checkoutModal");

const checkoutClose =
    document.querySelector("#checkoutClose");

const checkoutOk =
    document.querySelector("#checkoutOk");


if (checkoutBtn && checkoutModal) {

    checkoutBtn.addEventListener("click", () => {


        // EMPTY CART

        if (cartProducts.length === 0) {

            checkoutModal.querySelector("h2").textContent =
                "Your Cart Is Empty!";


            checkoutModal.querySelector("p").innerHTML =
                "Please add a product to your cart before checkout.";


            checkoutModal.querySelector(
                ".checkout-success-icon"
            ).innerHTML =
                '<i class="fa-solid fa-cart-shopping"></i>';


            if (checkoutOk) {
                checkoutOk.textContent = "OK";
            }


            checkoutModal.classList.add("active");

            return;

        }


        // ORDER CONFIRMED

        checkoutModal.querySelector("h2").textContent =
            "Order Confirmed!";


        checkoutModal.querySelector("p").innerHTML =
            'Thank you for shopping with <strong>NovaMart</strong>. Your order has been successfully placed.';


        checkoutModal.querySelector(
            ".checkout-success-icon"
        ).innerHTML =
            '<i class="fa-solid fa-check"></i>';


        if (checkoutOk) {
            checkoutOk.textContent = "OK";
        }


        checkoutModal.classList.add("active");

    });

}


// CLOSE CHECKOUT

if (checkoutClose && checkoutModal) {

    checkoutClose.addEventListener("click", () => {

        checkoutModal.classList.remove("active");

    });

}


if (checkoutOk && checkoutModal) {

    checkoutOk.addEventListener("click", () => {

        checkoutModal.classList.remove("active");

    });

}


// ======================================================
// PRODUCT SEARCH
// ======================================================

const searchInput =
    document.querySelector("#searchInput");

const searchButton =
    document.querySelector("#searchButton");

const productsGrid =
    document.querySelector(".products-grid");

const productCards =
    Array.from(document.querySelectorAll(".product-card"));


// SEARCH FUNCTION

function searchProducts() {

    if (!searchInput) return;


    const searchValue =
        searchInput.value.trim().toLowerCase();


    let foundProducts = 0;


    // SHOW ALL

    if (searchValue === "") {

        productCards.forEach((card) => {

            card.style.display = "";

        });


        removeNoProductsMessage();

        return;

    }


    // SEARCH

    productCards.forEach((card) => {

        const productName =
            card.querySelector(".product-info h3")
                .textContent
                .toLowerCase();


        if (productName.includes(searchValue)) {

            card.style.display = "";

            foundProducts++;

        } else {

            card.style.display = "none";

        }

    });


    // NO PRODUCT

    if (foundProducts === 0) {

        showNoProductsMessage();

    } else {

        removeNoProductsMessage();

    }

}


// SEARCH BUTTON

if (searchButton) {

    searchButton.addEventListener("click", () => {

        searchProducts();

        const productsSection =
            document.querySelector("#products");


        if (productsSection) {

            productsSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// ENTER KEY

if (searchInput) {

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            searchProducts();

            const productsSection =
                document.querySelector("#products");


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });


    // LIVE SEARCH

    searchInput.addEventListener("input", () => {

        searchProducts();

    });

}


// NO PRODUCTS MESSAGE

function showNoProductsMessage() {

    if (!productsGrid || !searchInput) return;


    removeNoProductsMessage();


    const message =
        document.createElement("div");


    message.className =
        "no-products";


    message.innerHTML = `

        <i class="fa-solid fa-magnifying-glass"></i>

        <h3>No Products Found</h3>

        <p>
            We couldn't find any product matching
            "${searchInput.value}".
        </p>

        <button class="clear-search">
            Clear Search
        </button>

    `;


    productsGrid.appendChild(message);


    message
        .querySelector(".clear-search")
        .addEventListener("click", () => {

            searchInput.value = "";

            searchProducts();

            searchInput.focus();

        });

}


// REMOVE MESSAGE

function removeNoProductsMessage() {

    const message =
        document.querySelector(".no-products");


    if (message) {

        message.remove();

    }

}


// ======================================================
// WISHLIST
// ======================================================

const wishlistBtn =
    document.querySelector("#wishlistBtn");

const wishlistPanel =
    document.querySelector(".wishlist-panel");

const wishlistClose =
    document.querySelector("#wishlistClose");

const wishlistOverlay =
    document.querySelector(".wishlist-overlay");

const wishlistItems =
    document.querySelector(".wishlist-items");

const wishlistCountElement =
    document.querySelector(".wishlist-count");

const wishlistButtons =
    document.querySelectorAll(".add-to-wishlist");


let wishlistProducts = [];


// ======================================================
// OPEN WISHLIST
// ======================================================

if (wishlistBtn && wishlistPanel && wishlistOverlay) {

    wishlistBtn.addEventListener("click", (e) => {

        e.preventDefault();

        wishlistPanel.classList.add("active");

        wishlistOverlay.classList.add("active");

    });

}


// ======================================================
// CLOSE WISHLIST
// ======================================================

function closeWishlist() {

    if (wishlistPanel) {

        wishlistPanel.classList.remove("active");

    }


    if (wishlistOverlay) {

        wishlistOverlay.classList.remove("active");

    }

}


if (wishlistClose) {

    wishlistClose.addEventListener(
        "click",
        closeWishlist
    );

}


if (wishlistOverlay) {

    wishlistOverlay.addEventListener(
        "click",
        closeWishlist
    );

}


// ======================================================
// ADD TO WISHLIST
// ======================================================

wishlistButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");


        if (!productCard) return;


        const productName =
            productCard
                .querySelector(".product-info h3")
                .textContent
                .trim();


        const productPrice =
            productCard
                .querySelector(".product-bottom strong")
                .textContent
                .trim();


        const productImage =
            productCard
                .querySelector(".product-image img")
                .src;


        const alreadyExists =
            wishlistProducts.some(
                (product) =>
                    product.name === productName
            );


        // REMOVE

        if (alreadyExists) {

            wishlistProducts =
                wishlistProducts.filter(
                    (product) =>
                        product.name !== productName
                );


            button.classList.remove("active");

        }


        // ADD

        else {

            wishlistProducts.push({

                name: productName,
                price: productPrice,
                image: productImage

            });


            button.classList.add("active");

        }


        updateWishlist();

    });

});


// ======================================================
// UPDATE WISHLIST
// ======================================================

function updateWishlist() {

    if (!wishlistItems) return;


    wishlistItems.innerHTML = "";


    if (wishlistCountElement) {

        wishlistCountElement.textContent =
            wishlistProducts.length;

    }


    // EMPTY

    if (wishlistProducts.length === 0) {

        wishlistItems.innerHTML = `

            <p class="empty-wishlist">
                Your wishlist is empty.
            </p>

        `;

        return;

    }


    // PRODUCTS

    wishlistProducts.forEach((product, index) => {

        const item =
            document.createElement("div");


        item.classList.add(
            "wishlist-item"
        );


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="wishlist-item-info">

                <h3>${product.name}</h3>

                <strong>${product.price}</strong>

            </div>


            <button
                class="wishlist-add-cart"
                data-index="${index}"
                title="Add to cart"
            >
                <i class="fa-solid fa-cart-plus"></i>
            </button>


            <button
                class="remove-wishlist-item"
                data-index="${index}"
                title="Remove"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        `;


        wishlistItems.appendChild(item);

    });


    // REMOVE WISHLIST

    document
        .querySelectorAll(".remove-wishlist-item")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                const removedProduct =
                    wishlistProducts[index];


                wishlistProducts.splice(index, 1);


                // RESET HEART

                wishlistButtons.forEach((heart) => {

                    const card =
                        heart.closest(".product-card");


                    if (!card) return;


                    const name =
                        card.querySelector(
                            ".product-info h3"
                        ).textContent.trim();


                    if (
                        name === removedProduct.name
                    ) {

                        heart.classList.remove(
                            "active"
                        );

                    }

                });


                updateWishlist();

            });

        });


    // ADD WISHLIST PRODUCT TO CART

    document
        .querySelectorAll(".wishlist-add-cart")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                const product =
                    wishlistProducts[index];


                productCards.forEach((card) => {

                    const name =
                        card.querySelector(
                            ".product-info h3"
                        ).textContent.trim();


                    if (name === product.name) {

                        const cartBtn =
                            card.querySelector(
                                ".add-to-cart"
                            );


                        if (cartBtn) {

                            cartBtn.click();

                        }

                    }

                });

            });

        });

}


// ======================================================
// COMPARE
// ======================================================

// IMPORTANT:
// Waxaan isticmaalay .compare-product iyo .compare-btn
// labadaba si HTML-kaaga hadda jira uu u shaqeeyo.

const compareButtons =
    document.querySelectorAll(
        ".compare-product, .compare-btn"
    );


const compareNav =
    document.querySelector(".compare");


const comparePanel =
    document.querySelector(".compare-panel");


const compareClose =
    document.querySelector(".compare-close");


const comparisonTable =
    document.querySelector(".comparison-table");


const clearCompare =
    document.querySelector(".clear-compare");


const compareCount =
    document.querySelector(".compare-count");


const emptyCompare =
    document.querySelector(".empty-compare");


let compareProducts = [];


// ======================================================
// OPEN COMPARE
// ======================================================

function openCompare() {

    if (!comparePanel) return;


    comparePanel.classList.add("active");


    if (cartOverlay) {

        cartOverlay.classList.add("active");

    }

}


// ======================================================
// CLOSE COMPARE
// ======================================================

function closeCompare() {

    if (!comparePanel) return;


    comparePanel.classList.remove("active");


    if (cartOverlay) {

        cartOverlay.classList.remove("active");

    }

}


// ======================================================
// NAVBAR COMPARE BUTTON
// ======================================================

if (compareNav) {

    compareNav.addEventListener("click", (event) => {

        event.preventDefault();

        updateCompare();

        openCompare();

    });

}


// ======================================================
// CLOSE COMPARE
// ======================================================

if (compareClose) {

    compareClose.addEventListener(
        "click",
        closeCompare
    );

}


// ======================================================
// ADD PRODUCT TO COMPARE
// ======================================================

compareButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");


        if (!productCard) return;


        const productName =
            productCard
                .querySelector(".product-info h3")
                .textContent
                .trim();


        const productPrice =
            productCard
                .querySelector(".product-bottom strong")
                .textContent
                .trim();


        const productImage =
            productCard
                .querySelector(".product-image img")
                .src;


        // CHECK DUPLICATE

        const alreadyAdded =
            compareProducts.some(
                (product) =>
                    product.name === productName
            );


        // IF ALREADY ADDED

        if (alreadyAdded) {

            openCompare();

            return;

        }


        // MAXIMUM 3

        if (compareProducts.length >= 3) {

            alert(
                "You can compare up to 3 products."
            );

            openCompare();

            return;

        }


        // ADD PRODUCT

        compareProducts.push({

            name: productName,
            price: productPrice,
            image: productImage

        });


        button.classList.add("active");
        
        updateCompare();

        // OPEN PANEL

        openCompare();

    });

});

// UPDATE COMPARE

function updateCompare() {

    if (!comparisonTable) return;


    comparisonTable.innerHTML = "";


    // EMPTY

    if (compareProducts.length === 0) {

        if (emptyCompare) {

            emptyCompare.style.display =
                "block";

        }

        if (compareCount) {

            compareCount.textContent =
                "0 products selected";

        }


        updateCompareButtons();

        return;

    }

    // HIDE EMPTY

    if (emptyCompare) {

        emptyCompare.style.display =
            "none";

    }


    // COUNT

    if (compareCount) {

        compareCount.textContent =
            `${compareProducts.length} product${compareProducts.length > 1 ? "s" : ""} selected`;

    }

    // CREATE PRODUCT COLUMNS

    compareProducts.forEach((product, index) => {

        const column =
            document.createElement("div");


        column.classList.add(
            "comparison-product"
        );


        column.innerHTML = `

            <button
                class="remove-compare"
                data-index="${index}"
                aria-label="Remove product"
                title="Remove"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>


            <div class="comparison-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <h3>
                ${product.name}
            </h3>


            <strong class="comparison-price">
                ${product.price}
            </strong>


            <div class="comparison-details">

                <div>
                    <span>Rating</span>
                    <b>★★★★★</b>
                </div>


                <div>
                    <span>Availability</span>
                    <b class="in-stock">
                        In Stock
                    </b>
                </div>


                <div>
                    <span>Quality</span>
                    <b>
                        Premium
                    </b>
                </div>

            </div>

        `;


        comparisonTable.appendChild(column);

    });


    // REMOVE PRODUCT FROM COMPARE

    document
        .querySelectorAll(".remove-compare")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                compareProducts.splice(
                    index,
                    1
                );


                updateCompare();

                updateCompareButtons();

            });

        });


    updateCompareButtons();

}


// RESET COMPARE BUTTONS

function updateCompareButtons() {

    compareButtons.forEach((button) => {

        const productCard =
            button.closest(".product-card");


        if (!productCard) return;

        const productName =
            productCard
                .querySelector(".product-info h3")
                .textContent
                .trim();

        const exists =
            compareProducts.some(
                (product) =>
                    product.name === productName
            );

        button.classList.toggle(
            "active",
            exists
        );

    });

}

// CLEAR ALL COMPARE

if (clearCompare) {

    clearCompare.addEventListener("click", () => {

        compareProducts = [];

        updateCompare();

        updateCompareButtons();

    });

}

// CLOSE COMPARE WHEN OVERLAY IS CLICKED

if (cartOverlay) {

    cartOverlay.addEventListener("click", () => {

        if (
            comparePanel &&
            comparePanel.classList.contains("active")
        ) {

            closeCompare();

        }

    });

}

// NEWSLETTER

const newsletterForm =
    document.querySelector(".newsletter-form");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();
            const emailInput =
                newsletterForm.querySelector(
                    'input[type="email"]'
                );

            if (!emailInput) return;

            alert(
                "Thank you for subscribing to NovaMart!"
            );


            newsletterForm.reset();

        }
    );

}

// INITIAL UPDATE 

updateCart();
updateWishlist();
updateCompare();


// ========= SPECIAL OFFER SHOP NOW ======

const offerCartButtons =
    document.querySelectorAll(".offer-cart-btn");

offerCartButtons.forEach((button) => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        const productName =
            button.dataset.product;

        const productPrice =
            parseFloat(button.dataset.price);

        const productImage =
            button.dataset.image;

        // ADD PRODUCT TO CART

        cartProducts.push({
            name: productName,
            price: productPrice,
            image: productImage
        });

        // UPDATE CART COUNT

        cartCount =
            cartProducts.length;
        cartCountElement.textContent =
            cartCount;

        // UPDATE CART CONTENT

        updateCart();

        // OPEN CART PANEL
        
        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");
    });
});