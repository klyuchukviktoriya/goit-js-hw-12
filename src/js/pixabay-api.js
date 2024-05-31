import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
export function showError(message) {
    iziToast.error({
        icon: "",
        backgroundColor: "#ef4040",
        position: "topRight",
        message: "Oh, shit! Type something",
        messageColor: "white",
    });
}
export function fetchImages(query) {
    const BASE_URL = "https://pixabay.com/api/";

    const params = new URLSearchParams({
        key: "44041025-2e091a4b621ea033778029d2c",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    })

    const url = `${BASE_URL}?${params}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    icon: "",
                    backgroundColor: "#ef4040",
                    position: "topRight",
                    message: "&#11198; Sorry, there are no images matching your search query. Please, try again!",
                    messageColor: "white",
                })
            } else {
                return data.hits;
            }
        })
        .catch(error => console.log(error));
}