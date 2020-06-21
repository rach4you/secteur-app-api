import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    USER_UPDATE
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        setAuthToken(localStorage.token);

        try {
            const res = await axios.get('api/user/me/');
            //console.log(res.data);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('api/user/create/', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.non_field_errors[0]
            });
        }
    };


    // Register User
    const update = async (formData,data,id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            if(data !==null && id !==null){
               // console.log(formData,data,id);

                axios.post(`api/employe/employes/${id}/upload-image/`, data,config)
                    .then(res => { // then print response status
                        console.log(res.statusText)
                    })
            }


            const res = await axios.put('api/user/me/', formData, config);

            dispatch({
                type: USER_UPDATE,
                payload: res.data
            });


           

        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.non_field_errors[0]
            });
        }
    };

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('api/user/token/', formData, config);
                       // console.log(res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.non_field_errors[0]
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
                update
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;