import axios from "axios"
const baseURL = "https://indonesia-covid-19.mathdro.id/api/";
const client = axios.create({
    baseURL: baseURL,
    timeout: 3000
})

export default {
    getHarian(){
        return client.get("/harian")
    },
    getProvinsi(){
        return client.get("/provinsi")
    }
    
}