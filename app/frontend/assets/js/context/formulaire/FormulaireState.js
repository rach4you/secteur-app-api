import React, { useReducer } from 'react';
import FormulaireContext from "./formulaireContext";
import FormulaireReducer from './formulaireReducer';
import moment from "moment";
import axios from 'axios';
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
    GET_DIPLOMES,
    DIPLOMES_ERROR

} from '../types';


const FormulaireState = props => {

    const initialState = {
        formulaire: null,
        filtered: null,
        open:false,
        print:false,
        info: null,
        entreprises:[],
        operateurs:[],
        secteurs:[],
        devises:[],
        formulaires: [],
        filteres: [],
        profil_baremes: [],



    };
    const [state, dispatch] = useReducer(FormulaireReducer, initialState);


    // Get Formulaires

  const getFormulaires = async () => {
    try {


      const res = await axios.get("api/formulaire/all");

      dispatch({
        type: GET_FORMULAIRES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FORMULAIRE_ERROR,
        payload: err.response
      });
    }
  };

    const getUserFormulaire = async () => {
        try {


            const res = await axios.get("api/formulaire/user_formulaires/");

            dispatch({
                type: GET_FORMULAIRES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FORMULAIRE_ERROR,
                payload: err.response
            });
        }
    };
    const getFormulairePayer = async () => {
        try {


            const res = await axios.get("api/formulaire/facture_payer/");

            dispatch({
                type: GET_FORMULAIRES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FORMULAIRE_ERROR,
                payload: err.response
            });
        }
    };

    const getInfo = async () => {
        try {


            const res = await axios.get("api/formulaire/count/");
            dispatch({
                type: GET_INFO,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: INFO_ERROR,
                payload: err.response
            });
        }
    };

    const getFilter = async () => {
        try {


            const res = await axios.get("api/formulaire/dernier_formulaire/");
            dispatch({
                type: FORMULAIRE_FILTER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERROR_FILTER,
                payload: err.response
            });
        }
    };


    // Get Entreprises

    const getEntreprises = async () => {
        try {


            const res = await axios.get("api/formulaire/entreprises/");
            dispatch({
                type: GET_ENTREPRISES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ENTREPRISE_ERROR,
                payload: err.response
            });
        }
    };

    const getDiplomes = async (id) => {
        try {


            const res = await axios.get(`api/formulaire/${id}/profil_bareme/`);
            dispatch({
                type: GET_DIPLOMES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DIPLOMES_ERROR,
                payload: err.response
            });
        }
    };

    // Get Operateurs

    const getOperateurs = async () => {
        try {

            const res = await axios.get("api/formulaire/operateurs/");
            dispatch({
                type: GET_OPERATEURS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: OPERATEUR_ERROR,
                payload: err.response
            });
        }
    };

    // Get SECTEURS

    const getSecteurs = async () => {
        try {

            const res = await axios.get("api/formulaire/secteurs/");
            dispatch({
                type: GET_SECTEURS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: SECTEUR_ERROR,
                payload: err.response
            });
        }
    };

    // Get DEVISES

    const getDevises = async () => {
        try {

            const res = await axios.get("api/formulaire/devises/");
            dispatch({
                type: GET_DEVISES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DEVISE_ERROR,
                payload: err.response
            });
        }
    };

    const add_formulaire = async formulaire =>{
      //  console.log(formulaire);
        const formation={
            "code": formulaire.code,
            "theme": formulaire.theme,
            "lieu": formulaire.lieu,
            "date_depot": moment(formulaire.date_depot).format('YYYY-MM-DD'),
            "date_demarrage": moment(formulaire.date_demarrage).format('YYYY-MM-DD'),
            "date_achevement": moment(formulaire.date_achevement).format('YYYY-MM-DD'),
            "montant": formulaire.montant,
            "competence": formulaire.competence,
            "secteur": formulaire.secteur.id,
            "filiere": formulaire.filiere.id,
            "operateur": formulaire.operateur.id,
            "entreprise": formulaire.entreprise.id,
            "devise": formulaire.devise.id
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        };

        try {
        //console.log(formation);
            const res = await axios.post('api/formulaire/formulaires/', formation, config);
            let mod = null;
            formulaire.modules.map(async(module, index)=>
                {
                    mod = await axios.post(`api/formulaire/${res.data.id}/module/`, module, config);
                    formulaire.modules[index]['id']=mod.data.id;
                }
            );
            formulaire['id']=res.data.id;
            dispatch({
                type: ADD_FORMULAIRE,
                payload: formulaire
            });
        } catch (err) {
            dispatch({
                type: FORMULAIRE_ERROR,
                payload: err.response
            });
        }

    };
    const update_formulaire =  formulaire =>{


            dispatch({
                type: UPDATE_FORMULAIRE,
                payload: formulaire
            });

    };
    const update_formulaire_user = async (formulaire) =>{
        const formation={
            "code": formulaire.code,
            "theme": formulaire.theme,
            "lieu": formulaire.lieu,
            "date_depot": moment(formulaire.date_depot).format('YYYY-MM-DD'),
            "date_demarrage": moment(formulaire.date_demarrage).format('YYYY-MM-DD'),
            "date_achevement": moment(formulaire.date_achevement).format('YYYY-MM-DD'),
            "montant": formulaire.montant,
            "competence": formulaire.competence,
            "secteur": formulaire.secteur.id,
            "filiere": formulaire.filiere.id,
            "operateur": formulaire.operateur.id,
            "entreprise": formulaire.entreprise.id,
            "devise": formulaire.devise.id
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        };

        try {
            const modules = await axios.get(`api/formulaire/${formulaire.id}/modules/`);


                        const res = await axios.put(`api/formulaire/formulaires/${formulaire.id}/`, formation, config);
                        let mod = null;



                        modules.data.map(async(module)=>
                            {

                                    await axios.delete(`api/formulaire/modules/${module.id}/`);

                            }
                        );


                        formulaire.modules.map(async(module, index)=>
                            {
                                mod = await axios.post(`api/formulaire/${formulaire.id}/module/`, module, config);
                                formulaire.modules[index]['id']=mod.data.id;
                            }
                        );



        } catch (err) {
            dispatch({
                type: FORMULAIRE_ERROR,
                payload: err.response
            });
        }

    };


    const delete_formulaire = async id=>{

        try {


            await axios.delete(`api/formulaire/formulaires/${id}`);

    dispatch({
      type: DELETE_FORMULAIRE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: FORMULAIRE_ERROR,
      payload: err.response
    });
  }

    };

    const setFormulaire = (formulaire)=>{
        dispatch({
            type : SET_FORMULAIRE,
            payload:formulaire
        })
    };

    const clearFormulaire = ()=>{
        dispatch({
            type : CLEAR_FORMULAIRE
        })
    };

    // Filter FORMULAIRES
    const filterFormulaires = text => {
        dispatch({ type: FILTER_FORMULAIRES, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };



    const openDialogue =()=>dispatch({type:OPEN_DIALOGUE});
    const closeDialogue =()=>dispatch({type:CLOSE_DIALOGUE});
    const openPrint =()=>dispatch({type:OPEN_PRINT});
    const closePrint =()=>dispatch({type:CLOSE_PRINT});
    return (
        <FormulaireContext.Provider
            value={{

                formulaires: state.formulaires,
                info:state.info,
                open:state.open,
                print:state.print,
                secteurs: state.secteurs,
                entreprises: state.entreprises,
                operateurs: state.operateurs,
                devises: state.devises,
                formulaire: state.formulaire,
                filtered: state.filtered,
                filteres: state.filteres,
                profil_baremes:state.profil_baremes,
                add_formulaire,
                update_formulaire,
                delete_formulaire,
                setFormulaire,
                clearFormulaire,
                openDialogue,
                closeDialogue,
                filterFormulaires,
                clearFilter,
                openPrint,
                closePrint,
                getFormulaires,
                getEntreprises,
                getOperateurs,
                getSecteurs,
                getDevises,
                getInfo,
                getFilter,
                getUserFormulaire,
                update_formulaire_user,
                getFormulairePayer,
                getDiplomes,


            }}
        >
            {props.children}
        </FormulaireContext.Provider>
    );
};

export default FormulaireState;
