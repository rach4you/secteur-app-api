import React, {useReducer} from 'react';
import UserContext from "./userContext";
import UserReducer from './userReducer';
import {
    FORMULAIRE_ERROR,

    GET_USER_FORMULAIRES,

} from '../types';
import axios from "axios";

const UserState = (props) => {

    const initialState = {
        formulaire: null,
        filtered: null,
        formulaires: [],

    };
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getFormulaires = async () => {
        try {


            const res = await axios.get("api/formulaire/user_formulaires/ ");

            dispatch({
                type: GET_USER_FORMULAIRES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FORMULAIRE_ERROR,
                payload: err.response
            });
        }
    };

    return (
        <UserContext.Provider
            value={{

                getFormulaires,
                formulaires: state.formulaires,

            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;