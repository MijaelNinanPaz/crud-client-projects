import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../state/redux/projects/projectSlice";


export function postData(url, data) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)

    const dispatch = useDispatch();


        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        fetch( url, {
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
                    setError(error)
                }
            })
            .finally(() => setLoading(false))

    const handleCancelRequest = () => {
        if(controller){
            controller.abort();
            setError("Request cancelled");
        }
    }
    return { loading, error, handleCancelRequest }
}