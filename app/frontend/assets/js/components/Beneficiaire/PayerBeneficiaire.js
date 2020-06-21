import React, {useContext, useEffect, useRef, useState} from 'react';
import BeneficiareContext from "../../context/beneficiaire/beneficiaireContext";
import FormDialog from "../Dialog/FormDialog";
import {
    Button,
    Card,
    IconButton,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import Moment from "react-moment";
import moment from "moment";
import PrintPayer from "./PrintPayer";
import BeneficiaireBeneficier from "./BeneficiaireBeneficier";
import FicheBeneficiaire from "./FicheBeneficiaire";
import Note from "./Note";
import AuthContext from "../../context/auth/authContext";

const PayerBeneficiaire = ({formulaire}) => {
    useEffect(() => {

        loadUser();

    }, []);
    const authContext = useContext(AuthContext);
    const { user, loadUser } = authContext;
    const beneficiareContext = useContext(BeneficiareContext);
    const {closePayerBeneficier,beneficiaires,openBeneficier,openDialogBeneficier,closeDialogBeneficier,openDialogBeneficiaire,closeDialogBeneficiaire,openBeneficiaire} = beneficiareContext;
    const componentRef = useRef();
    const componentRefNote = useRef();
    const [b,setB]=useState(null);
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
        closePayerBeneficier();
    };
    const modifier=(formulaire)=>{
        closePayerBeneficier();
        setFormation(formulaire);
        openDialogBeneficier();
    };
    const compteBeneficiairesFormulaire=()=>{
        let compte=0;
        beneficiaires.map(( beneficiaire)=>{
            beneficiaire.formulaires.map((f)=>{
                if(formulaire.id === f.formulaire.id && f.beneficier){
                    ++compte;
                }
            })
        });
        return compte;
    };
    const montantBeneficiairesConsommation=()=>{
        let montant=0;
        beneficiaires.map(( beneficiaire)=>{
            beneficiaire.formulaires.map((f)=>{
                if(formulaire.id===f.formulaire.id){
                    montant+=f.consommation;
                }
            })
        });
        return montant;
    };
    const CloseDialogBeneficier=()=>{
        closeDialogBeneficier();
    };
    const CloseDialogBeneficiaire=()=>{
        closeDialogBeneficiaire();
    };

    const OpenDialogBeneficiaire=(beneficiaire)=>{


       // closePayerBeneficier();
        setB(beneficiaire);
        openDialogBeneficiaire();
    };
    return (
        <div className="content">

            <FormDialog titre={'les Personnes à Bénéficier de Formulaire N°: '+ formation.code} open={openBeneficier} closeDialog={CloseDialogBeneficier} size='lg' ><BeneficiaireBeneficier formulaire={formation}/> </FormDialog>
            <FormDialog titre={'FICHE DE SUIVI DES CONSOMMATIONS: '} open={openBeneficiaire} closeDialog={closeDialogBeneficiaire} size='lg' ><FicheBeneficiaire b={b}/> </FormDialog>

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
                                    <PrintIcon fontSize="small"/> <span className="pl-2   capitalize">Annexe 3.4</span>
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
                            <h5 className="font-normal mb-4 capitalize"><strong>N° Facture:</strong> {formulaire.facture.map((facture)=>facture.num_facture)}</h5>
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
                                        <TableCell className="px-0" align="center">Montant à rembourser</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formulaire.beneficiaires.map((beneficiaire,index)=>(
                                        beneficiaire.beneficier &&
                                        <TableRow key={index} >

                                            <TableCell className="px-0 uppercase" align="center" colSpan={1}><small className="uppercase bg-green text-white border-radius-4 px-2 cursor-pointer" onClick={() => OpenDialogBeneficiaire(beneficiaire.beneficiaire)} >{beneficiaire.beneficiaire.cin}</small></TableCell>
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
                                            <TableCell className="px-0" align="center" colSpan={1}>{beneficiaire.consommation+' MAD'}</TableCell>

                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </div>
                    <div className=" px-4 mb-4 flex justify-between">
                        <ReactToPrint
                            trigger={() => ( <Button color="primary" variant="contained" className="mr-4 py-2 "  >
                                <PrintIcon fontSize="small"/> <span className="pl-2   "> Note de présentation</span>
                            </Button>)}
                            content={() => componentRefNote.current}
                        />
                    </div>
                    <div className="px-4 flex justify-end">


                        <div className="flex">
                            <div className="pr-12">
                                <p className="mb-4"> Nombre des personnes à bénéficier :</p>
                                <p className="mb-4"> Montant de la facture :</p>
                                <strong><p > Montant à rembourser :</p></strong>
                            </div>
                            <div>
                                <p className="mb-4">{compteBeneficiairesFormulaire()}</p>
                                <p className="mb-4"> {formulaire.facture.map((facture)=>facture.mttc)+' '+ formulaire.devise.devise.slice(formulaire.devise.devise.length-3,formulaire.devise.devise.length)} </p>
                                <p><strong>{montantBeneficiairesConsommation()+' MAD'} </strong></p>
                            </div>

                        </div>
                    </div>
                </Card>
            </div>
            <div style={{ display: "none" }}>
                <div className=' py-3 h-full ' ref={componentRef}  >
                    <PrintPayer formulaire={formulaire} nombre={compteBeneficiairesFormulaire()} />
                </div>
            </div>
            <div style={{ display: "none" }}>
                <div className=' py-3 h-full ' ref={componentRefNote}  >
                    <Note formulaire={formulaire} nombre={compteBeneficiairesFormulaire()} total={montantBeneficiairesConsommation()+' MAD'} user={user} />
                </div>
            </div>

        </div>

    );
};

export default PayerBeneficiaire;
