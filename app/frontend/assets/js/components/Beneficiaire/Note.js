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

const Note = ({formulaire,nombre, total, user}) => {

    let montant = Number((formulaire.facture[0]['montant_dh'] / nombre).toFixed(2));

    const classes =useStyles();

    return (
        <div id="print-area">
            <div className="viewer__billing-info px-4 py-5 flex justify-between">
                <div>
                    <img src={logo} className={classes.logo}/><br/>
                    <strong>Anapec/DP/DME/SPM</strong>
                </div>
                <div>
                    <br/><br/>
                    <h5 className="font-normal mb-4  text-center"><strong>A Monsieur le trésorier Payeur de l'ANAPEC</strong> </h5> <br/>
                    <span> Note de présentation de calcul de la prime <strong>{formulaire.secteur.secteur}</strong> suite au PV du comité Technique</span>
                </div>
                <div className="text-right">
                </div>
            </div>
            <div className="viewer__billing-info  flex justify-between">
                <div >

                </div>
                <div>
                    <h5 className="font-normal mb-4  text-center"><strong>
                        Suivi des bénéficiaires de la formation

                    </strong> </h5>
                </div>
                <div >

                </div>
            </div>
            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div>
                    <h5 className="font-normal mb-4 capitalize"><strong>Formulaire N°:</strong> {formulaire.code}</h5>
                    <h5 className="font-normal mb-4 capitalize"><strong>Employeur:</strong> {formulaire.entreprise.raison_sociale}</h5>

                    <h5 className="font-normal mb-4 "><strong>Période de la Formation: du </strong> <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_demarrage)}</Moment> <strong> au </strong><Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_achevement)}</Moment></h5>

                </div>
                <div className="text-right">
                    <h5 className="font-normal mb-4 capitalize"><strong>Facture N°:</strong> {formulaire.facture[0]['num_facture']}</h5>
                    <h5 className="font-normal mb-4 capitalize"><strong>Opérateur:</strong> {formulaire.operateur.operateur}</h5>

                </div>
            </div>

            <div>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell className="px-0" align="center">Nom & Prénom</TableCell>
                                <TableCell className="px-0" align="center">CIN</TableCell>
                                <TableCell className="px-0" align="center">Profil_barème</TableCell>
                                <TableCell className="px-0" align="center">Date D'embauche</TableCell>

                                <TableCell className="px-0" align="center">Montant de la facture </TableCell>
                                <TableCell className="px-0" align="center">Montant à rembourser</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formulaire.beneficiaires.map((beneficiaire,index)=>(
                                beneficiaire.beneficier &&
                                <TableRow key={index} >
                                    <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.nom} {beneficiaire.beneficiaire.prenom}</TableCell>
                                    <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.cin}</TableCell>

                                    <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.profil_bareme}</TableCell>

                                    <TableCell className="px-0" align="center" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(beneficiaire.date_dembauche)}</Moment></TableCell>
                                    <TableCell className="px-0" align="center" colSpan={1}>{montant + ' MAD'}  </TableCell>

                                    <TableCell className="px-0" align="center" colSpan={1}><strong>{beneficiaire.consommation + ' MAD'} </strong></TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div className="px-4 flex justify-end">
            <div className="flex">
                <div className="pr-12">
                    <p className="mb-4"> </p>
                    <p className="mb-4"> <strong> Total : </strong> </p>
                   <p className="mb-4">  </p>
                </div>
                <div>
                    <p className="mb-4"> </p>
                    <p className="mb-4"><strong>{total} </strong> </p>
                    <p className="mb-4"> </p>
                </div>
            </div>
            </div>

            <div className="px-4 flex justify-end">
                <div className="flex">
                    <div className="pr-12">
                        <p className="mb-4">Le montant à rembourser par l'anapec selon le barème du manuel des procédures est : <strong>{total}</strong>.
                        </p>
                    </div>

                </div>

            </div>
<br/>
            <div className="viewer__order-info px-4 mb-4 flex justify-between">
                <div>
                    <h5 className="font-normal mb-4 "><strong>Etabli par :</strong> {user && user.employe.nom_employe+ ' '+ user.employe.prenom_employe}</h5>


                </div>
                <div>
                    <h5 className="font-normal mb-4 "><strong>Edité le : </strong> <Moment format="DD.MM.YYYY">{moment.utc(new Date())}</Moment> </h5>

                </div>

            </div>




        </div>
    );
};

export default Note;
