import React from 'react';
import Moment from "react-moment";
import moment from "moment";

import {makeStyles} from "@material-ui/core/styles";

import logo from "../../../img/logo.jpg";

const useStyles = makeStyles(theme =>({
    logo: {
        display:"block",
        //  margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));
const Print = ({formulaire}) => {


    const classes =useStyles();

    let global = 0;
    formulaire.modules.forEach((module)=>(global+=Number(module.horaire)));
    return (
        <div id="print-area">

            <div className="viewer__billing-info px-4 py-5 flex justify-between">
                <div>
                    <img src={logo} className={classes.logo}/>
                </div>
                <div className="text-right">
                    <h5 className="font-normal mb-4 capitalize"><strong>Annexe 3.2</strong> </h5>
                </div>
            </div>
            <div className="viewer__billing-info  flex justify-between">
                <div >

                </div>
                <div>
                    <h5 className="font-normal mb-4 capitalize text-center"><strong>AGENCE NATIONALE DE PROMOTION <br/>DE L'EMPLOI ET DES COMPETENCES </strong> </h5>
                </div>
                <div >

                </div>
            </div>


            <div className="viewer__billing-info  py-2 flex justify-between">
                <div >

                </div>
                <div>
                    <h5 className="font-normal mb-4 capitalize text-center"><strong>Formulaire N° </strong>  {formulaire.code}</h5>
                </div>
                <div >

                </div>
            </div>


            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div >

                </div>

                <div className="text-right">
                    <h5 className="font-normal mb-4  capitalize"><strong>Date de dépôt du dossier:</strong> <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_depot)}</Moment></h5>
                </div>
            </div>

                <div className="viewer__order-info px-4 mb-4 flex justify-between">
                    <div>

                        <h5 className="font-normal mb-4 capitalize"><strong>Entreprise:</strong> {formulaire.entreprise.raison_sociale}</h5>
                        <h5 className="font-normal mb-4 capitalize"><strong>Opérateur:</strong> {formulaire.operateur.operateur}</h5>
                        <h5 className="font-normal mb-4 "><strong> Lieu formation : </strong> {formulaire.lieu} </h5>
                        <h5 className="font-normal mb-4 "><strong>Date démarrage : </strong> <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_demarrage)}</Moment></h5>

                        <h5 className="font-normal mb-4 "><strong>Personnes à former:</strong>  {
                            formulaire.engager && formulaire.engager
                        }
                            {
                                formulaire.beneficiaires && formulaire.beneficiaires.length
                            }</h5>

                    </div>
                    <div className="text-right">

                        <h5 className="font-normal mb-4 capitalize"><strong>Thème:</strong> {formulaire.theme}</h5>
                        <h5 className="font-normal mb-4 capitalize"><strong>Secteur:</strong> {formulaire.secteur.secteur}</h5>
                        <h5 className="font-normal mb-4 capitalize"><strong>Profil:</strong> {formulaire.filiere.filiere}</h5>
                        <h5 className="font-normal mb-4 "><strong>Date achèvement : </strong> <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_achevement)}</Moment></h5>

                        <h5 className="font-normal mb-4 "><strong>Coût formation :</strong> {formulaire.montant+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)}</h5>
                    </div>
                </div>

            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div >
                    <h5 className="font-normal mb-4 "><strong> Plan de formation </strong> </h5>
                </div>

                <div className="text-right">

                </div>
            </div>
            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div className="text-right">

                </div>

                <div >
                    <h5 className="font-normal mb-4 "><strong> Modules </strong> </h5>
                </div>
                <div >
                    <h5 className="font-normal mb-4 "><strong> Volume horaire(h) </strong> </h5>
                </div>
                <div className="text-right">

                </div>
            </div>
            { formulaire.modules.map((module,index)=>(
            <div className="viewer__order-info  flex justify-between" key={index}>
                <div className="text-right">

                </div>

                <div >
                    <h5 className="font-normal mb-4 ">{module.module} </h5>
                </div>
                <div >
                    <h5 className="font-normal mb-4 ">{module.horaire} </h5>
                </div>
                <div className="text-right">

                </div>
            </div>
            ))}
            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div >
                    <h5 className="font-normal mb-4 "><strong>Volume horaire global :</strong> {global} h</h5>
                </div>


            </div>
            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div >
                    <h5 className="font-normal mb-4 "><strong>Compétences à acquérir :</strong> {formulaire.competence}</h5>
                </div>


            </div>

            <div className="viewer__billing-info px-4 py-5  flex justify-between">
                <div >

                    <h5 className="font-normal mb-4 capitalize"><strong>Cachet et signature de l'employeur</strong></h5>
                </div>

                <div className="text-right">
                    <h5 className="font-normal mb-4 capitalize"><strong>Cachet et signature de l'opérateur de formation</strong> </h5>
                </div>
            </div>

        </div>
    );
};

export default Print;