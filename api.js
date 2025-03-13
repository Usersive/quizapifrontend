import axios from "axios"

const api = axios.create({
    baseURL:  "https://djangoreactquizapi.onrender.com"
})

export default api

