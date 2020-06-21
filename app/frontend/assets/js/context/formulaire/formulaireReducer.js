
import {
    GET_FORMULAIRES,
    ADD_FORMULAIRE,
    DELETE_FORMULAIRE,
    SET_FORMULAIRE,
    CLEAR_FORMULAIRE,
    UPDATE_FORMULAIRE,
    FILTER_FORMULAIRES,
    CLEAR_FORMULAIRES,
    CLEAR_FILTER,
    FORMULAIRE_ERROR,
    OPEN_DIALOGUE,
    CLOSE_DIALOGUE,
    OPEN_PRINT,
    CLOSE_PRINT,
    GET_ENTREPRISES,
    ENTREPRISE_ERROR,
    GET_OPERATEURS,
    OPERATEUR_ERROR,
    GET_SECTEURS,
    SECTEUR_ERROR,
    GET_DEVISES,
    DEVISE_ERROR,
    GET_INFO,
    INFO_ERROR,
    FORMULAIRE_FILTER,
    ERROR_FILTER,
    MODULES,
    GET_DIPLOMES,
    DIPLOMES_ERROR
} from '../types';

export default (state,action)=>{
    switch (action.type) {
        case GET_FORMULAIRES:
            return {
                ...state,
                formulaires: action.payload,

            };

        case GET_INFO:
            return {
                ...state,
                info: action.payload,

            };
        case FORMULAIRE_FILTER:
            return {
                ...state,
                filteres: action.payload,

            };
        case GET_ENTREPRISES:
            return {
                ...state,
                entreprises: action.payload,

            };
        case GET_DIPLOMES:
            return {
                ...state,
                profil_baremes: action.payload,

            };
        case GET_OPERATEURS:
            return {
                ...state,
                operateurs: action.payload,

            };
        case GET_SECTEURS:
            return {
                ...state,
                secteurs: action.payload,

            };
        case GET_DEVISES:
            return {
                ...state,
                devises: action.payload,

            };

        case ADD_FORMULAIRE:
            return {
                ...state,
                formulaires: [action.payload,...state.formulaires],
                open:false
            };
        case UPDATE_FORMULAIRE:
            return {
                ...state,
                formulaires: state.formulaires.map(formulaire =>
                    formulaire.id === action.payload.id ? action.payload : formulaire
                ),
                open:false
            };
        case DELETE_FORMULAIRE:
            return {
                ...state,
                formulaires: state.formulaires.filter(
                    formulaire => formulaire.id !== action.payload
                )
            };

        case SET_FORMULAIRE:
            return {
                ...state,
                formulaire: action.payload
            };
        case CLEAR_FORMULAIRE:
            return {
                ...state,
                formulaire: null
            };
        case OPEN_DIALOGUE:
            return {
                ...state,
                open:true
            };
        case CLOSE_DIALOGUE:
            return {
                ...state,
                open:false
            };

        case OPEN_PRINT:
            return {
                ...state,
                print:true
            };
        case CLOSE_PRINT:
            return {
                ...state,
                print:false
            };
        case FILTER_FORMULAIRES:
            return {
                ...state,
                filtered: state.formulaires.filter(formulaire => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return formulaire.code.match(regex) || formulaire.entreprise.raison_sociale.match(regex) || formulaire.secteur.secteur.match(regex) || formulaire.filiere.filiere.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case FORMULAIRE_ERROR:
           // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };

         case INFO_ERROR:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case ENTREPRISE_ERROR:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case OPERATEUR_ERROR:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case SECTEUR_ERROR:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case DEVISE_ERROR:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case DIPLOMES_ERROR:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case ERROR_FILTER:
            // console.error(action.payload);
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}
