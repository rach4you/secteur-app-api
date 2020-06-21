import React, {useContext, useState,useEffect,useRef} from 'react';
import FormulaireContext from "../../context/formulaire/formulaireContext";
import Module from "./Module";
import SnackContext from "../../context/snack/snackContext";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Button, Grid} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/fr";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import { makeStyles } from '@material-ui/core/styles';

import "date-fns";
import SendIcon from "@material-ui/icons/Send";


const useStyles = makeStyles((theme) => ({
    cursor:{
        cursor: 'pointer',
        marginTop: '2rem'
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

const FormFormulaire = () => {
    const classes = useStyles();
    const formulaireContext = useContext(FormulaireContext);
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const current = formulaireContext.formulaire;
    const form = useRef('');
    useEffect(() => {

        if (current !== null) {
            setFormulaire(current);

        } else {
            setFormulaire({
                id: null,
                code: '',
                theme: '',
                lieu:'',
                date_depot:null,
                modules: [{module:'',horaire:0}],
                operateur: '',
                secteur: '',
                filiere:null,
                entreprise:'',
                date_creation:new Date(),
                date_demarrage:null,
                date_achevement:null,
                montant:0,
                devise:'',
                competence:'',
                beneficiaires:[],
                facture:[]

            });
        }
    }, [formulaireContext, current,]);

    useEffect(() => {
        getEntreprises();
        getOperateurs();
        getSecteurs();
        getDevises();
        // eslint-disable-next-line
    }, []);

    const {entreprises,operateurs,secteurs,devises,closeDialogue,getEntreprises,getOperateurs,getSecteurs,getDevises} = formulaireContext;
    const secteurItems = secteurs.map((secteur)=>(
        secteur.secteur
    ));

    const [profils,setProfils]=useState([]);

    const [formulaire, setFormulaire] = useState({
        id: null,
        code: '',
        theme: '',
        operateur:{},
        secteur: {},
        filiere:null,
        entreprise:{},
        lieu:'',
        date_depot:new Date(),
        date_creation:new Date(),
        date_demarrage:new Date(),
        date_achevement:new Date(),
        montant:0,
        devise:{},
        competence:'',
        modules: [{id:null,module:'',horaire:0}],
        beneficiaires:[],
        facture:[]

    });
    const { code, theme, operateur, lieu,  secteur, date_depot , filiere,entreprise, date_demarrage, date_achevement, montant, devise, competence,modules} = formulaire;

const filterFiliere=(id)=>{

    setProfils([]);


        let profilItem = secteurs.filter((item)=> {

            if (item.id === id) {
                return item.filieres;
            }
        });

       setProfils(profilItem[0].filieres);


};
    const filter = createFilterOptions();
    const onSubmit = (e)=>{
        e.preventDefault();
        const success ={
            message:'Le formulaire a été bien enregistré.',
             variant:'success'
                    };
const info ={
    message:'Le formulaire a été bien modifié.',
    variant:'info'
        };
        if(current==null){

            formulaireContext.add_formulaire(formulaire);

            getSnack(success);

        }else{

            formulaireContext.update_formulaire(formulaire);
            formulaireContext.update_formulaire_user(formulaire);

            getSnack(info);
        }
        clearAll();
    };

    //clearAll
    const clearAll=()=>{
        formulaireContext.clearFormulaire();
    };
    const onChange = event => setFormulaire({ ...formulaire, [event.target.name]: event.target.value });
    const addModule =()=>{
        modules.push({id:null, module:'',horaire:0});

      setFormulaire({ ...formulaire, modules });
    };
    const handleClose = ()=>{
        closeDialogue();
    };

    const onChangeModule = (e)=>{
      let row = e.target.name.split('.');
      let  type = row[0];
      let i = Number(row[1]);
      modules[i][type] = e.target.value;
      setFormulaire({ ...formulaire, modules });
    };
    const cancelModule = (i)=>{
      //  modules.filter((module)=> module.id !== id);
        modules.splice(i, 1);
        setFormulaire({ ...formulaire, modules });
    };

    const filterOptions = (options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== "") {
            filtered.push({
                inputValue: params.inputValue,
                label: ` "${params.inputValue}"`
            });
        }
        return filtered;
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
                            label="Code Formation"
                            onChange={onChange}
                            type="text"
                            name='code'
                            value={code}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le code"]}
                        />

                        <Autocomplete
                            value={entreprise}
                            className="mb-4 w-full"
                            freeSolo
                           filterOptions={filterOptions}
                            options={entreprises}
                            getOptionLabel={entreprise => (entreprise.raison_sociale? entreprise.raison_sociale : "")}
                            onChange={(event, entreprise) => {
                            setFormulaire({ ...formulaire, entreprise })
                            }}
                            renderInput={params => (
                                <TextValidator
                                    {...params}
                                    value={entreprise}
                                    label="Entreprise"
                                    type="text"
                                    validators={["required"]}
                                    errorMessages={["Vous avez oublié de définir l'entreprise"]}
                                />
                            )}
                        />


                        <Autocomplete
                            value={operateur}
                            className="mb-4 w-full"
                            freeSolo
                            filterOptions={filterOptions}
                            options={operateurs}
                            getOptionLabel={operateur => (operateur.operateur? operateur.operateur : "")}
                            onChange={(event, operateur) => {
                                setFormulaire({ ...formulaire, operateur })
                            }}
                            renderInput={params => (
                                <TextValidator
                                    {...params}
                                    label="Operateur"
                                    value={operateur}
                                    type="text"
                                    validators={["required"]}
                                    errorMessages={["Vous avez oublié de définir l'operateur"]}
                                />
                            )}
                        />


                        <TextValidator
                            className="mb-4 w-full"
                            label="Lieu de la formation"
                            onChange={onChange}
                            type="text"
                            name='lieu'
                            value={lieu}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le lieu de formation"]}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                format={deLocale.code === "fr" ? "dd.MM.yyyy" : "dd/MM/yyyy"}
                                margin="none"
                                id="mui-pickers-date"
                                label="Date Démarrage"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}

                                value={date_demarrage ? date_demarrage : null}


                                onChange={(date_demarrage) => {
                                    setFormulaire({ ...formulaire, date_demarrage })
                                }}

                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <TextValidator
                            className="mb-4 w-full"
                            label="Coût de la formation (TTC)"
                            onChange={onChange}
                            type="number"
                            name='montant'
                            value={montant}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le lieu de formation"]}

                        />



                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            value={secteur}
                            className="mb-4 w-full"
                            freeSolo
                            filterOptions={filterOptions}
                            options={secteurs}
                            getOptionLabel={secteur => (secteur.secteur? secteur.secteur : "")}
                            onChange={(event, secteur) => {
                            if(secteur!==null){
                                filterFiliere(secteur.id);
                                setFormulaire({ ...formulaire, secteur:{id:secteur.id,secteur:secteur.secteur},filiere: null})

                            }else{
                                setProfils([]);
                                setFormulaire({ ...formulaire,filiere: null})

                            }
                            //    console.log( secteur);

                            }}
                            renderInput={params => (
                                <TextValidator
                                    {...params}
                                    value={secteur}
                                    label="Secteur"
                                    type="text"
                                    validators={["required"]}
                                    errorMessages={["Vous avez oublié de définir le secteur"]}
                                />
                            )}
                        />

                        <Autocomplete
                            value={filiere}
                            className="mb-4 w-full"
                            freeSolo
                            filterOptions={filterOptions}
                            options={profils}
                            getOptionLabel={filiere => (filiere.filiere? filiere.filiere : "")}
                            onChange={(event, filiere) => {
                                setFormulaire({ ...formulaire, filiere })
                            }}
                            renderInput={params => (
                                <TextValidator
                                    {...params}
                                    value={filiere}
                                    label="Profil"
                                    type="text"
                                    validators={["required"]}
                                    errorMessages={["Vous avez oublié de définir le profil"]}
                                />
                            )}
                        />



                        <TextValidator
                            className="mb-4 w-full"
                            label="Thème"
                            onChange={onChange}
                            type="text"
                            name='theme'
                            value={theme}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le thème"]}
                        />
                        <MuiPickersUtilsProvider  utils={DateFnsUtils} locale={deLocale}>
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                format={deLocale.code === "fr" ? "dd.MM.yyyy" : "dd/MM/yyyy"}
                                margin="none"
                                id="mui-pickers-date"
                                label="Date de depôt Engagement"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}

                                value={date_depot ? date_depot : null}

                                onChange={(date_depot) => {
                                    setFormulaire({ ...formulaire, date_depot })
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale} >
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                format={deLocale.code === "fr" ? "dd.MM.yyyy" : "dd/MM/yyyy"}
                                margin="none"
                                id="mui-pickers-date"
                                label="Date D'achèvement"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}
                                minDate={date_demarrage}
                                value={date_achevement ? date_achevement : null}
                                onChange={(date_achevement) => {
                                    setFormulaire({ ...formulaire, date_achevement })
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}

                            />
                        </MuiPickersUtilsProvider>

                        <Autocomplete
                            value={devise}
                            className="mb-4 w-full"
                            freeSolo
                            filterOptions={filterOptions}
                            options={devises}
                            getOptionLabel={devise => (devise.devise? devise.devise : "")}
                            onChange={(event, devise) => {
                                setFormulaire({ ...formulaire, devise })
                            }}
                            renderInput={params => (
                                <TextValidator
                                    {...params}
                                    value={devise}
                                    label="Devise"
                                    type="text"
                                    validators={["required"]}
                                    errorMessages={["Vous avez oublié de définir le devise"]}
                                />
                            )}
                        />



                    </Grid>

                    { modules.length > 0 && modules.map((module,index)=>(


                        <Module key={index} index={index} classes={classes.button} onChangeModule={onChangeModule} module={module} addModule={addModule} cancelModule={cancelModule}/>

                    ))}


                    <Grid item xs={12} sm={12}>
                    <TextValidator
                        className="mb-4 w-full"
                        label="Compétences à acquérir"
                        onChange={onChange}
                        type="text"
                        name='competence'
                        value={competence}
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

export default FormFormulaire;
