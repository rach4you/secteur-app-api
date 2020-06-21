import {
    OPEN_SNACK,
    CLOSE_SNACK, SET_SNACK
} from '../types';
export default (state,action)=>{
    switch (action.type) {
        case OPEN_SNACK:
            return {
                ...state,
                open:true
            };
        case CLOSE_SNACK:
            return {
                ...state,
                open:false
            };

        case SET_SNACK:
            return {
                ...state,
                snack: action.payload,
                open:true
            };
        default:
            return state;
    }
}