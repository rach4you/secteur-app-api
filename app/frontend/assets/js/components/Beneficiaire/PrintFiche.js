import React from 'react';
import { Card} from "@material-ui/core";
import logo from "../../../img/logo.jpg";
import TableBeneficiaire from "./TableBeneficiaire";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import Moment from "react-moment";
const useStyles = makeStyles(theme =>({
    logo: {
        display:"block",
        //  margin: "0.5rem auto",
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));
const PrintFiche = ({getConsommations,getCreditAlloue,totalFormulaireType,beneficiaire}) => {
    const classes =useStyles();
    const date=new Date();
    return (
        <div className="content">
            <div >


                <Card elevation={6} className="px-6  h-full  ">

                    <div className="viewer__billing-info px-4 py-5 flex justify-between">
                        <div>
                            <img src={logo} className={classes.logo}/>
                            <h5 className="font-normal mb-4 capitalize"><strong>Anapec/DP/DME</strong> </h5>
                        </div>
                        <div className="px-4 py-5">

                            <h5 className="font-normal mb-4 "><strong>FICHE DE SUIVI DES CONSOMMATIONS</strong> </h5>
                            <h5 className="font-normal mb-4 text-center"><strong>  SECTEURS EMERGENTS</strong> </h5>
                        </div>
                        <div>

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

                                <h5 className="font-normal mb-4 "> </h5>
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

                    <div className="viewer__order-info px-4 mb-4 flex justify-between">
                        <div>

                        </div>
                        <div>

                            <h5 className="font-normal mb-4 "><strong>Edité par la Division Mesures de l'emploi le <Moment format="DD/MM/YYYY">{moment.utc(date)}</Moment></strong></h5>
                        </div>
                        <div>

                        </div>
                    </div>

                </Card>
            </div>

        </div>
    );
};

export default PrintFiche;
