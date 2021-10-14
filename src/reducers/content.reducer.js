import { types } from "../types/types";

const  initialState = {
    homePhotos:""
}

export const contentReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.setHomePhotos:
            return {
                ...state,
                homePhotos: action.payload
            }   
    
        default:
            return state;
    }
} 