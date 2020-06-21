import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import SendIcon from "@material-ui/icons/Send";
import SnackContext from "../../context/snack/snackContext";

const UpdateBeneficiaire = ({candidat,closeDialogBeneficier,update_beneficiaire_user}) => {
    useEffect(() => {
        setBeneficiaire(candidat);
        // eslint-disable-next-line
    }, []);
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const form = useRef('');
    const [beneficiaire, setBeneficiaire] = useState({
        id: null,
        cin: '',
        nom: '',
        prenom: '',
        tel: '',
        email: '',
        cnss: '',
        date_creation:new Date(),
        formulaires:[],


    });
    const {cin,nom,prenom,tel,email,cnss}=beneficiaire;
    const onChange = e => setBeneficiaire({ ...beneficiaire, [e.target.name]: e.target.value });

    const onSubmit = (e)=>{
        e.preventDefault();

        const info ={
            message:'Le bénéficiaire a été bien modifié.',
            variant:'info'
        };

        update_beneficiaire_user(beneficiaire);

        getSnack(info);
        handleClose();
    };
    const handleClose = ()=>{
        closeDialogBeneficier();
    };
    return (
        <div>
            <ValidatorForm
                ref={form}
                onSubmit={onSubmit}
                onError={errors => null}
            >
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="CIN"
                        onChange={onChange}
                        type="text"
                        name='cin'
                        value={cin}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le cin"]}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Nom"
                        onChange={onChange}
                        type="text"
                        name='nom'
                        value={nom}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le nom"]}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Prenom"
                        onChange={onChange}
                        type="text"
                        name='prenom'
                        value={prenom}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le prenom"]}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Tél"
                        onChange={onChange}
                        type="text"
                        name='tel'
                        value={tel}
                       // validators={["required"]}
                      //  errorMessages={["Vous avez oublié de définir le tel"]}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Email"
                        onChange={onChange}
                        type="text"
                        name='email'
                        value={email}
                      //  validators={["required"]}
                      //  errorMessages={["Vous avez oublié de définir l'email"]}
                    />
                    <TextValidator
                        className="mb-4 w-full"
                        label="Cnss"
                        onChange={onChange}
                        type="text"
                        name='cnss'
                        value={cnss}
                      //  validators={["required"]}
                       // errorMessages={["Vous avez oublié de définir le cnss"]}
                    />
                </Grid>

            </Grid>
            <div className="flex justify-between items-center">

                <Button variant="contained" color="secondary" className="pl-3 capitalize" onClick={handleClose} >
                    Annuler
                </Button>
                <Button color="primary" variant="contained" type="submit">
                    <SendIcon fontSize="small" />
                    <span className="pl-2 capitalize">Envoyer</span>
                </Button>

            </div>
        </ValidatorForm>
        </div>
    );
};

export default UpdateBeneficiaire;