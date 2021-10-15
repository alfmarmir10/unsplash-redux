import { types } from "../types/types";

const  initialState = {
    homePhotos:"",
    topics:"",
    activeTopic:"Editorial",
    viewingPhoto:null,
    viewingPhotoStatistics:null
}

export const contentReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.setHomePhotos:
            return {
                ...state,
                homePhotos: action.payload
            }   
        case types.setTopics:
            return {
                ...state,
                topics: action.payload
            }   
    
        case types.setActiveTopic:
            return {
                ...state,
                activeTopic: action.payload
            }   
        
        case types.setViewingPhoto:
            return {
                ...state,
                viewingPhoto: action.payload
            }   
        case types.setViewingPhotoStatistics:
            return {
                ...state,
                viewingPhotoStatistics: action.payload
            }   
    
        default:
            return state;
    }
} 