import axios from "axios"

const api = axios.create({
    baseURL: "djangoreactquizapi.onrender.com"
})

export default api

