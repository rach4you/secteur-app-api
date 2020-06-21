import React from 'react';
import {Grid, IconButton} from "@material-ui/core";
import {TextValidator} from "react-material-ui-form-validator";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

const Module = (props) => {

    return (
        <>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                    className="mb-4 w-full"
                    label="Module"
                    onChange={props.onChangeModule}
                    type="text"
                    name={'module.' + props.index}
                    value={props.module.module}
                    validators={["required"]}
                    errorMessages={["Vous avez oublié de définir le module"]}

                />
            </Grid>
            <Grid item lg={5} md={5} sm={11} xs={11}>
                <TextValidator
                    className="mb-4 w-full"
                    label="Volume horaire"
                    onChange={props.onChangeModule}
                    type="number"
                    name={'horaire.' + props.index}
                    value={props.module.horaire}
                    validators={["required"]}
                    errorMessages={["Vous avez oublié de définir le horaire"]}

                />
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1}>
                { props.index === 0 ?
                    <IconButton className={props.classes}  aria-label="Add" onClick={props.addModule}>
                        <AddIcon fontSize="small"   />
                    </IconButton>


                    :

                    <IconButton className={props.classes}  aria-label="Delete"  onClick={()=>props.cancelModule(props.index)}>
                        <ClearIcon fontSize="small"   />
                    </IconButton>
                }

            </Grid>



        </>


    );
};

export default Module;