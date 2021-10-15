import ClientId from "../credentials";
import { types } from "../types/types";

export const setHomePhotos = (payload) => ({
    type: types.setHomePhotos,
    payload
})

export const setViewingPhoto = (payload) => ({
    type: types.setViewingPhoto,
    payload
})

export const setViewingPhotoStatistics = (payload) => ({
    type: types.setViewingPhotoStatistics,
    payload
})

export const fetchHomePhotos = (payload) => {
    return async (dispatch) => {
        try {
            let url = "";
            if(payload === "Home"){
                url = `https://api.unsplash.com/photos?client_id=${ClientId}`
            } else {
                url = `https://api.unsplash.com/topics/${payload}/photos?client_id=${ClientId}`
            }
            const response = await fetch(url);
            const obj = await response.json();
            // console.log(obj);
            localStorage.setItem('homePhotos', JSON.stringify(obj));
            dispatch(setHomePhotos(obj));
        } catch (error) {
            console.error(error);
        }
    }
}

export const fetchPhotoStatistics = (payload) => {
    return async (dispatch) => {
        try {
            const url = `https://api.unsplash.com/photos/${payload}/statistics?client_id=${ClientId}`
            const response = await fetch(url);
            const obj = await response.json();
            // console.log(obj);
            localStorage.setItem('viewingPhotoStats', JSON.stringify(obj));
            dispatch(setViewingPhotoStatistics(obj));
        } catch (error) {
            console.error(error);
        }
    }
}

export const setTopics = (payload) => ({
    type: types.setTopics,
    payload
})

export const fetchTopics = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://api.unsplash.com/topics?client_id=${ClientId}`);
            const obj = await response.json();
            console.log(obj);
            localStorage.setItem('topics', JSON.stringify(obj));
            dispatch(setTopics(obj));
        } catch (error) {
            console.error(error);
        }
    }
}

export const setActiveTopic = (payload) => ({
    type: types.setActiveTopic,
    payload
})
