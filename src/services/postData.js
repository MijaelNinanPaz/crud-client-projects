import { addProject } from "../state/redux/projects/projectSlice";
import { getUrl } from "./api/getUrl";

const postData = (src, data, setPostStatus, postStatus) => (dispatch) => {
    
    const abortController = new AbortController();

    setPostStatus({
        loading: true,
        error: null,
        controller: abortController
    })

    fetch( getUrl(src), {
        method: 'POST',
        signal: abortController.signal,
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then( response => response.json())
        .then( data => dispatch(addProject(data)))
        .catch( error => {
            if(error.name === "AbortError") {
                console.log("Request cancelled");
            } else {
                setPostStatus({...postStatus, error })
            }
        })
        .finally(() => setPostStatus({...postStatus, loading: false }))

    const handleCancelRequest = () => {
        if(abortController){
            abortController.abort();
            setPostStatus({...postStatus, error: "Request cancelled" });
        }
    }
    return handleCancelRequest
}
export default postData;