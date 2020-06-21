import React from 'react';
import Moment from "react-moment";
import moment from "moment";
import logo from "../../../img/logo.jpg";
import {makeStyles} from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
const useStyles = makeStyles(theme =>({
    logo: {
        display:"block",
        //  margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));

const PrintSuivi = ({formulaire,nombre}) => {
    const classes =useStyles();
    return (
        <div id="print-area">
<div className="viewer__billing-info px-4 py-5 flex justify-between">
    <div>
        <img src={logo} className={classes.logo}/>
    </div>
    <div className="text-right">
        <h5 className="font-normal mb-4 capitalize"><strong>Annexe 3.3</strong> </h5>
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
                    <h5 className="font-normal mb-4 capitalize text-center"><strong>ETAT DES PERSONNES A FORMER</strong> </h5>
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
                    <h5 className="font-normal mb-4 capitalize"><strong>Formulaire N°:</strong> {formulaire.code}</h5>
                    <h5 className="font-normal mb-4 capitalize"><strong>Employeur:</strong> {formulaire.entreprise.raison_sociale}</h5>
                    <h5 className="font-normal mb-4 capitalize"><strong>Opérateur:</strong> {formulaire.operateur.operateur}</h5>
                    <h5 className="font-normal mb-4 "><strong>Période de la Formation: du </strong> <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_demarrage)}</Moment> <strong> au </strong><Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_achevement)}</Moment></h5>

                </div>
                <div className="text-right">
                    <h5 className="font-normal mb-4 capitalize"><strong>Thème:</strong> {formulaire.theme}</h5>
                    <h5 className="font-normal mb-4 capitalize"><strong>Secteur:</strong> {formulaire.secteur.secteur}</h5>
                    <h5 className="font-normal mb-4 capitalize"><strong>Profil:</strong> {formulaire.filiere.filiere}</h5>
                    <h5 className="font-normal mb-4 "><strong>Nombre de bénéficiaires:</strong> {nombre}</h5>
                </div>
            </div>
            <div>

                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell className="px-0" align="center">Nom & Prénom</TableCell>
                                    <TableCell className="px-0" align="center">CIN</TableCell>
                                    <TableCell className="px-0" align="center">Diplome</TableCell>
                                    <TableCell className="px-0" align="center">Contrat</TableCell>
                                    <TableCell className="px-0" align="center">N° CI ou N° CNSS</TableCell>
                                    <TableCell className="px-0" align="center">Formation Suivi</TableCell>
                                    <TableCell className="px-0" align="center">Date D'embauche</TableCell>
                                    <TableCell className="px-0" align="center">EMARGEMENT</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formulaire.beneficiaires.map((beneficiaire,index)=>(
                                    <TableRow key={index} >
                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.nom} {beneficiaire.beneficiaire.prenom}</TableCell>
                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.cin}</TableCell>

                                        <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.diplome}</TableCell>

                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.contrat}</TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>
                                            {beneficiaire.beneficiaire.cnss}
                                        </TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>
                                            {beneficiaire.type}
                                        </TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(beneficiaire.date_dembauche)}</Moment></TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}> </TableCell>

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="viewer__billing-info px-4 py-5  flex justify-between">
                        <div >

                            <h5 className="font-normal mb-4 capitalize"><strong>Cachet et signature de l'employeur</strong></h5>
                        </div>

                        <div className="text-right">
                            <h5 className="font-normal mb-4 capitalize"><strong>Cachet et signature de l'opérateur de formation</strong> </h5>
                        </div>
                    </div>




            </div>

        </div>
    );
};

export default PrintSuivi;
