import React, { useRef} from 'react';

import Moment from "react-moment";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import Print from "./Print";

const useStyles = makeStyles(theme =>({
    logo: {
        display:"block",
        //  margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));
const AfficherFormulaire = ({formulaire, closeDialog}) => {

    const componentRef = useRef();
    const classes =useStyles();

    let global = 0;
    formulaire.modules.forEach((module)=>(global+=Number(module.horaire)));
    return (
        <div className="content">
            <Card elevation={6} className="px-6 py-5 h-full  ">

                <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
                    <div>
                        <IconButton onClick={closeDialog}>
                            <ArrowBack  />
                        </IconButton>



                    </div>
                    <div>

                        <ReactToPrint
                            trigger={() => ( <Button color="primary" variant="contained" className="mr-4 py-2 "  >
                                <PrintIcon fontSize="small"/> <span className="pl-2   capitalize">Annexe 3.2</span>
                            </Button>)}
                            content={() => componentRef.current}
                        />

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
            </Card>

            <div style={{ display: "none" }}>
                <div className=' py-3 h-full ' ref={componentRef}  >
                    <Print formulaire={formulaire}  />
                </div>
            </div>
        </div>
    );
};

export default AfficherFormulaire;
