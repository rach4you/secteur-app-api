import React, {useContext, useEffect, useRef, useState} from 'react';
import SimpleCard from "../layout/SimpleCard";
import FormulaireContext from "../../context/formulaire/formulaireContext";
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import SnackContext from "../../context/snack/snackContext";
import FormBeneficiaire from "./FormBeneficiaire";
import {IconButton} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import {Button} from "@material-ui/core";

import moment from "moment";
import {  createFilterOptions } from "@material-ui/lab";

import {makeStyles} from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import {ArrowBack} from "@material-ui/icons";
import FormDialog from "../Dialog/FormDialog";
import SuiviBeneficiaire from "./SuiviBeneficiaire";


const useStyles = makeStyles((theme) => ({

    button: {
        marginTop: '12px',
       // marginRight: '-22px',

    }
}));

const BeneficiaireFormer = (props) => {
    const classes = useStyles();
    const form = useRef('');
    const beneficiareContext = useContext(BeneficiareContext);
    const {closeDialogPersone,add_beneficiaire,update_beneficiaire,addFormulaireBeneficiaire,openSuivi,closeSuiviBeneficier,openSuiviBeneficier} = beneficiareContext;
    const ListBeneficiares = beneficiareContext.beneficiaires;
    const {getBeneficiaires} = beneficiareContext;
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const formulaireContext = useContext(FormulaireContext);
    const {profil_baremes, getDiplomes} = formulaireContext;
    const CloseDialogSuivi=()=>(closeSuiviBeneficier());
    const OpenSuiviBeneficier=()=>{

        setFormation(formulaire);
        closeDialogPersone();
        openSuiviBeneficier();
    };
    useEffect(() => {
        getBeneficiaires();
        getDiplomes(props.formulaire.filiere.id);
        if (props.formulaire !== null) {
            setFormulaire(props.formulaire);
        }
    }, []);
    const [formation, setFormation] = useState({
        id: null,
        code: '',
        theme: '',
        operateur:{},
        secteur: {},
        filiere:{},
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
    });

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
            beneficiaire:{
                id: null,
                cin:'',
                nom:'',
                prenom:'',
                tel:'',
                email:'',
                cnss:'',
            },
            diplome:'',
            profil_bareme:'',
            contrat:'',
            date_dembauche: null,
            consommation:0,
            engagement:0,
            type:'',
            ancien:false,
            beneficier:false,
            non_conforme:false
        }],
        facture:null
    });

    const [beneficiaire,setBeneficiaire]=useState(null);
    const {beneficiaires}=formulaire;

    const suivi=(formulaire)=>{
       // closeSuiviBeneficier();
        setFormation(formulaire);
     //   openDialogPersone();
    };

    const addBeneficiaire=()=>{
        beneficiaires.push({
            id: null,
            beneficiaire:{
                id: null,
                cin:'',
                nom:'',
                prenom:'',
                tel:'',
                email:'',
                cnss:'',
            },
            diplome:'',
            profil_bareme:'',
            contrat:'',
            date_dembauche: null,
            consommation:0,
            engagement:0,
            type:'',
            ancien:false,
            beneficier:false,
            non_conforme:false
        });

        setFormulaire({ ...formulaire, beneficiaires });
    };
    const onChangeProfile = (i,diplome)=>{

        if(diplome!==null){
            beneficiaires[i]['profil_bareme'] = diplome;
            setFormulaire({ ...formulaire, beneficiaires });
        }else{
            beneficiaires[i]['profil_bareme'] = '';
            setFormulaire({ ...formulaire, beneficiaires });
        }

    };
    const onChangeBeneficiaire = (e)=>{


        let row = e.target.name.split('.');
        //console.log(row.length);
        let  type = row[0];
        let i = Number(row[1]);

        if(row.length > 2 ){
            beneficiaires[i]['beneficiaire'][type] = e.target.value;
        }else{
            beneficiaires[i][type] = e.target.value;
        }

        setFormulaire({ ...formulaire, beneficiaires });


    };
    const cancelBeneficiaire = (i)=>{

        beneficiaires.splice(i, 1);
        setFormulaire({ ...formulaire, beneficiaires });
    };

    const compteBeneficiairesFormulaire=(id)=>{
        let compte=0;
        ListBeneficiares.map(( b)=>{
            b.formulaires.map((f)=>{
                if(f.formulaire.id===id){
                    ++compte;
                }
            })
        });
        return compte;
    };


    const getCreditAlloue=(item)=>{

        /*
        let credit_alloue_fe=0;
        let credit_alloue_fc=0;

        if(props.formulaire.filiere.id===2){
            if(item.profil_bareme==='Ingénieur'){
                credit_alloue_fe=props.formulaire.filiere.credit_alloue[0]['fe'];
                credit_alloue_fc=props.formulaire.filiere.credit_alloue[0]['fc'];
            }else{
                credit_alloue_fe=props.formulaire.filiere.credit_alloue[1]['fe'];
                credit_alloue_fc=props.formulaire.filiere.credit_alloue[1]['fc'];
            }

        }else{
            credit_alloue_fe=props.formulaire.filiere.credit_alloue[0]['fe'];
            credit_alloue_fc=props.formulaire.filiere.credit_alloue[0]['fc'];
        }
         */


        let tab=[] ;

        ListBeneficiares.map((b)=>{
           if(b.id===item.beneficiaire.id){
               if(b.formulaires.length>0){
                   b.formulaires.map((f)=>{

                    //*************************************************************//
                       let credit_alloue_fe=0;
                       let credit_alloue_fc=0;

                       if(f.formulaire.filiere.id===2){
                           if(f.profil_bareme==='Ingénieur'){
                               credit_alloue_fe=f.formulaire.filiere.credit_alloue[0]['fe'];
                               credit_alloue_fc=f.formulaire.filiere.credit_alloue[0]['fc'];
                           }else{
                               credit_alloue_fe=f.formulaire.filiere.credit_alloue[1]['fe'];
                               credit_alloue_fc=f.formulaire.filiere.credit_alloue[1]['fc'];
                           }

                       }else{
                           credit_alloue_fe=f.formulaire.filiere.credit_alloue[0]['fe'];
                           credit_alloue_fc=f.formulaire.filiere.credit_alloue[0]['fc'];
                       }
                    //************************************************************//





                       if(item.type==='FE'){
                           tab.push(credit_alloue_fe);
                       }else{
                           tab.push(credit_alloue_fc);
                       }
                   });
               }else{

                   //*************************************************************//
                   let credit_alloue_fe=0;
                   let credit_alloue_fc=0;

                   if(props.formulaire.filiere.id===2){
                       if(item.profil_bareme==='Ingénieur'){
                           credit_alloue_fe=props.formulaire.filiere.credit_alloue[0]['fe'];
                           credit_alloue_fc=props.formulaire.filiere.credit_alloue[0]['fc'];
                       }else{
                           credit_alloue_fe=props.formulaire.filiere.credit_alloue[1]['fe'];
                           credit_alloue_fc=props.formulaire.filiere.credit_alloue[1]['fc'];
                       }

                   }else{
                       credit_alloue_fe=props.formulaire.filiere.credit_alloue[0]['fe'];
                       credit_alloue_fc=props.formulaire.filiere.credit_alloue[0]['fc'];
                   }
                   //************************************************************//
                   if(item.type==='FE'){
                       tab.push(credit_alloue_fe);
                   }else{
                       tab.push(credit_alloue_fc);
                   }

               }

           }
        });

        return Math.min(...tab);

    };

    const getConsommations=(item)=>{
        let total=0;
        ListBeneficiares.map((b) =>{

                if( b.id === item.beneficiaire.id ){
                    if(b.formulaires.length>0){
                        b.formulaires.map((f)=>{

                            if(f.type === item.type){

                                total+=f.consommation
                            }

                        });
                    }else{
                        total=0;
                    }


                }

            }
        );
       // console.log(total,item);
        return total;
    };

    const getBeneficiaire=(id,formulaire)=>{

        let beneficiaire = null;
        ListBeneficiares.map((b)=>{
            if( b.id === id) {
                b.formulaires.push(formulaire);
                beneficiaire=b;
            }
        });
        return beneficiaire;
    };

    const onSubmit =(e)=>{
        e.preventDefault();
        const success ={
            message:'Les personnes à former  ont été bien enregistrés.',
            variant:'success'
        };
        const info ={
            message:'Les personnes à former  ont été bien modifiés.',
            variant:'info'
        };
        let engagement = Number((formulaire.montant / beneficiaires.length).toFixed(2));

        formulaire.beneficiaires.map((item,index)=>{

            if(item.ancien){

               // console.log(getCreditAlloue(item),engagement,getConsommations(item));

                if(formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length) !== 'MAD'){

                    item.engagement = engagement;

                }else{

                    if((getCreditAlloue(item) - getConsommations(item)) < engagement){
                        item.engagement = getCreditAlloue(item) - getConsommations(item);
                    }else{

                        item.engagement = engagement;

                    }

                }




//-------------------------Ajouter   formulaire de ancien beneficiaire au tableau beneficiaires----------------------------------------------------------

                 const engager = {
                    diplome:item.diplome,
                    profil_bareme:item.profil_bareme,
                    contrat:item.contrat,
                    date_dembauche:moment(item.date_dembauche).format('YYYY-MM-DD'),
                    consommation:item.consommation,
                    engagement:item.engagement,
                    type:item.type,
                    beneficier:false,
                    non_conforme:false,
                    beneficiaire: item.beneficiaire.id,
                    formulaire: formulaire.id


            };

                const f = {
                    diplome:item.diplome,
                    profil_bareme:item.profil_bareme,
                    contrat:item.contrat,
                    date_dembauche:item.date_dembauche,
                    consommation:item.consommation,
                    engagement:item.engagement,
                    type:item.type,
                    beneficier:false,
                    non_conforme:false,
                    formulaire:{
                        id: formulaire.id,
                        code: formulaire.code,
                        theme: formulaire.theme,
                        operateur:formulaire.operateur,
                        secteur: formulaire.secteur,
                        filiere:formulaire.filiere,
                        entreprise:formulaire.entreprise,
                        lieu:formulaire.lieu,
                        date_depot:formulaire.date_depot,
                        date_creation:formulaire.date_creation,
                        date_demarrage:formulaire.date_demarrage,
                        date_achevement:formulaire.date_achevement,
                        montant:formulaire.montant,
                        devise:formulaire.devise,
                        competence:formulaire.competence,
                        modules: formulaire.modules,
                    }

                };
                update_beneficiaire(getBeneficiaire(item.beneficiaire.id,f),engager);
                //-------------------------------------------------------------------------------------------------------------

            }else{
                let credit_alloue_fe=0;
                let credit_alloue_fc=0;

                if(formulaire.filiere.id===2){
                    if(item.profil_bareme==='Ingénieur'){
                        credit_alloue_fe=formulaire.filiere.credit_alloue[0]['fe'];
                        credit_alloue_fc=formulaire.filiere.credit_alloue[0]['fc'];
                    }else{
                        credit_alloue_fe=formulaire.filiere.credit_alloue[1]['fe'];
                        credit_alloue_fc=formulaire.filiere.credit_alloue[1]['fc'];
                    }

                }else{
                     credit_alloue_fe=formulaire.filiere.credit_alloue[0]['fe'];
                     credit_alloue_fc=formulaire.filiere.credit_alloue[0]['fc'];
                }

                if(item.type === 'FE'){


                    if(engagement >= credit_alloue_fe){
                        item.engagement = credit_alloue_fe;
                    }else{
                        item.engagement = engagement;
                    }

                }else if(item.type === 'FC'){

                    if(engagement >= credit_alloue_fc){
                        item.engagement  = credit_alloue_fc;
                    }else{

                        item.engagement  = engagement;
                    }

                }else{

                    item.engagement=0;
                }

                item.ancien = true;

                //-------------------------Ajouter beneficiaire au tableau beneficiaires----------------------------------------------------------
               let tab = add_beneficiaire({
                    id: null,
                    cin:item.beneficiaire.cin,
                    nom:item.beneficiaire.nom,
                    prenom:item.beneficiaire.prenom,
                    tel:item.beneficiaire.tel,
                    email:item.beneficiaire.email,
                    ancien:true,
                    cnss:item.beneficiaire.cnss,
                    formulaires:[{
                        id:null,
                        diplome:item.diplome,
                        profil_bareme:item.profil_bareme,
                        contrat:item.contrat,
                        date_dembauche:item.date_dembauche,
                        consommation:item.consommation,
                        engagement:item.engagement,
                        type:item.type,
                        beneficier:false,
                        non_conforme:false,
                        formulaire:{
                            id: formulaire.id,
                            code: formulaire.code,
                            theme: formulaire.theme,
                            operateur:formulaire.operateur,
                            secteur: formulaire.secteur,
                            filiere:formulaire.filiere,
                            entreprise:formulaire.entreprise,
                            lieu:formulaire.lieu,
                            date_depot:formulaire.date_depot,
                            date_creation:formulaire.date_creation,
                            date_demarrage:formulaire.date_demarrage,
                            date_achevement:formulaire.date_achevement,
                            montant:formulaire.montant,
                            devise:formulaire.devise,
                            competence:formulaire.competence,
                            modules: formulaire.modules,
                        }

                    } ],
                });
               tab.then(data => {

                   item.id=data[0];
                   item.beneficiaire.id=data[1];
               });



            }

            return item;
        });


         setFormulaire({ ...formulaire });


       formulaireContext.update_formulaire(formulaire);

        getSnack(success);
        closeDialogPersone();
    };
    const closeDialog=()=>{

        if(compteBeneficiairesFormulaire(formulaire.id)===0){
            beneficiaires.splice(0, beneficiaires.length);
            setFormulaire({ ...formulaire, beneficiaires });

        }

        closeDialogPersone();
    };


    const  date_diff_indays = (date1, date2)=>{

        let dt1 = moment(date1, 'YYYY/MM/DD');

        let dt2 = moment(date2, 'YYYY/MM/DD');

        return dt2.diff(dt1, 'days');

    };
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

    const DatePickerFunction=(date_dembauche,index)=>{
        if(date_diff_indays(date_dembauche,formulaire.date_demarrage) <= 365){
        beneficiaires[index]['type']='FE';
    }else if(date_diff_indays(date_dembauche,formulaire.date_demarrage) > 365 && date_diff_indays(date_dembauche,formulaire.date_demarrage) <= 1095){
        beneficiaires[index]['type']='FC';
    }else {
        beneficiaires[index]['type']='CE';
    }
        beneficiaires[index]['date_dembauche'] = date_dembauche;
        setFormulaire({ ...formulaire, beneficiaires });
    };

    const SetBeneficiaire=(beneficiaire,index)=>{


        if(beneficiaire){
            beneficiaires[index]['beneficiaire']['id']=beneficiaire.id;
            beneficiaires[index]['beneficiaire']['cin']=beneficiaire.cin;
            beneficiaires[index]['beneficiaire']['nom']=beneficiaire.nom;
            beneficiaires[index]['beneficiaire']['prenom']=beneficiaire.prenom;
            beneficiaires[index]['beneficiaire']['tel']=beneficiaire.tel;
            beneficiaires[index]['beneficiaire']['email']=beneficiaire.email;
            beneficiaires[index]['beneficiaire']['cnss']=beneficiaire.cnss;
            beneficiaires[index]['ancien']=beneficiaire.ancien;
           // beneficiaires[index]['type']=beneficiaire.ancien;

            beneficiaire.formulaires.map((item)=>{
                if(item.formulaire.entreprise.id === formulaire.entreprise.id){
                    beneficiaires[index]['date_dembauche']=item.date_dembauche;
                }
            });
            DatePickerFunction(beneficiaires[index]['date_dembauche'],index);


            setFormulaire({ ...formulaire, beneficiaires });
        }else{
            beneficiaires[index]['id']=null;
            beneficiaires[index]['beneficiaire']['nom']='';
            beneficiaires[index]['beneficiaire']['prenom']='';
            beneficiaires[index]['beneficiaire']['tel']='';
            beneficiaires[index]['beneficiaire']['email']='';
            beneficiaires[index]['date_dembauche']=null;
            setFormulaire({ ...formulaire, beneficiaires });
        }

    };

    return (
        <div className=' py-2 h-full '>
            <FormDialog titre={'Suivi les personnes à former de Formulaire N°: '+ formation.code} open={openSuivi} closeDialog={CloseDialogSuivi} size='xl' ><SuiviBeneficiaire formulaire={formation}/> </FormDialog>

            <ValidatorForm
                ref={form}
                onSubmit={onSubmit}
                onError={errors => null}
            >
                {compteBeneficiairesFormulaire(formulaire.id)>0 &&
                <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
                    <div>
                        <IconButton onClick={()=>OpenSuiviBeneficier()}>
                            <ArrowBack  />
                        </IconButton>
                    </div>
                </div>

                }

            <SimpleCard >


                    { beneficiaires.length > 0 ? beneficiaires.map((beneficiaire,index)=>(
                       <FormBeneficiaire beneficiaire={beneficiaire} onChangeProfile={onChangeProfile} profil_baremes={profil_baremes} index={index} key={index} filterOptions={filterOptions} ListBeneficiares={ListBeneficiares}
                                         onChangeBeneficiaire={onChangeBeneficiaire} DatePickerFunction={DatePickerFunction} date_demarrage={formulaire.date_demarrage}
                                         addBeneficiaire={addBeneficiaire} classes={classes} cancelBeneficiaire={cancelBeneficiaire} SetBeneficiaire={SetBeneficiaire}
                       />
                    )): addBeneficiaire()

                    }



            </SimpleCard>
            <div className="flex justify-between items-center py-5">

                <Button variant="contained" color="secondary" className="pl-3 capitalize" onClick={closeDialog} >
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

export default BeneficiaireFormer;
