import { baseURL } from "@/common/summaryAPI"
import axios from "axios"

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})

export default Axios