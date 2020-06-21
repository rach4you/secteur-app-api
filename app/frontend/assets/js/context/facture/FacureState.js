import React, {useReducer} from 'react';
import FactureContext from "./factureContext";
import FactureReducer from "./factureReducer";
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
import axios from "axios";


const FacureState = (props) => {

    const initialState = {
        openFacture:false,
        facture: null,
        filtered: null,
        factures:[]
    };

    const [state, dispatch] = useReducer(FactureReducer, initialState);
    const openDialogFacture =()=>dispatch({type:OPEN_DIALOG_FACTURE});
    const closeDialogFacture  =()=>dispatch({type:CLOSE_DIALOG_FACTURE});



    const getFactures = async () => {
    try {

        const res = await axios.get("api/formulaire/factures/");
      dispatch({
        type: GET_FACTURES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FACTURE_ERROR,
        payload: err.response
      });
    }
  };


    const add_facture= async facture=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
         try {

            const res = await axios.post('api/formulaire/factures/', facture, config);
             facture.id=res.data.id;
    dispatch({
      type: ADD_FACTURE,
      payload: facture
    });
    return res.data.id;
  } catch (err) {
             dispatch({
                 type: FACTURE_ERROR,
                 payload: err.response
             });

         }

    };
    const update_facture = async facture =>{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {

            const res = await axios.put(`api/formulaire/factures/${facture.id}/`, facture, config);

    dispatch({
      type: UPDATE_FACTURE,
      payload: facture
    });
  } catch (err) {
    dispatch({
      type: FACTURE_ERROR,
      payload: err.response
    });
  }



    };

    const delete_facture = async id=>{


         try {

    await fetch(`/factures/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_FACTURE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: FACTURE_ERROR,
      payload: err.response
    });
  }

    };

    const setFacture = (facture)=>{
        dispatch({
            type : SET_FACTURE,
            payload:facture
        })
    };

    const clearFacture = ()=>{
        dispatch({
            type : CLEAR_FACTURE
        })
    };

    // Filter factures
    const filterFactures = text => {
        dispatch({ type: FILTER_FACTURES, payload: text });
    };

    // Clear Filter facture
    const clearFilterFacture = () => {
        dispatch({ type: CLEAR_FILTER_FACTURE });
    };




    return (
        <FactureContext.Provider
            value={{

                openFacture: state.openFacture,
                factures:state.factures,
                facture:state.facture,
                filtered:state.filtered,
                openDialogFacture,
                closeDialogFacture,
                add_facture,
                update_facture,
                delete_facture,
                setFacture,
                clearFacture,
                filterFactures,
                clearFilterFacture,
                getFactures




            }}>
            {props.children}
        </FactureContext.Provider>
    );
};

export default FacureState;