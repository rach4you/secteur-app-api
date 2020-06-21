import React, {useContext, useState} from 'react';
import FormulaireContext from "../../context/formulaire/formulaireContext";
import {
    Card,

    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import moment from "moment";
import Moment from "react-moment";
import AfficherFormulaire from "../Formulaires/AfficherFormulaire";
import FormDialog from "../Dialog/FormDialog";
const DernierFormulaire = ({filteres}) => {

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
    const [open, setOpen] = useState(false);
    const formulaireContext = useContext(FormulaireContext);
    const {openPrint,print,closePrint} = formulaireContext;
    const getFormulaire=(formulaire)=>{
        setFormation(formulaire);
        openPrint();
    };
    const closeForm=()=>(closePrint());
    return (
        <div>
            <FormDialog titre={'Formulaire N°: '+ formation.code} open={print} closeDialog={closeForm} size='md' ><AfficherFormulaire formulaire={formation} closeDialog={closeForm}/> </FormDialog>
            <Card elevation={3} className="pt-5 mb-6">
                <div className="card-title px-6 mb-3">Les  derniers formulaires crées</div>
                <div className="overflow-auto">
                    <Table className="product-table">
                        <TableHead>


                            <TableRow>
                                <TableCell className="px-4" colSpan={2}>
                                    Code
                                </TableCell>
                                <TableCell className="px-0" colSpan={2}>
                                    Secteur
                                </TableCell>
                                <TableCell className="px-0" colSpan={2}>
                                    Filière
                                </TableCell>
                                <TableCell className="px-0" colSpan={2}>
                                    Entreprise
                                </TableCell>
                                <TableCell className="px-0" colSpan={2}>
                                    Coût formation
                                </TableCell>
                                <TableCell className="px-0" colSpan={2}>
                                    Date création
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { filteres && filteres.map((formulaire, index)=> (

                                <TableRow key={index}>
                                    <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                        {formulaire.code}
                                    </TableCell>
                                    <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                        {formulaire.secteur.secteur}
                                    </TableCell>
                                    <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                        {formulaire.filiere.filiere}
                                    </TableCell>
                                    <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                        {formulaire.entreprise.raison_sociale}
                                    </TableCell>
                                    <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                        {formulaire.montant+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)}
                                    </TableCell>
                                    <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                        <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_creation)}</Moment>
                                    </TableCell>


                                    <TableCell className="px-0" colSpan={1}>
                                        <IconButton style={{padding:"3px "}}  onClick={() => getFormulaire(formulaire)} >
                                            <SearchIcon fontSize="small" color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default DernierFormulaire;
