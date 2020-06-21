import React, {useReducer} from 'react';
import BeneficiareContext from "./beneficiaireContext";
import BeneficiareReducer from "./beneficiaireReducer";
import moment from "moment";
import {
    OPEN_DIALOG_PERSONE,
    CLOSE_DIALOG_PERSONE,
    ADD_BENEFICIAIRE,
    UPDATE_BENEFICIAIRE,
    DELETE_BENEFICIAIRE,
    SET_BENEFICIAIRE,
    GET_BENEFICIAIRE,
    CLEAR_BENEFICIAIRE,
    CLEAR_FILTER_BENEFICIAIRE,
    CLEAR_BENEFICIAIRES,
    FILTER_BENEFICIAIRES,
    OPEN_DIALOG_BENEFICIER,
    CLOSE_DIALOG_BENEFICIER,
    ADD_BENEFICIAIRE_FORMULAIRE,
    OPEN_SUIVI_BENEFICIAIRE,
    CLOSE_SUIVI_BENEFICIAIRE,
    OPEN_PAYER_BENEFICIAIRE,
    CLOSE_PAYER_BENEFICIAIRE,
    OPEN_BENEFICIAIRE,
    CLOSE_BENEFICIAIRE,
    GET_BENEFICIAIRES,
    BENEFICIAIRE_ERROR,
    UPDATE_BENEFICIAIRE_FORMULAIRE, GET_FORMULAIRES, FORMULAIRE_ERROR, DELETE_FORMULAIRE

} from '../types';
import axios from "axios";


