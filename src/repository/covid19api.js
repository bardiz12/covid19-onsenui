import axios from "axios"
const baseURL = "https://covid19.mathdro.id/api/";
const client = axios.create({
    baseURL: baseURL,
    timeout: 3000
})

export default {
    getConfirmed(country){
        return client.get("/countries/" + country + "/confirmed")
    }
}