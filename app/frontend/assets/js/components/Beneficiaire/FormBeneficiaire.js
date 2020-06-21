import React from 'react';
import {Grid, IconButton} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {TextValidator} from "react-material-ui-form-validator";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/fr";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

const FormBeneficiaire = ({beneficiaire,profil_baremes,onChangeProfile,index,filterOptions,ListBeneficiares,onChangeBeneficiaire,DatePickerFunction,date_demarrage,addBeneficiaire,classes,cancelBeneficiaire,SetBeneficiaire}) => {

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item lg={1} md={1} sm={12} xs={12} >
                    {
                        beneficiaire.beneficiaire.ancien ?
                            <TextValidator
                                disabled
                                value={beneficiaire.beneficiaire.cin}
                                label="Cin"
                                 name={'cin.' + index + '.beneficiaire'}
                                type="text"
                                 onChange={onChangeBeneficiaire}
                                validators={["required"]}
                                errorMessages={["Vous avez oublié de définir la cin"]}
                            />
                            :

                            <Autocomplete
                             //   value={beneficiaire.cin? beneficiaire.cin : ''}

                                className="mb-4 w-full"
                                freeSolo
                                filterOptions={filterOptions}
                                options={ListBeneficiares}
                                getOptionLabel={beneficiaire => (beneficiaire.cin? beneficiaire.cin : "")}
                                onChange={(event, beneficiaire) => {
                                    if(beneficiaire){

                                        SetBeneficiaire(beneficiaire,index);
                                    }

                                    //  setFormulaire({ ...formulaire, entreprise })
                                }}
                                renderInput={params => (
                                    <TextValidator
                                        {...params}
                                        value={beneficiaire.beneficiaire.cin}
                                        label="Cin"
                                         name={'cin.' + index + '.beneficiaire'}
                                        type="text"
                                         onChange={onChangeBeneficiaire}
                                        validators={["required"]}
                                        errorMessages={["Vous avez oublié de définir la cin"]}
                                    />
                                )}
                            />
                    }


                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Nom"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'nom.' + index + '.beneficiaire'}
                        value={beneficiaire.beneficiaire.nom}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le nom"]}

                    />
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Prénom"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'prenom.' + index + '.beneficiaire'}
                        value={beneficiaire.beneficiaire.prenom}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le prenom"]}

                    />
                </Grid>

                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Tél"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'tel.' + index + '.beneficiaire'}
                        value={beneficiaire.beneficiaire.tel}

                    />
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Email"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'email.' + index + '.beneficiaire'}
                        value={beneficiaire.beneficiaire.email}

                    />
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Cnss"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'cnss.' + index + '.beneficiaire'}
                        value={beneficiaire.beneficiaire.cnss}

                    />
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Diplome"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'diplome.' + index}
                        value={beneficiaire.diplome}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le diplome"]}

                    />
                </Grid>

                <Grid item lg={1} md={1} sm={12} xs={12}>


                    <Autocomplete
                       // value={beneficiaire.profil_bareme}
                        className="mb-4 w-full"
                        freeSolo
                        filterOptions={filterOptions}
                        options={profil_baremes}
                        getOptionLabel={diplome => (diplome.diplome? diplome.diplome : "")}
                        onChange={(event, diplome) => {
                         // console.log(diplome);
                            if(diplome !== null){
                                onChangeProfile(index,diplome.diplome);
                            }else{
                                onChangeProfile(index,diplome);
                            }



                        }}
                        renderInput={params => (
                            <TextValidator
                                {...params}
                                label="Profil"
                                value={beneficiaire.profil_bareme}
                                type="text"
                                validators={["required"]}
                                errorMessages={["Vous avez oublié de définir l'operateur"]}
                            />
                        )}
                    />

                </Grid>


                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <TextValidator
                        className="mb-4 mb-4 w-full"
                        label="Contrat"
                        onChange={onChangeBeneficiaire}
                        type="text"
                        name={'contrat.' + index}
                        value={beneficiaire.contrat}
                        validators={["required"]}
                        errorMessages={["Vous avez oublié de définir le contrat"]}

                    />
                </Grid>

                <Grid item lg={2} md={2} sm={12} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                        <KeyboardDatePicker
                            className="mb-4 w-full_c"
                            format={deLocale.code === "fr" ? "dd.MM.yyyy" : "dd/MM/yyyy"}
                            margin="none"
                            id="mui-pickers-date"
                            label="Date D'embauche"
                            inputVariant="standard"
                           // disabled={beneficiaire.ancien && beneficiaire.ancien}
                            maxDate={date_demarrage}
                            type="text"
                            autoOk={true}

                            value={beneficiaire.date_dembauche ? beneficiaire.date_dembauche : null}

                            //  onChange={onChangeBeneficiaire}
                            onChange={(date_dembauche) => DatePickerFunction(date_dembauche,index)}

                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                        />




                    </MuiPickersUtilsProvider>


                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    { index === 0 ?
                        <IconButton className={classes.button}   aria-label="Add" onClick={addBeneficiaire}>
                            <AddIcon fontSize="small"   />
                        </IconButton>


                        :

                        <IconButton  className={classes.button}  aria-label="Delete"  onClick={()=>cancelBeneficiaire(index)}>
                            <ClearIcon fontSize="small"   />
                        </IconButton>
                    }

                </Grid>

            </Grid>

        </div>
    );
};

export default FormBeneficiaire;
