import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Moment from "react-moment";
import moment from "moment";

const TableBeneficiaire = ({beneficiaire,type}) => {

    return (
        <div className="viewer__billing-info flex justify-between">
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>

                            <TableCell className="px-0" align="center">N° Formulaire</TableCell>
                            <TableCell className="px-0" align="center">Employeur</TableCell>
                            <TableCell className="px-0" align="center">Secteur</TableCell>
                            <TableCell className="px-0" align="center">Profil</TableCell>
                            <TableCell className="px-0" align="center">Diplome</TableCell>
                            <TableCell className="px-0" align="center">Date d'embauche</TableCell>
                            <TableCell className="px-0" align="center">Période de la formation</TableCell>
                            <TableCell className="px-0" align="center">N° Facture</TableCell>
                            <TableCell className="px-0" align="center">Consommation</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { beneficiaire.formulaires.map((f,index)=>(
                            f.type === type &&
                            <TableRow key={index} >
                                <TableCell className="px-0" align="center">{f.formulaire.code}</TableCell>
                                <TableCell className="px-0" align="center">{f.formulaire.entreprise.raison_sociale}</TableCell>
                                <TableCell className="px-0" align="center">{f.formulaire.secteur.secteur}</TableCell>
                                <TableCell className="px-0" align="center">{f.formulaire.filiere.filiere}</TableCell>
                                <TableCell className="px-0 capitalize" align="center">{f.diplome}</TableCell>
                                <TableCell className="px-0" align="center" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(f.date_dembauche)}</Moment></TableCell>

                                <TableCell className="px-0" align="center"><Moment format="DD.MM.YYYY">{moment.utc(f.date_demarrage)}</Moment> <strong> - </strong><Moment format="DD.MM.YYYY">{moment.utc(f.date_achevement)}</Moment></TableCell>
                                <TableCell className="px-0" align="center">{f.formulaire.facture && f.formulaire.facture.length > 0 && f.formulaire.facture[0]['num_facture']}</TableCell>
                                <TableCell className="px-0" align="center">{f.consommation}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default TableBeneficiaire;
