import React, {useContext, useEffect, useRef, useState} from 'react';
import FactureContext from "../../context/facture/factureContext";
import FormulaireContext from "../../context/formulaire/formulaireContext";
import moment from "moment";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Button, Grid} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/fr";
import {createFilterOptions} from "@material-ui/lab";
import SnackContext from "../../context/snack/snackContext";
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({

    button: {
        marginTop: theme.spacing(4)
    },
    red: {
        color:'#f44336',
        fontSize: '0.75rem'
    }
}));

const FormFacture = (props) => {
    const classes = useStyles();
    const factureContext = useContext(FactureContext);
    const {closeDialogFacture,factures,add_facture,update_facture, getFactures} = factureContext;
    const formulaireContext = useContext(FormulaireContext);
   // const {devises,getDevises} = formulaireContext;
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const [depasser,setDepasser]=useState(false);
    const [depdevise,setDepdevise]=useState(false);
    useEffect(() => {
        getFactures();
     //   getDevises();
        if (props.formulaire !== null) {

            if(props.formulaire.facture.length >0){
                setFormulaire(props.formulaire);
            }else {
                setFormulaire({...props.formulaire,facture:[{
                        id:null,
                        num_facture:'',
                        date_facture:null,
                        mttc:0,
                       // devise:null,
                        montant_dh:0,
                        commentaire:'',
                        taux:0

                    }]});
            }

        }
    }, []);
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
        module:'',
        horaire: 0,
        competence:'',
        modules: [{module:'',horaire:0}],
        beneficiaires:[{
            id: null,
            cin:'',
            nom:'',
            prenom:'',
            tel:'',
            email:'',
            diplome:'',
            cnss:'',
            profil_bareme:'',
            contrat:'',
            date_dembauche: null,
            consommation:0,
            engagement:0,
            type:'',
            ancien:false,
            etat:'former',
        }],
        facture:[{
            id:null,
            num_facture:'',
            date_facture:null,
            mttc:0,
            //devise:null,
            montant_dh:0,
            commentaire:'',
            taux:0
        }]
    });



    const facture = formulaire.facture[0];


    const{num_facture,date_facture,mttc,commentaire, taux}=facture;

    const {montant,devise}=formulaire;

    const form = useRef('');

    const compteFacture=(id)=>{
        let compte=0;
        factures.map((f)=>{
            if(f.formulaire===id){
                ++compte;
            }
        });
        return compte;
    };
    const onSubmit = (e)=> {
        e.preventDefault();
        const success ={
            message:'La Facture  a été bien enregistré.',
            variant:'success'
        };
        const info ={
            message:'La Facture  a été bien modifiée.',
            variant:'info'
        };


        if(devise.devise.slice(devise.devise.length-3,devise.devise.length) === 'MAD'){
            formulaire.facture[0]['montant_dh']=formulaire.facture[0]['mttc'];
        }else{
            formulaire.facture[0]['montant_dh']= (formulaire.facture[0]['mttc'] * formulaire.facture[0]['taux']);
        }
        formulaireContext.update_formulaire(formulaire);

        if(compteFacture(formulaire.id)>0){
            update_facture({
                id:formulaire.facture[0]['id'],
                num_facture:formulaire.facture[0]['num_facture'],
                date_facture:moment(formulaire.facture[0]['date_facture']).format('YYYY-MM-DD'),
                mttc:formulaire.facture[0]['mttc'],
                taux:formulaire.facture[0]['taux'],
                montant_dh:formulaire.facture[0]['montant_dh'],
                commentaire:formulaire.facture[0]['commentaire'],
                formulaire:formulaire.id
            });


            getSnack(info);

        }else{
           let res = add_facture({
                id:formulaire.facture[0]['id'],
               num_facture:formulaire.facture[0]['num_facture'],
               date_facture:moment(formulaire.facture[0]['date_facture']).format('YYYY-MM-DD'),
               mttc:formulaire.facture[0]['mttc'],
               taux:formulaire.facture[0]['taux'],
               montant_dh:formulaire.facture[0]['montant_dh'],
               commentaire:formulaire.facture[0]['commentaire'],
               formulaire:formulaire.id
            });
            res.then(data => {

                formulaire.facture[0]['id']=data;

            });
            getSnack(success);
        }

        formulaireContext.update_formulaire(formulaire);
        closeFormFacture();
    };
    const onChange = e => {

       let taux_change = 0;
       if(devise.devise.slice(devise.devise.length-3,devise.devise.length) === 'EUR'){
           taux_change=12;
       }
        if(devise.devise.slice(devise.devise.length-3,devise.devise.length) === 'USD'){
            taux_change=11;
        }
        if(devise.devise.slice(devise.devise.length-3,devise.devise.length) === 'CAD'){
            taux_change=9;
        }


        if (e.target.name==='mttc'){

            if(parseFloat(e.target.value) > montant ){
                setDepasser(true);
                formulaire['facture'][0][e.target.name]=e.target.value;
                setFormulaire({ ...formulaire});
            }else{
                setDepasser(false);
                formulaire['facture'][0][e.target.name]=e.target.value;

                setFormulaire({ ...formulaire});
            }
        }else if (e.target.name==='taux'){
            if(parseFloat(e.target.value) > taux_change ){
                setDepdevise(true);
                formulaire['facture'][0][e.target.name]=e.target.value;
                setFormulaire({ ...formulaire});
            }else{
                setDepdevise(false);
                formulaire['facture'][0][e.target.name]=e.target.value;

                setFormulaire({ ...formulaire});
            }

        } else{
            formulaire['facture'][0][e.target.name]=e.target.value;

            setFormulaire({ ...formulaire});
        }


    };
    const closeFormFacture=()=>(closeDialogFacture());
    const filter = createFilterOptions();
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
                            label="N° Facture"
                            onChange={onChange}
                            type="text"
                            name='num_facture'
                            value={num_facture}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le N° Facture"]}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                format={deLocale.code === "fr" ? "dd.MM.yyyy" : "dd/MM/yyyy"}
                                margin="none"
                                id="mui-pickers-date"
                                label="Date Facture"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}

                                value={date_facture ? date_facture : null}


                                onChange={(date_facture) => {
                                    formulaire.facture[0]['date_facture']=date_facture
                                    setFormulaire({ ...formulaire })
                                }}

                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Montant facture"
                            onChange={onChange}
                            type="number"
                            name='mttc'
                            value={mttc}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le Montant facture"]}
                        />
                        {depasser && <div className={classes.red}>Vous avez dépasser le montant {montant}  {devise.devise.slice(devise.devise.length-3,devise.devise.length)} qui a déclaré dans le formulaire</div>}
                        {

                            devise.devise &&    devise.devise.slice(devise.devise.length-3,devise.devise.length)!=='MAD'

                        &&
                        <TextValidator
                            className="mb-4 w-full"
                            label="Taux de change"
                            onChange={onChange}
                            type="number"
                            name='taux'
                            value={taux}
                            validators={["required"]}
                            errorMessages={["Vous avez oublié de définir le Taux de change"]}
                        />

                        }


                        {depdevise && <div className={classes.red}>Vous avez dépasser le taux de Devise autorisé   </div>}

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={classes.button}>
                            {devise.devise}
                        </div>

                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Commentaire"
                            onChange={onChange}
                            type="text"
                            name='commentaire'
                            value={commentaire}
                        />
                    </Grid>
                </Grid>
                <div className="flex justify-between items-center">

                    <Button variant="contained" color="secondary" className="pl-3 capitalize" onClick={closeFormFacture} >
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

export default FormFacture;
