import { types } from "../types/types";

const initialState = {
    displayName: "",
    email: "",
    uid: "",
    photoURL: "",
    loved:{
        ids:[],
        objs:{}
    }
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
        case types.setLoved:
            return{
                ...state,
                loved:{
                    ...state.loved,
                    ids: [...state.loved.ids, action.payload.id],
                    objs:{
                        ...state.loved.objs,
                        [action.payload.id]: action.payload.obj
                    }
                }
            }
        case types.removeLoved:
            return{
                ...state,
                loved:{
                    ...state.loved, 
                    ids: state.loved.ids.filter(item => item!==action.payload.id),
                    objs:{
                        ...state.loved.objs,
                        [action.payload.id]: ""
                    }
                }
            }
        default:
            return state
    }
}
