// src/index.js


const BASE_URL = "http://localhost:3000";


const cakeName = document.querySelector("#cake-name");
const cakeImage = document.querySelector("#cake-image");
const cakeDescription = document.querySelector("#cake-description");
const cakeList = document.querySelector("#cake-list");
const reviewList = document.querySelector("#review-list");
const descriptionForm = document.querySelector("#description-form");
const reviewForm = document.querySelector("#review-form");


function fetchAndDisplayFirstCake() {
    fetch(`${BASE_URL}/cakes/1`)
        .then((response) => response.json())
        .then((cake) => {
            displayCakeDetails(cake);
        });
}

function displayCakeDetails(cake) {
    cakeName.textContent = cake.name;
    cakeImage.src = cake.image_url;
    cakeImage.alt = cake.name;
    cakeDescription.textContent = cake.description;
    renderReviews(cake.reviews);
}


function renderReviews(reviews) {
    reviewList.innerHTML = "";
    reviews.forEach((review) => {
        const reviewItem = document.createElement("li");
        reviewItem.textContent = review;
        reviewItem.addEventListener("click", () => {
            reviewItem.remove();
        });
        reviewList.appendChild(reviewItem);
    });
}


function fetchAndDisplayCakeMenu() {
    fetch(`${BASE_URL}/cakes`)
        .then((response) => response.json())
        .then((cakes) => {
            cakeList.innerHTML = "";
            cakes.forEach((cake) => {
                const menuItem = document.createElement("li");
                menuItem.textContent = cake.name;
                menuItem.addEventListener("click", () => {
                    fetchAndDisplayCakeById(cake.id);
                });
                cakeList.appendChild(menuItem);
            });
        });
}


function fetchAndDisplayCakeById(id) {
    fetch(`${BASE_URL}/cakes/${id}`)
        .then((response) => response.json())
        .then((cake) => {
            displayCakeDetails(cake);
        });
}


function handleDescriptionForm(event) {
    event.preventDefault();
    const newDescription = document.querySelector("#description").value;
    if (newDescription.trim() !== "") {
        fetch(`${BASE_URL}/cakes/1`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ description: newDescription }),
        })
            .then((response) => response.json())
            .then((updatedCake) => {
                cakeDescription.textContent = updatedCake.description;
                descriptionForm.reset();
            });
    }
}


function handleReviewForm(event) {
    event.preventDefault();
    const newReview = document.querySelector("#review").value;
    if (newReview.trim() !== "") {
        const reviewItem = document.createElement("li");
        reviewItem.textContent = newReview;
        reviewItem.addEventListener("click", () => {
            reviewItem.remove();
        });
        reviewList.appendChild(reviewItem);
        reviewForm.reset();
    }
}


function initialize() {
    fetchAndDisplayFirstCake();
    fetchAndDisplayCakeMenu();
    descriptionForm.addEventListener("submit", handleDescriptionForm);
    reviewForm.addEventListener("submit", handleReviewForm);
}

initialize();
