import React, {useState,useContext,useEffect} from 'react';
import FormulaireContext from "../../context/formulaire/formulaireContext";
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import FactureContext from "../../context/facture/factureContext";
import BeneficiaireFormer from "../Beneficiaire/BeneficiaireFormer";
import SuiviBeneficiaire from "../Beneficiaire/SuiviBeneficiaire";
import PayerBeneficiaire from "../Beneficiaire/PayerBeneficiaire";
import SnackContext from "../../context/snack/snackContext";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import BeneficiaireBeneficier from "../Beneficiaire/BeneficiaireBeneficier";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow,TablePagination,TableContainer,Paper,Checkbox} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/styles";
import Moment from "react-moment";
import moment from "moment";
import FormDialog from "../Dialog/FormDialog";
import FormFacture from "../Facture/FormFacture";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import AfficherFormulaire from "./AfficherFormulaire";
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
const TableFormulaire = (props) => {
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [id, setID] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
    };
    const formulaireContext = useContext(FormulaireContext);
    const beneficiareContext = useContext(BeneficiareContext);
    const factureContext = useContext(FactureContext);
    const {openFacture,openDialogFacture,closeDialogFacture,factures,getFactures} = factureContext;

    const {openPersone,openDialogPersone,closeDialogPersone,beneficiaires,openBeneficier,openDialogBeneficier,closeDialogBeneficier,openSuivi,openSuiviBeneficier,closeSuiviBeneficier,openPayer,openPayerBeneficier,closePayerBeneficier,getBeneficiaires} = beneficiareContext;
    const {delete_formulaire,setFormulaire,openDialogue,openPrint,closePrint,print} = formulaireContext;


    useEffect(() => {
        getBeneficiaires();
        getFactures();
        // eslint-disable-next-line
    }, []);

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
    const deleteFormulaire =(id)=>{
        setID(id);
        setOpen(true);

    };
    const updateFormulaire=(formulaire)=>{
        setFormulaire(formulaire);
        openDialogue();
    };
    const getFormulaire=(formulaire)=>{
        setFormation(formulaire);
        openPrint();
    };
    const closeForm=()=>(closePrint());
    const openDialogBeneficiare=(formulaire)=>{
        setFormation(formulaire);
        openDialogPersone();
    };
    const closeFormBeneficiare=()=>{
        closeDialogPersone();
    };
    const onConfirmDialogClose =()=>{
        setOpen(false);
    };



    const OpenDialogFacture=(formulaire)=>{
        setFormation(formulaire);
        openDialogFacture();
    };
    const closeFormFacture=()=>(closeDialogFacture());


    const OpenDialogBeneficier=(formulaire)=>{
        setFormation(formulaire);
        openDialogBeneficier();
    };

    const OpenSuiviBeneficier=(formulaire)=>{
        setFormation(formulaire);
        openSuiviBeneficier();
    };

    const OpenPayerBeneficier=(formulaire)=>{
        setFormation(formulaire);
        openPayerBeneficier();
    };
    const CloseDialogPayer=()=>(closePayerBeneficier());
    const CloseDialogBeneficier=()=>(closeDialogBeneficier());
    const CloseDialogSuivi=()=>(closeSuiviBeneficier());

    const onYesClick =()=>{
        delete_formulaire(id);
        const error ={
            message:'Le formulaire a été bien supprimé.',
            variant:'error'
        };
        getSnack(error);
        setOpen(false);
    };

    const compteBeneficiairesFormulaire=(id)=>{
        let compte=0;
        beneficiaires.map((beneficiaire)=>{
            beneficiaire.formulaires.map((formulaire)=>{
                if(formulaire.formulaire.id===id){
                    ++compte;
                }
            })
        });
        return compte;
    };


    const montantBeneficiairesBeneficier=(item)=>{
        let montant=0;

        let data = Array.from(item);
        data.map((b)=>{

            if(b.beneficier){
                montant+=b.consommation;
            }

        });

        return montant;
    };


    const compteBeneficiairesBeneficier=(item)=>{
        let compte=0;

        let data = Array.from(item);
        data.map((b)=>{

            if(b.beneficier){
                ++compte;
            }

        });

        return compte;
    };


    const compteFactureFormulaire=(id)=>{
        let compte=0;
        factures.map(( facture)=>{

            if(facture.formulaire===id){
                ++compte;
            }

        });
        return compte;
    };
    return (
        <>

            <FormDialog titre={'Formulaire N°: '+ formation.code} open={print} closeDialog={closeForm} size='md' ><AfficherFormulaire formulaire={formation} closeDialog={closeForm}/> </FormDialog>

            <FormDialog titre={'les Personnes à Former de Formulaire N°: '+ formation.code} open={openPersone} closeDialog={closeFormBeneficiare} size='xl' ><BeneficiaireFormer formulaire={formation}/> </FormDialog>
            <FormDialog titre={'la Facture de Formulaire N°: '+ formation.code} open={openFacture} closeDialog={closeFormFacture} size='sm' ><FormFacture formulaire={formation}/> </FormDialog>
            <FormDialog titre={'les Personnes à Bénéficier de Formulaire N°: '+ formation.code} open={openBeneficier} closeDialog={CloseDialogBeneficier} size='lg' ><BeneficiaireBeneficier formulaire={formation}/> </FormDialog>
            <FormDialog titre={'Suivi les personnes à former de Formulaire N°: '+ formation.code} open={openSuivi} closeDialog={CloseDialogSuivi} size='xl' ><SuiviBeneficiaire formulaire={formation}/> </FormDialog>
            <FormDialog titre={'Suivi les personnes à bénéficier de Formulaire N°: '+ formation.code} open={openPayer} closeDialog={CloseDialogPayer} size='xl' ><PayerBeneficiaire formulaire={formation}/> </FormDialog>

            <TableContainer component={Paper}>
                <TransitionGroup >
                    <Table className="whitespace-pre">
                        <ConfirmationDialog open={open} onConfirmDialogClose={onConfirmDialogClose} title="Confirmation" text="Voulez vous supprimer ce formulaire?" onYesClick={onYesClick} />
                        <TableHead>
                            <TableRow className="bg-default">
                                <TableCell className="px-0" >Code</TableCell>
                                <TableCell align="center" className="px-0">Entreprises</TableCell>
                                <TableCell align="center" className="px-0">Secteurs</TableCell>
                                <TableCell align="center" className="px-0">Filières</TableCell>
                                <TableCell align="center" className="px-0">Date creation</TableCell>
                                <TableCell align="center" className="px-0">Coût formation</TableCell>
                                <TableCell align="center" className="px-0">Personnes à former</TableCell>
                                <TableCell align="center" className="px-0">N° Facture </TableCell>
                                <TableCell align="center" className="px-0">Personnes à bénéficier</TableCell>
                                <TableCell align="center" className="px-0">Montant à payer</TableCell>
                                <TableCell align="center" className="px-0">Validation</TableCell>
                                <TableCell align="center" >Actions</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {props.formulaires.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((formulaire, index) => (
                                    <CSSTransition
                                        key={index}
                                        timeout={500}
                                        classNames="item"
                                    >
                                        <TableRow key={index} >


                                            <TableCell className="px-0" colSpan={1}>
                                                {formulaire.code}
                                            </TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>{formulaire.entreprise.raison_sociale}</TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>{formulaire.secteur.secteur}</TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>{formulaire.filiere.filiere}</TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_creation)}</Moment></TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>{formulaire.montant+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)}</TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>

                                                {compteBeneficiairesFormulaire(formulaire.id) > 0 ?
                                                    <small className="lowercase bg-green text-white border-radius-4 px-2 cursor-pointer" onClick={() => OpenSuiviBeneficier(formulaire)} >
                                                        {compteBeneficiairesFormulaire(formulaire.id)}</small>
                                                    :
                                                    <small className="lowercase bg-green text-white border-radius-4 px-2 cursor-pointer" onClick={() => openDialogBeneficiare(formulaire)} >engager</small>
                                                }

                                            </TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>{compteBeneficiairesFormulaire(formulaire.id) > 0 ?
                                                compteFactureFormulaire(formulaire.id)> 0 ?
                                                    <small className=" bg-green text-white border-radius-4 px-2 cursor-pointer" onClick={() => OpenDialogFacture(formulaire)} >{formulaire.facture.map((facture)=>facture.num_facture)}</small>
                                                    :
                                                    <small className="lowercase bg-green text-white border-radius-4 px-2 cursor-pointer" onClick={() => OpenDialogFacture(formulaire)} >facturer</small>

                                                : <small className="lowercase bg-secondary text-white border-radius-4 px-2" >encours</small>}</TableCell>
                                            <TableCell align="center" className="px-0" colSpan={1}>{compteBeneficiairesFormulaire(formulaire.id) > 0 ?

                                                compteFactureFormulaire(formulaire.id)> 0 ?



                                                    compteBeneficiairesBeneficier(formulaire.beneficiaires) > 0

                                                        ?
                                                        <small className="lowercase bg-green text-white border-radius-4 px-2 cursor-pointer " onClick={() => OpenPayerBeneficier(formulaire)} > {compteBeneficiairesBeneficier(formulaire.beneficiaires)}</small>
                                                        :
                                                        <small className="lowercase bg-green text-white border-radius-4 px-2 cursor-pointer " onClick={() => OpenDialogBeneficier(formulaire)} >bénéficier</small>





                                                    :
                                                    <small className="lowercase bg-secondary text-white border-radius-4 px-2 " >encours</small>

                                                :
                                                <small className="lowercase bg-error text-white border-radius-4 px-2" >encours</small>}</TableCell>
                                            <TableCell align="center" className="px-0">
                                                {montantBeneficiairesBeneficier(formulaire.beneficiaires)+' MAD'}

                                            </TableCell>
                                            <TableCell align="center" className="px-0"> <small className="lowercase bg-primary text-white border-radius-4 px-2" >
                                                {compteBeneficiairesBeneficier(formulaire.beneficiaires) > 0 ?
                                                    'valider'
                                                    :
                                                    'encours'
                                                }


                                            </small></TableCell>


                                            <TableCell align="center"  colSpan={1}>
                                                <IconButton style={{padding:"3px "}}  onClick={() => getFormulaire(formulaire)} >
                                                    <SearchIcon fontSize="small" color="secondary" />
                                                </IconButton>
                                                <IconButton style={{padding:"3px "}} color="primary" onClick={() => updateFormulaire(formulaire)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton  style={{padding:"3px"}} onClick={() => deleteFormulaire(formulaire.id)} >
                                                    <DeleteIcon fontSize="small" className={classes.red}  />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    </CSSTransition>
                                ))}

                        </TableBody>

                    </Table>
                </TransitionGroup>
                <TablePagination
                    className="px-4"
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.formulaires.length}
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
        </>
    );
};

export default TableFormulaire;
