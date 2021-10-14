import ClientId from "../credentials";
import { types } from "../types/types";

export const setHomePhotos = (payload) => ({
    type: types.setHomePhotos,
    payload
})

export const fetchHomePhotos = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos?client_id=${ClientId}`);
            const obj = await response.json();
            // console.log(obj);
            localStorage.setItem('homePhotos', JSON.stringify(obj));
            dispatch(setHomePhotos(obj));
        } catch (error) {
            console.error(error);
        }
    }
}
