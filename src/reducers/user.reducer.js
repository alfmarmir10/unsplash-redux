import { types } from "../types/types";

const initialState = {
    displayName: "",
    email: "",
    uid: "",
    photoURL: ""
};

export const userReducer = (state = initialState, action) => {
    // console.log("PAYLOAD: "+action.payload);
    switch(action.type){
        case types.setUser:
            return{
                displayName: action.payload.displayName,
                email: action.payload.email,
                uid: action.payload.uid,
                photoURL: action.payload.photoURL
            }
        case types.signOutUser:
            return{
                displayName: "",
                email: "",
                uid: "",
                photoURL: ""
            }
        default:
            return state
    }
}
