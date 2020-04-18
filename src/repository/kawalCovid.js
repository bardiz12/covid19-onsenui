
import axios from "axios"
const baseURL = "https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/";
const client = axios.create({
    baseURL: baseURL,
    timeout: 3000,
})

export default {
    getAllProvince(){
        return client.get("indonesia/provinsi")
    }
}