import React, { useContext, useRef, useEffect } from 'react';
import BeneficiaireContext from "../../context/beneficiaire/beneficiaireContext";
import InputBase from "@material-ui/core/InputBase";


const BeneficiaireFilter = (props) => {
    const beneficiaireContext = useContext(BeneficiaireContext);
    const text = useRef('');
    const {filterBeneficiaires, clearFilterBeneficiaire, filtered } = beneficiaireContext;
    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
     //   console.log(text);
        if (text.current.value !== '') {
            filterBeneficiaires(e.target.value);
        //    console.log(e.target.value);
        } else {
            clearFilterBeneficiaire();
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

export default BeneficiaireFilter;