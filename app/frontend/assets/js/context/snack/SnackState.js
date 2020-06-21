import React, {useReducer} from 'react';
import SnackContext from "./snackContext";
import SnackReducer from './snackReducer';
import {
    OPEN_SNACK,
    CLOSE_SNACK,  SET_SNACK
} from '../types';

const SnackState = (props) => {

    const initialState = {
        open:false,
        snack:{
            message:'',
            variant:'success'
        }
    };
    const [state, dispatch] = useReducer(SnackReducer, initialState);

    const openSnack =()=>dispatch({type:OPEN_SNACK});
    const closeSnack =()=>dispatch({type:CLOSE_SNACK});
    const getSnack=(snack)=>{
        dispatch({
            type : SET_SNACK,
            payload:snack
        })
    };
    return (
        <SnackContext.Provider
            value={{

                snack: state.snack,
                open: state.open,
                openSnack,
                closeSnack,
                getSnack



            }}
        >
            {props.children}
        </SnackContext.Provider>
    );
};

export default SnackState;