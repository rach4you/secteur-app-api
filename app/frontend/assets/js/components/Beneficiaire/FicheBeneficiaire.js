import React, {useContext, useEffect, useRef, useState} from 'react';
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import TableBeneficiaire from "./TableBeneficiaire";
import PrintFiche from "./PrintFiche";
import {
    Button,
    Card,
    IconButton,

} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";

const FicheBeneficiaire = ({b}) => {
    //console.log(b);
    const beneficiareContext = useContext(BeneficiareContext);
    const componentRef = useRef();
    const[beneficiaire,setBeneficiaire]=useState({
        id: '',
        cin:'',
        nom:'',
        prenom:'',
        tel:'',
        email:'',
        ancien:false,
        cnss:'',
        formulaires:[]
    });
    const {closeDialogBeneficiaire,beneficiaires} = beneficiareContext;
    useEffect(() => {
        setBeneficiaire(getBeneficiaire(b));
        // eslint-disable-next-line
    }, []);
    const getBeneficiaire=(beneficiaire)=>{
        let person = null;
        beneficiaires.map((p)=>{
            if(p.id===beneficiaire.id){
                person=p;
            }
        });
        return person;
    };
    const CloseDialogBeneficiaire=()=>{
        closeDialogBeneficiaire();
    };
    const getCreditAlloue=(type)=>{


        let tab=[] ;

        beneficiaires.map((p)=>{
            if(p.id === b.id){
                p.formulaires.map((f)=>{
                    //   console.log(f,item.type);

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


                    if(type === 'FE'){
                        tab.push(credit_alloue_fe);
                    }else{
                        tab.push(credit_alloue_fc);
                    }
                });
            }
        });

        return Math.min(...tab);

    };
    const getConsommations=(type)=>{
        let total=0;
        beneficiaires.map((p) =>{

                if( p.id === b.id ){
                    p.formulaires.map((f)=>{

                        if(f.type === type){

                            total+=f.consommation
                        }

                    });

                }

            }
        );
        return total;
    };

    const totalFormulaireType=(type)=>{
        let total=0;
        beneficiaires.map((p) =>{

                if( p.id === b.id ){
                    p.formulaires.map((f)=>{

                        if(f.type === type){

                            ++total;
                        }

                    });

                }

            }
        );
        return total;
    };
   // console.log(beneficiaire);
    return (
        <div className="content">
            <div >
                <Card elevation={6} className="px-6 py-5 h-full  ">
                    <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
                        <div>
                            <IconButton onClick={CloseDialogBeneficiaire}>
                                <ArrowBack  />
                            </IconButton>

                        </div>
                        <div>

                            <ReactToPrint
                                trigger={() => ( <Button color="primary" variant="contained" className="mr-4 py-2 "  >
                                    <PrintIcon fontSize="small"/> <span className="pl-2   capitalize">Imprimer</span>
                                </Button>)}
                                content={() => componentRef.current}
                            />


                        </div>


                    </div>


                    <div className="viewer__order-info px-4 mb-4 flex justify-between">
                        <div>

                            <h5 className="font-normal mb-4 capitalize"><strong> Informations Personnelles :</strong> </h5>
                        </div>

                    </div>

                    <div className="viewer__order-info px-4 mb-4 flex justify-between">
                        <div>
                            <h5 className="font-normal mb-4 uppercase"><strong>CIN :</strong><span className="font-normal mb-4 uppercase"> {beneficiaire.cin}</span></h5>
                            <h5 className="font-normal mb-4 "><strong>Nom :</strong> <span className="font-normal mb-4 uppercase">{beneficiaire.nom}</span></h5>
                            <h5 className="font-normal mb-4 "><strong>Prénom:</strong> <span className="font-normal mb-4 uppercase">{beneficiaire.prenom}</span></h5>
                                 </div>
                        <div className="text-right">

                            <h5 className="font-normal mb-4 uppercase"><strong>CI ou CNSS:</strong> {beneficiaire.cnss}</h5>
                            <h5 className="font-normal mb-4 "><strong>GSM:</strong> {beneficiaire.tel}</h5>
                            {beneficiaire.email &&
                            <h5 className="font-normal mb-4 "><strong>Email:</strong> {beneficiaire.email}</h5>
                            }

                        </div>
                    </div>

                    { totalFormulaireType('FE') > 0 &&
                    <>
                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>

                                <h5 className="font-normal mb-4 "><strong> Formations à l'embauche :</strong> </h5>
                            </div>

                        </div>
                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>

                            </div>
                            <div>

                                <h5 className="font-normal mb-4 "><strong> Crédit alloué FE : </strong> {getCreditAlloue('FE')} MAD </h5>
                            </div>
                            <div>

                            </div>
                        </div>
                        <TableBeneficiaire beneficiaire={beneficiaire} type={'FE'}/>
                        <div className="px-4 flex justify-end">
                            <div className="flex">
                                <div className="pr-12">

                                    <strong><p >Reste à consommer :</p></strong>
                                </div>
                                <div>
                                    <p className="mb-4 pr-8">{(getCreditAlloue('FE') - getConsommations('FE')).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                    </>

                    }
                    { totalFormulaireType('FC') > 0 &&
                    <>
                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>

                                <h5 className="font-normal mb-4 "><strong> Formations continues :</strong> </h5>
                            </div>

                        </div>
                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>

                            </div>
                            <div>

                                <h5 className="font-normal mb-4 "><strong> Crédit alloué FC : </strong> {getCreditAlloue('FC')} MAD </h5>
                            </div>
                            <div>

                            </div>
                        </div>
                        <TableBeneficiaire beneficiaire={beneficiaire} type={'FC'}/>
                        <div className="px-4 flex justify-end">
                            <div className="flex">
                                <div className="pr-12">

                                    <strong><p >Reste à consommer :</p></strong>
                                </div>
                                <div>
                                    <p className="mb-4 pr-8">{(getCreditAlloue('FC') - getConsommations('FC')).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </>

                    }

                    { totalFormulaireType('CE') > 0 &&
                    <>
                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>

                                <h5 className="font-normal mb-4 "><strong> Formations Expérés :</strong> </h5>
                            </div>

                        </div>
                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                        <TableBeneficiaire beneficiaire={beneficiaire} type={'CE'}/>
                        <div className="px-4 flex justify-end">
                            <div className="flex">
                                <div className="pr-12">

                                    <strong><p >Reste à consommer :</p></strong>
                                </div>
                                <div>
                                    <p className="mb-4 pr-8">0</p>
                                </div>
                            </div>
                        </div>
                    </>

                    }

                </Card>
            </div>
            <div style={{ display: "none" }}>
                <div className=' py-3 h-full ' ref={componentRef}  >
                    <PrintFiche getCreditAlloue={getCreditAlloue}  getConsommations={getConsommations} totalFormulaireType={totalFormulaireType} beneficiaire={beneficiaire}/>
                </div>
            </div>
        </div>
    );
};

export default FicheBeneficiaire;
