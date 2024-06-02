import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
const loadMore = document.querySelector(".js-load-more");

export function showError() {
    iziToast.error({
        icon: "",
        backgroundColor: "#ef4040",
        position: "topRight",
        message: "Oh, shit! Type something",
        messageColor: "white",
    });
}

export let currentQuery = "";

export async function fetchImages(query, page = 1) {
    currentQuery = query;
    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: "44041025-2e091a4b621ea033778029d2c",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 15,
    });

    try {
        const { data } = await axios(`${BASE_URL}?${params}`);
        const totalHits = data.totalHits;
        if (totalHits === 0) {
            iziToast.error({
                icon: "",
                backgroundColor: "#ef4040",
                position: "topRight",
                message: "&#11198; Sorry, there are no images matching your search query. Please, try again!",
                messageColor: "white",
            });

        } else {
            return data.hits;
        }

    } catch (error) {
        console.error(error.message);
    }
}
