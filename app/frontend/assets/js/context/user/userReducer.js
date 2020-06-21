import {
    FORMULAIRE_ERROR, GET_FORMULAIRES,

    GET_USER_FORMULAIRES,

} from '../types';

export default (state,action)=>{
    switch (action.type) {
        case GET_USER_FORMULAIRES:
            return {
                ...state,
                formulaires: action.payload,

            };

        default:
            return state;
    }
}
