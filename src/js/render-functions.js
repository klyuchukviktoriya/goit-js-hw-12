import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from "./pixabay-api.js";

let lightbox;
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".js-load-more");

export function renderGallery(images) {
    gallery.innerHTML = images.map(image => createImageCard(image)).join("");
    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });
    }
    loadMore.style.display = "block";
}

// -----------------------------------------------------------------

loadMore.addEventListener("click", onLoadMore);

let page = 1;

export async function onLoadMore() {
    page += 1;
    showLoader();
    try {
        const data = await fetchImages(page);
        if (!data) {
            hideLoader();
            iziToast.error({
                icon: "",
                backgroundColor: "blue",
                position: "topRight",
                message: "&#11198; We're sorry, but you've reached the end of search results.",
                messageColor: "white",
            });
            loadMore.style.display = "none";
            return;
        }

        gallery.insertAdjacentHTML("beforeend", data.map(image => createImageCard(image)).join(""));
        if (lightbox) {
            lightbox.refresh();
        }

        const lastCard = gallery.lastElementChild;
        const cardHeight = lastCard.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        });

        if (page >= totalHits) {
            loadMore.style.display = "none";
            iziToast.error({
                icon: "",
                backgroundColor: "blue",
                position: "topRight",
                message: "&#11198; We're sorry, but you've reached the end of search results.",
                messageColor: "white",
            });
        }

    } catch (error) {
        console.error(error.message);
    } finally {
        hideLoader();
    }
}

function createImageCard(image) {
    return `
    <div class="photo-card">
      <a class="link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
        <li><h3 class="info-title">Likes</h3><p class="info-text">${image.likes}</p></li>
        <li><h3 class="info-title">Views</h3><p class="info-text">${image.views}</p></li>
        <li><h3 class="info-title">Comments</h3><p class="info-text">${image.comments}</p></li>
        <li><h3 class="info-title">Downloads</h3><p class="info-text">${image.downloads}</p></li>
      </div>
      </a>
    </div>
  `;
}

export function showLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
}

export function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
}

export function clearGallery() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
}