import summary from "@/common/summaryAPI";
import Axios from "./Axios";
const fetchUserDetails = async() =>{
    try {
        const response = await Axios({
            ...summary.user_details,
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails