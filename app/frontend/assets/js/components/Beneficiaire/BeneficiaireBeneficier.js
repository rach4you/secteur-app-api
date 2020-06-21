import React, {useContext, useEffect, useRef, useState} from 'react';
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import SnackContext from "../../context/snack/snackContext";
import FormulaireContext from "../../context/formulaire/formulaireContext";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Card, Button, IconButton
} from "@material-ui/core";
import moment from "moment";
import Moment from "react-moment";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import SendIcon from "@material-ui/icons/Send";
import {ArrowBack} from "@material-ui/icons";
import FormDialog from "../Dialog/FormDialog";
import PayerBeneficiaire from "./PayerBeneficiaire";

const BeneficiaireBeneficier = (props) => {
    const snackContext = useContext(SnackContext);
    const formulaireContext = useContext(FormulaireContext);
    const {getSnack}=snackContext;
    const beneficiareContext = useContext(BeneficiareContext);
    const {closeDialogBeneficier,beneficiaires,update_beneficiaire,openPayer,closePayerBeneficier,openPayerBeneficier,getBeneficiaires,updateFormulaireBeneficiaire}=beneficiareContext;
    useEffect(() => {
        getBeneficiaires();
    if (props.formulaire !== null) {

        if(props.formulaire.facture.length>0){

            props.formulaire.beneficiaires.map((b)=>{
                if(b.beneficier){
                    setNbeneficier(nbeneficier+1);
                }
            });
            setFormulaire(props.formulaire);

        }
    }
}, []);
    const [nbeneficier, setNbeneficier] = useState(0);
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
            beneficier:false,
            non_conforme:false,
        }],
        facture:[{
            id:null,
            num_facture:'',
            date_facture:null,
            mttc:0,
           // devise:null,
            montant_dh:0,
            commentaire:''
        }]
    });
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

   // const [beneficiaire,setBeneficiaire]=useState(null);
    const getBeneficiaire=(id,consommation,formulaire_id,cnss,facture,non_conforme)=>{

        let beneficiaire = null;
        beneficiaires.map((b)=>{
            if( b.id === id) {
                b.cnss=cnss;
                b.formulaires.map((formulaire,index)=>{
                    if(formulaire.formulaire.id === formulaire_id){
                        b.formulaires[index].consommation=consommation;
                        b.formulaires[index].beneficier=true;
                        b.formulaires[index].facture=facture;
                        b.formulaires[index].non_conforme=non_conforme;
                    }

                });
                beneficiaire=b;
            }
        });
        return beneficiaire;
    };

    const CloseDialogPayer=()=>(closePayerBeneficier());
    const OpenPayerBeneficier=()=>{

        setFormation(formulaire);
        closeDialogBeneficier();
        openPayerBeneficier();
    };
    const compteBeneficiairesFormulaire=()=>{
        let compte=0;
        beneficiaires.map(( beneficiaire)=>{
            beneficiaire.formulaires.map((f)=>{
                if(formulaire.id === f.formulaire.id && f.beneficier){
                    ++compte;
                }
            })
        });
        return compte;
    };

    const CloseDialogBeneficier=()=>(closeDialogBeneficier());
    const form = useRef('');

    const getCreditAlloue=(item)=>{

        let tab=[] ;


        beneficiaires.map((b)=>{
            if(b.id === item.beneficiaire.id){
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



                    if(item.type === 'FE'){
                        tab.push(credit_alloue_fe);
                    }else{
                        tab.push(credit_alloue_fc);
                    }
                });
            }
        });

        return Math.min(...tab);

    };

    const getConsommations=(item)=>{
        let total=0;
        beneficiaires.map((b) =>{

                if( b.id === item.beneficiaire.id ){
                    b.formulaires.map((f)=>{

                        if(f.type === item.type){

                            total+=f.consommation
                        }

                    });

                }

            }
        );
        return total;
    };
    const onSubmit = (e)=> {
        e.preventDefault();
        const success ={
            message:'Les personnes à bénéficier ont été bien enregistrés.',
            variant:'success'
        };
        const info ={
            message:'Les personnes à bénéficier ont été bien modifiés.',
            variant:'info'
        };
        let montant = Number((formulaire.facture[0]['montant_dh'] / nbeneficier).toFixed(2));


        formulaire.beneficiaires.map((beneficiaire,index)=>{

                  if(beneficiaire.beneficier){
                      let  montant_payer = montant;
                      let engager = null;

                      if((beneficiaire.non_conforme) || (beneficiaire.type==='CE') ){
                          montant_payer = 0;
                      }else{


                          if(formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length) !== 'MAD'){

                              if( Number((beneficiaire.engagement * formulaire.facture[0]['taux']).toFixed(2)) < montant_payer ){

                                  montant_payer=Number((beneficiaire.engagement * formulaire.facture[0]['taux']).toFixed(2));
                              }
                              if((getCreditAlloue(beneficiaire) - getConsommations(beneficiaire)) < montant_payer){
                                  montant_payer= getCreditAlloue(beneficiaire) - getConsommations(beneficiaire);
                              }
                          }else{
                              if(beneficiaire.engagement < montant_payer){

                                  montant_payer=beneficiaire.engagement;
                              }
                              if((getCreditAlloue(beneficiaire) - getConsommations(beneficiaire)) < montant_payer){
                                  montant_payer= getCreditAlloue(beneficiaire) - getConsommations(beneficiaire);
                              }

                          }



                      }

                      beneficiaire.consommation=montant_payer;

                      engager = {

                          consommation:beneficiaire.consommation,
                          non_conforme:beneficiaire.non_conforme,
                          beneficier:true

                      };
                        let cnss = null;
                      beneficiaires.map((b)=>{
                          if(b.id===beneficiaire.beneficiaire.id){
                              if(b.cnss === ''){
                                  cnss=beneficiaire.beneficiaire.cnss;
                              }
                          }
                      });
                     // console.log(cnss);
                     updateFormulaireBeneficiaire(getBeneficiaire(beneficiaire.beneficiaire.id,beneficiaire.consommation,formulaire.id,beneficiaire.beneficiaire.cnss,formulaire.facture,beneficiaire.non_conforme),engager,beneficiaire.id,cnss,beneficiaire.beneficiaire.id);

                  }



            return beneficiaire;

        });

        setFormulaire({ ...formulaire});
       formulaireContext.update_formulaire(formulaire);
        getSnack(success);
        CloseDialogBeneficier();

    };
    const onChangeCnss = (index) => e =>{

        formulaire.beneficiaires[index]['beneficiaire']['cnss'] = e.target.value;
        setFormulaire({ ...formulaire});

    };
    const onChange = (name,index) => e =>{

        if(name==='beneficier'){
            if(e.target.checked){
                formulaire.beneficiaires[index][name]=true;
                setFormulaire({ ...formulaire});
                setNbeneficier(nbeneficier+1);
            }else{
                formulaire.beneficiaires[index][name]=false;
                setFormulaire({ ...formulaire});
                setNbeneficier(nbeneficier-1);
            }
        }
        if(name==='non_conforme'){
            if(e.target.checked){
                formulaire.beneficiaires[index][name]=true;
                setFormulaire({ ...formulaire});
            }else{
                formulaire.beneficiaires[index][name]=false;
                setFormulaire({ ...formulaire});
            }
        }

      // console.log(name,index,e.target.checked)
    };
    return (
        <div>
            <FormDialog titre={'Suivi les personnes à bénéficier de Formulaire N°: '+ formation.code} open={openPayer} closeDialog={CloseDialogPayer} size='xl' ><PayerBeneficiaire formulaire={formation}/> </FormDialog>

            <ValidatorForm
                ref={form}
                onSubmit={onSubmit}
                onError={errors => null}
            >
                {compteBeneficiairesFormulaire(formulaire.id)>0 &&
                <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
                    <div>
                        <IconButton onClick={()=>OpenPayerBeneficier()} >
                            <ArrowBack  />
                        </IconButton>
                    </div>
                </div>

                }
            <Card elevation={6} className="px-6 py-5 h-full">

                <div className="overflow-auto">

            <TableContainer component={Paper}>
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-0" align="center">Bénificier</TableCell>
                            <TableCell className="px-0" align="center">CIN</TableCell>
                            <TableCell className="px-0" align="center">Nom</TableCell>
                            <TableCell className="px-0" align="center">Prenom</TableCell>
                            <TableCell className="px-0" align="center">Diplome</TableCell>
                            <TableCell className="px-0" align="center">Profil</TableCell>
                            <TableCell className="px-0" align="center">Contrat</TableCell>
                            <TableCell className="px-0" align="center">N° CI ou N° CNSS</TableCell>
                            <TableCell className="px-0" align="center">Date D'embauche</TableCell>
                            <TableCell className="px-0" align="center">Engagement</TableCell>
                            <TableCell className="px-0" align="center">Non Conforme</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.formulaire.beneficiaires.map((beneficiaire,index)=>(
                            <TableRow key={index} >
                                <TableCell className="px-0" align="center" colSpan={1}>
                                    <Checkbox
                                        checked={beneficiaire.beneficier && beneficiaire.beneficier}
                                        onChange={onChange("beneficier",index)}
                                        value="beneficier"
                                        color="primary"
                                        inputProps={{
                                            "aria-label": "secondary checkbox"
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.cin}</TableCell>
                                <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.nom}</TableCell>
                                <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.prenom}</TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.diplome}</TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.profil_bareme}</TableCell>
                                <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.contrat}</TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}>
                                    <TextValidator
                                        className="mb-4 "
                                        label="N° Cnss"
                                        onChange={onChangeCnss(index)}
                                        type="text"
                                        name='cnss'
                                        value={beneficiaire.beneficiaire.cnss}
                                       validators={beneficiaire.beneficier ? ["required"] : [] }
                                      errorMessages={beneficiaire.beneficier ? ["Veuillez saisir le N° CI ou  N°CNSS"] :[] }

                                    />
                                </TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(beneficiaire.date_dembauche)}</Moment></TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.engagement+' '+ props.formulaire.devise.devise.slice(props.formulaire.devise.devise.length-3,props.formulaire.devise.devise.length)}</TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}>
                                    <Checkbox

                                        onChange={onChange("non_conforme",index)}
                                        value="conforme"
                                        checked={beneficiaire.non_conforme && beneficiaire.non_conforme}
                                        color="secondary"
                                        inputProps={{
                                            "aria-label": "primary checkbox"
                                        }}
                                    />
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
                </div>
            </Card>
                <div className="flex justify-between items-center py-5">

                    <Button variant="contained" color="secondary" className="pl-3 capitalize" onClick={CloseDialogBeneficier} >
                        Annuler
                    </Button>

                    <Button color="primary" variant="contained" type="submit" disabled={nbeneficier ===0 ? true: false}>
                        <SendIcon fontSize="small" />
                        <span className="pl-2 capitalize">Envoyer</span>
                    </Button>

                </div>

            </ValidatorForm>
        </div>
    );
};

export default BeneficiaireBeneficier;
