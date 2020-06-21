import React, { useContext, useRef, useEffect } from 'react';
import FormulaireContext from "../../context/formulaire/formulaireContext";
import InputBase from "@material-ui/core/InputBase";


const FormulaireFilter = (props) => {
    const formulaireContext = useContext(FormulaireContext);
    const text = useRef('');
    const {filterFormulaires, clearFilter, filtered } = formulaireContext;
    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
     //   console.log(text);
        if (text.current.value !== '') {
            filterFormulaires(e.target.value);
        //    console.log(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <InputBase
                placeholder="Rechercher ..."
                classes={props.classes}
                inputProps={{ 'aria-label': 'search' }}
                inputRef={text}
                onChange={onChange}
            />

        </form>
    );
};

export default FormulaireFilter;