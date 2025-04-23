const apikey = "fake"
const BASE_URL = "https://fakestoreapi.com/products"

export function get(endpoint) {
    return fetch(BASE_URL + endpoint, {
        headers: {
            "Content-Type": "application/json",
            apikey,
        },
    }).then((response) => response.json());
}

export function callApi(method, endpoint, data) {
    return fetch(BASE_URL + endpoint, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            apikey,
        },
        body: JSON.stringify(data)
    }).then(response => response.json())

}