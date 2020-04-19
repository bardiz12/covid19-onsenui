
import axios from "axios"
const baseURL = "https://linebotspam.herokuapp.com/covid/";
const client = axios.create({
    baseURL: baseURL,
    timeout: 10000,
})

export default {
    getAllProvince(){
        return client.get("indonesia/provinsi")
    }
}