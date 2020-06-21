import React, {useContext,useRef} from 'react';
import {Button} from "@material-ui/core";
import FormulaireContext from "../../context/formulaire/formulaireContext";

import SimpleCard from "../layout/SimpleCard";

import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from 'react-to-print';
import Print from "./Print";


const PrintFormulaire = ({formulaire}) => {
    const componentRef = useRef();
    const formulaireContext = useContext(FormulaireContext);
    const {closePrint} = formulaireContext;

    const closeDialog=()=>{
        closePrint()
    };


    return (
        <>


<div className=' py-3 h-full ' ref={componentRef} >
    <SimpleCard >

            <Print formulaire={formulaire} />


    </SimpleCard>
</div>
            <br/>

                        <div className="flex justify-between items-center">


                        <Button variant="contained" color="secondary" className="pl-3 capitalize" onClick={closeDialog} >
                            Annuler
                        </Button>
                            <ReactToPrint
                                trigger={() => ( <Button color="primary" variant="contained" className="pl-3 capitalize"  >
                                   <PrintIcon fontSize="small"/> <span className="pl-2 capitalize">Imprimer</span>
                                </Button>)}
                                content={() => componentRef.current}
                            />

                </div>


        </>
    );
};

export default PrintFormulaire;