const BeneficiaireState = (props) => {
    const initialState = {
        openPersone:false,
        openBeneficier:false,
        openSuivi:false,
        openPayer:false,
        openBeneficiaire:false,
        beneficiaires: [],
        beneficiaire: null,
        filtered: null,

    };
    const [state, dispatch] = useReducer(BeneficiareReducer, initialState);
    const openDialogPersone =()=>dispatch({type:OPEN_DIALOG_PERSONE});
    const closeDialogPersone  =()=>dispatch({type:CLOSE_DIALOG_PERSONE});

    const openDialogBeneficier =()=>dispatch({type:OPEN_DIALOG_BENEFICIER});
    const closeDialogBeneficier  =()=>dispatch({type:CLOSE_DIALOG_BENEFICIER});
    const openSuiviBeneficier =()=>dispatch({type:OPEN_SUIVI_BENEFICIAIRE});
    const closeSuiviBeneficier  =()=>dispatch({type:CLOSE_SUIVI_BENEFICIAIRE});
    const openPayerBeneficier =()=>dispatch({type:OPEN_PAYER_BENEFICIAIRE});
    const closePayerBeneficier  =()=>dispatch({type:CLOSE_PAYER_BENEFICIAIRE});
    const openDialogBeneficiaire =()=>dispatch({type:OPEN_BENEFICIAIRE});
    const closeDialogBeneficiaire  =()=>dispatch({type:CLOSE_BENEFICIAIRE});



        // Get Beneficiaires

  const getBeneficiaires = async () => {
    try {


        const res = await axios.get("api/formulaire/all/beneficiaires");

      dispatch({
        type: GET_BENEFICIAIRES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BENEFICIAIRE_ERROR,
        payload: err.response
      });
    }
  };
    const getUserBeneficiaire = async () => {
        try {


            const res = await axios.get("api/formulaire/user_beneficiaires/");

            dispatch({
                type: GET_BENEFICIAIRES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: BENEFICIAIRE_ERROR,
                payload: err.response
            });
        }
    };


    const add_beneficiaire = async item=>{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const candidat = {
            cin:item.cin,
            nom:item.nom,
            prenom:item.prenom,
            tel:item.tel,
            email:item.email,
            cnss:item.cnss,
        };

        try {

            const res = await axios.post('api/formulaire/beneficiaires/', candidat, config);

            const engager = {
                diplome: item.formulaires[0]['diplome'],
                profil_bareme: item.formulaires[0]['profil_bareme'],
                type: item.formulaires[0]['type'],
                contrat: item.formulaires[0]['contrat'],
                beneficier: item.formulaires[0]['beneficier'],
                non_conforme: item.formulaires[0]['non_conforme'],
                engagement: item.formulaires[0]['engagement'],
                consommation: item.formulaires[0]['consommation'],
                date_dembauche: moment(item.formulaires[0]['date_dembauche']).format('YYYY-MM-DD'),
                beneficiaire: res.data.id,
                formulaire:item.formulaires[0]['formulaire']['id']
            };


           const res_engager = await axios.post('api/formulaire/beneficiaire_formulaires/', engager, config);

            item.formulaires[0]['id']= res_engager.data.id;
            item.id = res.data.id;


    dispatch({
      type: ADD_BENEFICIAIRE,
      payload: item
    });

            let tab=[res_engager.data.id,res.data.id];

            return tab;

  } catch (err) {

             dispatch({
                 type: BENEFICIAIRE_ERROR,
                 payload: err.response
             });

         }



    };
    const update_beneficiaire = async (beneficiaire,engager) =>{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

         try {

//console.log(engager);
             await axios.post(`api/formulaire/beneficiaire_formulaires/`, engager, config).then((res)=>{
              //   console.log (res.data);
                 beneficiaire.formulaires.map((f,index)=>{

                     if(f.formulaire.id === engager.formulaire){
                         beneficiaire.formulaires[index]['id']=res.data.id;
                     }
                 });
             }).catch((err)=>{
               //  console.log (err);
             });




             dispatch({
      type: UPDATE_BENEFICIAIRE,
      payload: beneficiaire
    });
  } catch (err) {
    dispatch({
      type: BENEFICIAIRE_ERROR,
      payload: err.response
    });
  }

    };


    /*
    header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
     */
    const updateFormulaireBeneficiaire=async (beneficiaire, engager, id, cnss,id_beneficiaire)=>{


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
           await axios.patch(`api/formulaire/beneficiaire_formulaires/${id}/`, engager, config).then((res)=>{
            //   console.log (res.data);
           }).catch((err)=>{
             //  console.log (err);
           });

            if(cnss !== null){
                 await axios.patch(`api/formulaire/beneficiaires/${id_beneficiaire}/`, {cnss:cnss}, config).then((res)=>{
                  //  console.log (res.data);
                }).catch((err)=>{
                  //  console.log (err);
                });
            }

            dispatch({
                type: UPDATE_BENEFICIAIRE,
                payload: beneficiaire
            });
        } catch (err) {
            console.log('Returned data:', err);
            dispatch({
                type: BENEFICIAIRE_ERROR,
                payload: err.response
            });
        }


    };

    const update_beneficiaire_user = async beneficiaire =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const candidat = {
            cin:beneficiaire.cin,
            nom:beneficiaire.nom,
            prenom:beneficiaire.prenom,
            tel:beneficiaire.tel,
            email:beneficiaire.email,
            cnss:beneficiaire.cnss
        };

        try {

            const res = await axios.patch(`api/formulaire/beneficiaires/${beneficiaire.id}/`, candidat, config);
            dispatch({
                type: UPDATE_BENEFICIAIRE,
                payload: beneficiaire
            });

        } catch (err) {

            dispatch({
                type: BENEFICIAIRE_ERROR,
                payload: err.response
            });
        }

    };

    const delete_beneficiaire = async id=>{

        try {


            await axios.delete(`api/formulaire/beneficiaires/${id}/`);

            dispatch({
                type: DELETE_BENEFICIAIRE,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: BENEFICIAIRE_ERROR,
                payload: err.response
            });
        }
    };

    const setBeneficiaire = (beneficiaire)=>{
        dispatch({
            type : SET_BENEFICIAIRE,
            payload:beneficiaire
        })
    };

    const getBeneficiaire = (id)=>{
        dispatch({
            type : GET_BENEFICIAIRE,
            payload:id
        })
    };

    const clearBeneficiaire = ()=>{
        dispatch({
            type : CLEAR_BENEFICIAIRE
        })
    };

    // Filter beneficiaires
    const filterBeneficiaires = text => {
        dispatch({ type: FILTER_BENEFICIAIRES, payload: text });
    };

    // Clear Filter beneficiaire
    const clearFilterBeneficiaire = () => {
        dispatch({ type: CLEAR_FILTER_BENEFICIAIRE });
    };




const addFormulaireBeneficiaire=(id,formulaire)=>{

    dispatch({
            type: ADD_BENEFICIAIRE_FORMULAIRE,
            payload: {
                id: id,
                formulaire:formulaire
            }
        }
    );
};



    return (
        <BeneficiareContext.Provider
            value={{

                openPersone: state.openPersone,
                openBeneficier: state.openBeneficier,
                openBeneficiaire: state.openBeneficiaire,
                openSuivi: state.openSuivi,
                openPayer: state.openPayer,
                beneficiaires:state.beneficiaires,
                beneficiaire:state.beneficiaire,
                filtered:state.filtered,
                openDialogPersone,
                closeDialogPersone,
                add_beneficiaire,
                update_beneficiaire,
                delete_beneficiaire,
                setBeneficiaire,
                clearBeneficiaire,
                filterBeneficiaires,
                clearFilterBeneficiaire,
                openDialogBeneficier,
                closeDialogBeneficier,
                openSuiviBeneficier,
                closeSuiviBeneficier,
                openPayerBeneficier,
                closePayerBeneficier,
                getBeneficiaire,
                addFormulaireBeneficiaire,
                openDialogBeneficiaire,
                closeDialogBeneficiaire,
                getBeneficiaires,
                updateFormulaireBeneficiaire,
                getUserBeneficiaire,
                update_beneficiaire_user



            }}>
            {props.children}
        </BeneficiareContext.Provider>
    );
};

export default BeneficiaireState;