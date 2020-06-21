import React, {useContext, useRef, useState} from 'react';
import {
    Button,
    Card,
     IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import PrintSuivi from "./PrintSuivi";
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import PrintIcon from '@material-ui/icons/Print';
import Moment from "react-moment";
import moment from "moment";
import {ArrowBack} from "@material-ui/icons";
import FormDialog from "../Dialog/FormDialog";
import BeneficiaireFormer from "./BeneficiaireFormer";
import ReactToPrint from "react-to-print";

const SuiviBeneficiaire = ({formulaire}) => {
    const beneficiareContext = useContext(BeneficiareContext);
    const {closeSuiviBeneficier,beneficiaires,openDialogPersone,openPersone,closeDialogPersone} = beneficiareContext;
    const componentRef = useRef();
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
    const closeDialog=()=>{
        closeSuiviBeneficier();
    };
    const modifier=(formulaire)=>{
        closeSuiviBeneficier();
        setFormation(formulaire);
        openDialogPersone();
    };
    const compteBeneficiairesFormulaire=()=>{
        let compte=0;
        beneficiaires.map(( beneficiaire)=>{
            beneficiaire.formulaires.map((f)=>{
                if(formulaire.id===f.formulaire.id){
                    ++compte;
                }
            })
        });
        return compte;
    };
    const montantBeneficiairesEngager=()=>{
        let montant=0;
        beneficiaires.map(( beneficiaire)=>{
            beneficiaire.formulaires.map((f)=>{
                if(formulaire.id===f.formulaire.id){
                    montant+=f.engagement;
                }
            })
        });
        return montant;
    };
    const closeFormBeneficiare=()=>{
        closeDialogPersone();
    };
    return (
        <div className="content">
            <FormDialog titre={'les Personnes à Former de Formulaire N°: '+ formation.code} open={openPersone} closeDialog={closeFormBeneficiare} size='xl' ><BeneficiaireFormer formulaire={formation} /> </FormDialog>

            <div >

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
                                <PrintIcon fontSize="small"/> <span className="pl-2   capitalize">Annexe 3.3</span>
                            </Button>)}
                            content={() => componentRef.current}
                        />

                        <Button variant="contained" color="secondary" className="py-2 " onClick={()=>modifier(formulaire)} >
                            Modifier
                        </Button>
                    </div>


                </div>
                <div className="viewer__order-info px-4 mb-4 flex justify-between">
                   <div>

                       <h5 className="font-normal mb-4 capitalize"><strong>Employeur:</strong> {formulaire.entreprise.raison_sociale}</h5>
                       <h5 className="font-normal mb-4 capitalize"><strong>Opérateur:</strong> {formulaire.operateur.operateur}</h5>
                       <h5 className="font-normal mb-4 "><strong>Période de la Formation: du </strong> <Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_demarrage)}</Moment> <strong> au </strong><Moment format="DD.MM.YYYY">{moment.utc(formulaire.date_achevement)}</Moment></h5>
                   </div>
                    <div className="text-right">

                        <h5 className="font-normal mb-4 capitalize"><strong>Thème:</strong> {formulaire.theme}</h5>
                        <h5 className="font-normal mb-4 capitalize"><strong>Secteur:</strong> {formulaire.secteur.secteur}</h5>
                        <h5 className="font-normal mb-4 capitalize"><strong>Profil:</strong> {formulaire.filiere.filiere}</h5>
                    </div>
                </div>

                <div className="viewer__billing-info px-4 py-5 flex justify-between">
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>

                                    <TableCell className="px-0" align="center">CIN</TableCell>
                                    <TableCell className="px-0" align="center">Nom</TableCell>
                                    <TableCell className="px-0" align="center">Prenom</TableCell>
                                    <TableCell className="px-0" align="center">Diplome</TableCell>
                                    <TableCell className="px-0" align="center">Profil</TableCell>
                                    <TableCell className="px-0" align="center">Contrat</TableCell>
                                    <TableCell className="px-0" align="center">N° CI ou N° CNSS</TableCell>
                                    <TableCell className="px-0" align="center">Formation Suivi</TableCell>
                                    <TableCell className="px-0" align="center">Date D'embauche</TableCell>
                                    <TableCell className="px-0" align="center">Engagement</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formulaire.beneficiaires.map((beneficiaire,index)=>(
                                    <TableRow key={index} >

                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.cin}</TableCell>
                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.nom}</TableCell>
                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.beneficiaire.prenom}</TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.diplome}</TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.profil_bareme}</TableCell>
                                        <TableCell className="px-0 uppercase" align="center" colSpan={1}>{beneficiaire.contrat}</TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>
                                            {beneficiaire.beneficiaire.cnss}
                                        </TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>
                                            {beneficiaire.type}
                                        </TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}><Moment format="DD.MM.YYYY">{moment.utc(beneficiaire.date_dembauche)}</Moment></TableCell>
                                        <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.engagement+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)}</TableCell>

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>
                <div className="px-4 flex justify-end">
                    <div className="flex">
                        <div className="pr-12">
                            <p className="mb-4"> Nombre des personnes à former :</p>
                            <p className="mb-4"> Montant de la formation :</p>
                            <strong><p > Montant à rembourser :</p></strong>
                        </div>
                        <div>
                            <p className="mb-4">{compteBeneficiairesFormulaire()}</p>
                            <p className="mb-4"> {formulaire.montant+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)} </p>
                            <p><strong>{montantBeneficiairesEngager()+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)} </strong></p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
            <div style={{ display: "none" }}>
                <div className=' py-3 h-full ' ref={componentRef}  >
                   <PrintSuivi formulaire={formulaire} nombre={compteBeneficiairesFormulaire()} />
                </div>
            </div>

        </div>

    );
};

export default SuiviBeneficiaire;
