import {
    OPEN_DIALOG_PERSONE,
    CLOSE_DIALOG_PERSONE,
    ADD_BENEFICIAIRE,
    UPDATE_BENEFICIAIRE,
    DELETE_BENEFICIAIRE,
    SET_BENEFICIAIRE,
    CLEAR_BENEFICIAIRE,
    CLEAR_FILTER_BENEFICIAIRE,
    CLEAR_BENEFICIAIRES,
    FILTER_BENEFICIAIRES,
    OPEN_DIALOG_BENEFICIER,
    CLOSE_DIALOG_BENEFICIER,
    GET_BENEFICIAIRE,
    ADD_BENEFICIAIRE_FORMULAIRE,
    OPEN_SUIVI_BENEFICIAIRE,
    CLOSE_SUIVI_BENEFICIAIRE,
    OPEN_PAYER_BENEFICIAIRE,
    CLOSE_PAYER_BENEFICIAIRE,
    OPEN_BENEFICIAIRE,
    CLOSE_BENEFICIAIRE,
    GET_BENEFICIAIRES,
    BENEFICIAIRE_ERROR,
    UPDATE_BENEFICIAIRE_FORMULAIRE

} from '../types';

export default (state,action)=>{
    switch (action.type) {


        case GET_BENEFICIAIRES:
            return {
                ...state,
                beneficiaires: action.payload,

            };

        case ADD_BENEFICIAIRE:
            return {
                ...state,
                beneficiaires: [action.payload,...state.beneficiaires],
               // open:false
            };
        case UPDATE_BENEFICIAIRE:
            return {
                ...state,
                beneficiaires: state.beneficiaires.map(beneficiaire =>
                    beneficiaire.id === action.payload.id ? action.payload : beneficiaire
                ),

            };
        case ADD_BENEFICIAIRE_FORMULAIRE:
            return {
                ...state,
                beneficiaires: state.beneficiaires.map(beneficiaire =>{
                    if( beneficiaire.id === action.payload.id) {
                        beneficiaire.formulaires.push(action.payload.formulaire)
                    }
                    return beneficiaire;
                })
            };
        case DELETE_BENEFICIAIRE:
            return {
                ...state,
                beneficiaires: state.beneficiaires.filter(
                    beneficiaire => beneficiaire.id !== action.payload
                )
            };

        case SET_BENEFICIAIRE:
            return {
                ...state,
                beneficiaire: action.payload
            };


        case GET_BENEFICIAIRE:
            return {
                ...state,
                beneficiaire : state.beneficiaires.map(beneficiaire =>
                    beneficiaire.id === action.payload &&  beneficiaire
                )
            };

        case CLEAR_BENEFICIAIRE:
            return {
                ...state,
                beneficiaire: null
            };
        case FILTER_BENEFICIAIRES:
            return {
                ...state,
                filtered: state.beneficiaires.filter(beneficiaire => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return beneficiaire.cin.match(regex) || beneficiaire.nom.match(regex) ;
                })
            };
        case CLEAR_FILTER_BENEFICIAIRE:
            return {
                ...state,
                filtered: null
            };

        case OPEN_DIALOG_PERSONE:
            return {
                ...state,
                openPersone:true
            };
        case CLOSE_DIALOG_PERSONE:
            return {
                ...state,
                openPersone:false
            };
        case OPEN_DIALOG_BENEFICIER:
            return {
                ...state,
                openBeneficier:true
            };
        case CLOSE_DIALOG_BENEFICIER:
            return {
                ...state,
                openBeneficier:false
            };
        case OPEN_SUIVI_BENEFICIAIRE:
            return {
                ...state,
                openSuivi:true
            };
        case CLOSE_SUIVI_BENEFICIAIRE:
            return {
                ...state,
                openSuivi:false
            };
        case OPEN_PAYER_BENEFICIAIRE:
            return {
                ...state,
                openPayer:true
            };
        case CLOSE_PAYER_BENEFICIAIRE:
            return {
                ...state,
                openPayer:false
            };
        case OPEN_BENEFICIAIRE:
            return {
                ...state,
                openBeneficiaire:true
            };
        case CLOSE_BENEFICIAIRE:
            return {
                ...state,
                openBeneficiaire:false
            };
        case BENEFICIAIRE_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
    }
}