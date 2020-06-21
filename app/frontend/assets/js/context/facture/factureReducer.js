import {
    OPEN_DIALOG_FACTURE,
    CLOSE_DIALOG_FACTURE,
    ADD_FACTURE,
    UPDATE_FACTURE,
    DELETE_FACTURE,
    SET_FACTURE,
    CLEAR_FACTURE,
    CLEAR_FILTER_FACTURE,
    CLEAR_FACTURES,
    FILTER_FACTURES,
    GET_FACTURES,
    FACTURE_ERROR

} from '../types';
export default (state,action)=>{
    switch (action.type) {

         case GET_FACTURES:
            return {
                ...state,
                factures: action.payload,

            };

        case ADD_FACTURE:
            return {
                ...state,
                factures: [action.payload,...state.factures],
                // open:false
            };
        case UPDATE_FACTURE:
            return {
                ...state,
                factures: state.factures.map(facture =>
                    facture.id === action.payload.id ? action.payload : facture
                ),
                // open:false
            };
        case DELETE_FACTURE:
            return {
                ...state,
                factures: state.factures.filter(
                    facture => facture.id !== action.payload
                )
            };

        case SET_FACTURE:
            return {
                ...state,
                facture: action.payload
            };
        case CLEAR_FACTURE:
            return {
                ...state,
                facture: null
            };
        case FILTER_FACTURES:
            return {
                ...state,
                filtered: state.factures.filter(facture => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return facture.num_facture.match(regex)  ;
                })
            };
        case CLEAR_FILTER_FACTURE:
            return {
                ...state,
                filtered: null
            };

        case OPEN_DIALOG_FACTURE:
            return {
                ...state,
                openFacture:true
            };
        case CLOSE_DIALOG_FACTURE:
            return {
                ...state,
                openFacture:false
            };

            case FACTURE_ERROR:
           // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
    }
}