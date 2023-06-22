import { createSlice } from '@reduxjs/toolkit';

//This function normalizes the data
function utilityProviderInterface(item){
    return {
        id: item.utilityProviderId,
        location: item.location,
        utilityProviderName: item.utilityProviderName,
        utilityProviders: item.utilityProviders,
        designConditions: item.designConditions,
        dwellingInfo: item.dwellingInfo,
        workscope: item.workscope,
        dateCreated: item.dateCreated
    }
}

export const utilityProviderSlice = createSlice({
    name: 'utilityProviders',
    initialState: {
        list: [],
    },
    reducers: {
        setUtilityProviders: (state, action) => {
            state.list = action.payload.map( item => {
                return utilityProviderInterface(item)
            })
        },
        // addUtilityProvider: (state, action) => {
        //     const newItem = utilityProviderInterface(action.payload)
        //     state.list = [ newItem , ...state.list ];
        // },
        // updateUtilityProvider: (state, action) => {
        //     const itemUpdated = utilityProviderInterface(action.payload)
        //     state.list = state.list.map( item => item.id === itemUpdated.id ? itemUpdated : item );
        // },
        // removeUtilityProvider: (state, action) => {
        //     state.list = state.list.filter( item => item.id !== action.payload );
        // }
    }
})

export const {
    setUtilityProviders,
    addUtilityProvider,
    updateUtilityProvider,
    removeUtilityProvider
} = utilityProviderSlice.actions

export default utilityProviderSlice.reducer