import axios from "axios";


const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server Timed Out",
    headers: {
        "Content-Type": "application/json"
    }
})

AxiosInstance.interceptors.response.use(
    (response)=>{
        
        return response.data
    },
    (exception)=>{
        if(exception.code === "ERR_BAD_REQUEST"){
            throw exception.response.data
        }else{
        console.log("ResponseIntercep: ", exception)
        throw exception
        
        }
    }
)

export default AxiosInstance