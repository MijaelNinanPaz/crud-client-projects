import { getUtilityProvidersUrl } from "../api/getUtilityProvidersUrl";
import { addProject } from "../state/redux/projects/projectSlice";

const fetchUtilityProviders = (src, setPostStatus, postStatus) => (dispatch) => {
    
    const abortController = new AbortController();

    setPostStatus({
        loading: true,
        error: null,
        controller: abortController
    })

    fetch( getUtilityProvidersUrl(src), {
        method: 'POST',
        signal: abortController.signal,
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "country": "US",
            "state": "MA"
        })
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
export default fetchUtilityProviders;