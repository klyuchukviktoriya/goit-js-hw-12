import { showError, fetchImages } from "./js/pixabay-api.js";
import { renderGallery, showLoader, hideLoader, clearGallery } from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const input = document.querySelector(".input");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearGallery()
    const query = input.value.trim();
    if (!query) {
        showError();
        return;
    }

    showLoader();
    input.value = "";
    fetchImages(query)
        .then(images => {
            renderGallery(images);
        })
        .catch(error => {
            showError(message, error);
        })
        .finally(() => {
            hideLoader();
        });
});