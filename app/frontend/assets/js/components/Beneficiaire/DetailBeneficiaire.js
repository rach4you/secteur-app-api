import React, {useContext, useState} from 'react';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import Moment from "react-moment";
import moment from "moment";

import SearchIcon from "@material-ui/icons/Search";
import FormDialog from "../Dialog/FormDialog";
import FicheBeneficiaire from "./FicheBeneficiaire";
import UpdateBeneficiaire from "./UpdateBeneficiaire";
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/styles";
import SnackContext from "../../context/snack/snackContext";

const useStyles= makeStyles({
    red: {
        color: "#e53935",
        vertical:'align',
        verticalAlign:'middle'
    },
    cursor:{
        cursor:'pointer'
    }
});
const DetailBeneficiaire = (props) => {
    const beneficiareContext = useContext(BeneficiareContext);
    const {closeDialogBeneficiaire,openBeneficiaire,openDialogBeneficiaire,openBeneficier,openDialogBeneficier,closeDialogBeneficier,update_beneficiaire_user,delete_beneficiaire} = beneficiareContext;
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const classes = useStyles();
    const [b,setB]=useState(null);
    const [id, setID] = useState('');
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const OpenDialogBeneficiaire=(beneficiaire)=>{


        // closePayerBeneficier();
        setB(beneficiaire);
        openDialogBeneficiaire();
    };
    const OpenDialogUpdateBeneficiaire=(beneficiaire)=>{

        setB(beneficiaire);
        openDialogBeneficier();
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
    };

    const onYesClick =()=>{
       delete_beneficiaire(id);
        const error ={
            message:'Le bénéficiaire a été bien supprimé.',
            variant:'error'
        };
        getSnack(error);
        setOpen(false);
    };
    const onConfirmDialogClose =()=>{
        setOpen(false);
    };
    const deleteBeneficiaire =(id)=>{
        setID(id);
        setOpen(true);

    };
   // console.log(props.beneficiaires);
    return (
        <div>
            <FormDialog titre={'FICHE DE SUIVI DES CONSOMMATIONS: '} open={openBeneficiaire} closeDialog={closeDialogBeneficiaire} size='lg' ><FicheBeneficiaire b={b}/> </FormDialog>
            <FormDialog titre={'MODIFIER  BENEFICIAIRE: '} open={openBeneficier} closeDialog={closeDialogBeneficier}  ><UpdateBeneficiaire candidat={b} closeDialogBeneficier={closeDialogBeneficier} update_beneficiaire_user={update_beneficiaire_user}/> </FormDialog>

            <TableContainer component={Paper}>

                    <Table className="whitespace-pre">
                        <ConfirmationDialog open={open} onConfirmDialogClose={onConfirmDialogClose} title="Confirmation" text="Voulez vous supprimer ce bénéficiaire?" onYesClick={onYesClick} />

                        <TableHead>
                            <TableRow className="bg-default">
                                <TableCell className="px-0" >CIN</TableCell>
                                <TableCell align="center" className="px-0">Nom</TableCell>
                                <TableCell align="center" className="px-0">Prénom</TableCell>
                                <TableCell align="center" className="px-0">Tel</TableCell>
                                <TableCell align="center" className="px-0">Email</TableCell>
                                <TableCell align="center" className="px-0">Cnss</TableCell>
                                <TableCell align="center" className="px-0">Date création</TableCell>

                                <TableCell align="center" >Actions</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.beneficiaires.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((beneficiaire, index) => (

                                    <TableRow key={index} >


                                        <TableCell className="px-0" colSpan={1}>
                                            {beneficiaire.cin}
                                        </TableCell>
                                        <TableCell align="center" className="px-0" colSpan={1}>{beneficiaire.nom}</TableCell>
                                        <TableCell align="center" className="px-0" colSpan={1}>{beneficiaire.prenom}</TableCell>
                                        <TableCell align="center" className="px-0" colSpan={1}>{beneficiaire.tel}</TableCell>
                                        <TableCell align="center" className="px-0" colSpan={1}>{beneficiaire.email}</TableCell>
                                        <TableCell align="center" className="px-0" colSpan={1}>{beneficiaire.cnss}</TableCell>
                                        <TableCell align="center" className="px-0" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(beneficiaire.date_creation)}</Moment></TableCell>
                                        <TableCell align="center"  colSpan={1}>
                                            <IconButton style={{padding:"3px "}}   >
                                                <SearchIcon fontSize="small" color="secondary" onClick={() => OpenDialogBeneficiaire(beneficiaire)}/>
                                            </IconButton>
                                            <IconButton style={{padding:"3px "}} color="primary" onClick={() => OpenDialogUpdateBeneficiaire(beneficiaire)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton  style={{padding:"3px"}} onClick={() => deleteBeneficiaire(beneficiaire.id)} >
                                                <DeleteIcon fontSize="small" className={classes.red}  />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                    </Table>
                <TablePagination
                    className="px-4"
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.beneficiaires.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
   <div>

            </div>
        </div>
    );
};

export default DetailBeneficiaire;