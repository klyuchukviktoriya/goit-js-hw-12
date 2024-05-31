import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let lightbox;

export function renderGallery(images) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = images.map(image => createImageCard(image)).join("");
    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });
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