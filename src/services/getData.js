import { getUrl } from "./api/getUrl";
import { setProjects } from "../state/redux/projects/projectSlice";

export const getData = (src) => (dispatch) => {
    let loading = true
    let errorGet = null
    const abortController = new AbortController();

    fetch( getUrl(src), {
        method: 'GET',
        signal: abortController.signal,
        headers: {
            Accept: 'application/json',
            // 'accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        }
        // body: JSON.stringify({})
    })
    .then( response => response.json())
    .then( data => dispatch(setProjects(data)))
    .catch( error => {
        if(error.name === "AbortError") {
            console.log("Request cancelled");
        } else {
            errorGet = error
            console.log(error)
        }
    })
    .finally(() => loading = false)
    
    //in test, this function cancels the request
    const handleCancelRequest = () => {
        if(abortController){
            abortController.abort();
            errorGet = "Request cancelled";
        }
    }
    return { loading, errorGet, handleCancelRequest }
}