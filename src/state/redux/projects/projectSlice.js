import { createSlice } from '@reduxjs/toolkit';

//This function normalizes the data
function projectInterface(item){
    return {
        id: item.projectId,
        location: item.location,
        projectName: item.projectName,
        utilityProviders: item.utilityProviders,
        designConditions: item.designConditions,
        dwellingInfo: item.dwellingInfo,
        workscope: item.workscope,
        dateCreated: item.dateCreated
    }
}

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        list: [],
    },
    reducers: {
        setProjects: (state, action) => {
            state.list = action.payload.map( item => {
                return projectInterface(item)
            })
        },
        addProject: (state, action) => {
            const newItem = projectInterface(action.payload)
            state.list = [ newItem , ...state.list ];
        },
        updateProject: (state, action) => {
            const itemUpdated = projectInterface(action.payload)
            state.list = state.list.map( item => item.id === itemUpdated.id ? itemUpdated : item );
        },
        removeProject: (state, action) => {
            state.list = state.list.filter( item => item.id !== action.payload );
        }
    }
})

export const {
    setProjects,
    addProject,
    updateProject,
    removeProject
} = projectSlice.actions

export default projectSlice.reducer

// const url = import.meta.env.VITE_URL_BACKEND_CONTRACTORS;

// //POST
// export const postProject = (data) => (dispatch) => {
//     dispatch(setLoadingPost(true))
//     fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers:{
//             // Accept: 'application/json',
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//     .catch(error => {
//         dispatch(setErrorPost(error))
//         console.log("Error: ", error)
//     })
//     .then(response => {
//         dispatch(addProject(response));
//         console.log(response, "response post")
//     })
//     .finally(() => dispatch(setLoadingPost(false)))
// }

// //PUT
// export const putProject = (data) => (dispatch) => {
//     dispatch(setLoadingPut(true))
//     let currentUrl = url + "/" + data.id
//     fetch(currentUrl, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//         headers:{
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//     .catch(error => {
//         dispatch(setErrorPut(error))
//         console.log("Error: ", error)
//     })
//     .then(response => {
//         dispatch(updateProject(response));
//         console.log(response, "response put")
//     })
//     .finally(() => dispatch(setLoadingPut(false)))
// }

// //DELETE
// export const deleteProject = (id) => (dispatch) => {
//     dispatch(setLoadingDelete(true))
//     const currentUrl = url + "/" + id
//     fetch(currentUrl, {
//         method: 'DELETE',
//         // body: JSON.stringify({}),
//         headers:{
//             'Content-Type': 'application/json'
//         }
//     }).then(res => res.json())
//     .catch(error => {
//         dispatch(setErrorDelete(error))
//         console.log("Error: ", error)
//     })
//     .then(response => {
//         dispatch(removeProject(id));
//         console.log(response, "response post")
//     })
//     .finally(() => dispatch(setLoadingDelete(false)))
// }