import { showError, fetchImages } from "./js/pixabay-api.js";
import { renderGallery, showLoader, hideLoader, clearGallery } from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const input = document.querySelector(".input");
const loadMore = document.querySelector(".js-load-more");
loadMore.style.display = "none";

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearGallery();
    const query = input.value.trim();
    if (query.length === 0) {
        showError();
        loadMore.style.display = "none";
        return;
    }

    showLoader();
    input.value = "";

    try {
        const images = await fetchImages(query);
        renderGallery(images);
    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }
});
