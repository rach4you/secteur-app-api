import React, {useContext, useEffect, useState} from 'react';
import Breadcrumb from "../layout/Breadcrumb";
import TableFormulaire from "./TableFormulaire";
import FormDialog from "../Dialog/FormDialog";
import FormulaireFilter from "./FormulaireFilter";
import {Button, Card} from "@material-ui/core";
import Progress from "../layout/Progress";

import {  fade,makeStyles } from '@material-ui/core/styles';
import FormulaireContext from "../../context/formulaire/formulaireContext";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from '@material-ui/icons/Search';
import FormFormulaire from "./FormFormulaire";



const useStyles = makeStyles((theme) => ({


    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },


}));

const Formulaire = () => {
    const formulaireContext = useContext(FormulaireContext);
    const {openDialogue,clearFormulaire,filtered,formulaires,closeDialogue,open,getFormulaires} = formulaireContext;

    useEffect(() => {

        setLoading(true);
        getFormulaires();
        setLoading(false);
        // eslint-disable-next-line
    }, []);
    const classes = useStyles();
    const openForm=()=>{
        clearFormulaire();
        openDialogue();
    };
    const [loading, setLoading] = useState(false);
    const closeForm=()=>(closeDialogue());

    return (

        <div className={classes.mainContainer}>

            <div className="mb-sm-30">
                <Breadcrumb routeSegments={[
                    { name: "Secteurs Emergents", path: "#" },
                    { name: "Formulaires" }
                ]}/>

            </div>
            <div className="mb-sm-30 flex justify-between items-center" >
                <Button variant="contained" color="primary"  onClick={openForm}>
                    <AddIcon fontSize="small" />   Formulaire
                </Button>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>

                    <FormulaireFilter classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}/>
                </div>


            </div>
                <FormDialog titre='Formulaire' open={open} closeDialog={closeForm} ><FormFormulaire/> </FormDialog>
            <Card elevation={6} className="px-6 py-5 ">

                <div className="overflow-auto">


                    { loading ?
                    <Progress/>
                    :
                        <TableFormulaire formulaires={filtered !== null ? filtered : formulaires}/>
                    }


                </div>
            </Card>

        </div>

            );
};

export default Formulaire;
