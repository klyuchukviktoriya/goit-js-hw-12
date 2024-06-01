import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
export function showError() {
    iziToast.error({
        icon: "",
        backgroundColor: "#ef4040",
        position: "topRight",
        message: "Oh, shit! Type something",
        messageColor: "white",
    });
}

export async function fetchImages(query, page = 1) {

    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: "44041025-2e091a4b621ea033778029d2c",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 15,
    })

    try {
        const { data } = await axios(`${BASE_URL}?${params}`)
        if (data.hits.length === 0) {
            iziToast.error({
                icon: "",
                backgroundColor: "#ef4040",
                position: "topRight",
                message: "&#11198; Sorry, there are no images matching your search query. Please, try again!",
                messageColor: "white",
            })

        } else {
            // return { totalHits: data.totalHits, images: data.hits }
            return data.hits;
        }
    }
    catch (error) {
        console.error(error.message);
    }

}
