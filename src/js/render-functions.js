import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages, currentQuery } from "./pixabay-api.js";

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
    if (images.length > 0 && images.length < 14) {
        loadMore.style.display = "none";
    } else {
        loadMore.style.display = "block";
    }

}

export function updateGallery(images) {
    gallery.insertAdjacentHTML("beforeend", images.map(image => createImageCard(image)).join(""));
    if (lightbox) {
        lightbox.refresh();
    }
}

loadMore.addEventListener("click", onLoadMore);

let page = 1;

export async function onLoadMore() {

    if (!currentQuery) {
        return;
    }

    page += 1;
    showLoader();

    try {

        const images = await fetchImages(currentQuery, page);

        if (!images || images.length === 0) {
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

        updateGallery(images);

        const lastCard = gallery.lastElementChild;
        const cardHeight = lastCard.getBoundingClientRect().height;

        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        });


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
    page = 1;
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
}
