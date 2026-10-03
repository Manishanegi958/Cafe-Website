/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   DARK MODE
========================= */

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = darkModeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


/* =========================
   MENU FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class */
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        /* Add active class */
        button.classList.add("active");

        const filter = button.dataset.filter;

        menuCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================
   ORDER MODAL
========================= */

const orderButtons = document.querySelectorAll(".order-btn");

const orderModal = document.getElementById("orderModal");

const closeModal = document.getElementById("closeModal");

const selectedItem = document.getElementById("selectedItem");

let selectedProduct = "";
let selectedPrice = 0;


/* Open modal */

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedProduct = button.dataset.name;
        selectedPrice = Number(button.dataset.price);

        selectedItem.textContent =
            `${selectedProduct} - ₹${selectedPrice}`;

        orderModal.classList.add("show");

    });

});


/* Close modal */

closeModal.addEventListener("click", () => {

    orderModal.classList.remove("show");

});


/* Close modal when clicking outside */

orderModal.addEventListener("click", (event) => {

    if (event.target === orderModal) {

        orderModal.classList.remove("show");

    }

});


/* =========================
   ORDER FORM
========================= */

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

orderForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const customerName =
        document.getElementById("customerName").value.trim();

    const customerPhone =
        document.getElementById("customerPhone").value.trim();

    const quantity =
        Number(document.getElementById("quantity").value);

    if (customerName === "" || customerPhone === "") {

        orderMessage.textContent =
            "Please fill all required details.";

        orderMessage.style.color = "red";

        return;

    }

    const total = selectedPrice * quantity;

    orderMessage.textContent =
        `Thank you ${customerName}! Your order for ${quantity} × ${selectedProduct} has been placed. Total: ₹${total}`;

    orderMessage.style.color = "green";

    orderForm.reset();

});


/* =========================
   RESERVATION FORM
========================= */

const reservationForm =
    document.getElementById("reservationForm");

const formMessage =
    document.getElementById("formMessage");


reservationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;


    /* Basic phone validation */

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {

        formMessage.textContent =
            "Please enter a valid 10-digit phone number.";

        formMessage.style.color = "#ff7777";

        return;

    }


    if (name === "" || date === "" || time === "") {

        formMessage.textContent =
            "Please fill all required fields.";

        formMessage.style.color = "#ff7777";

        return;

    }


    formMessage.textContent =
        `Thank you ${name}! Your table has been reserved for ${date} at ${time}.`;

    formMessage.style.color = "#90ee90";

    reservationForm.reset();

});


/* =========================
   SET MINIMUM RESERVATION DATE
========================= */

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements =
    document.querySelectorAll(
        ".menu-card, .review-card, .contact-box, .feature"
    );


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition = "0.6s ease";

    observer.observe(element);

});

