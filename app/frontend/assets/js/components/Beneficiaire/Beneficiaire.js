import React, {useContext, useEffect} from 'react';
import Breadcrumb from "../layout/Breadcrumb";
import { Card} from "@material-ui/core";

import {  fade,makeStyles } from '@material-ui/core/styles';
import BeneficiaireContext from "../../context/beneficiaire/beneficiaireContext";
import SearchIcon from '@material-ui/icons/Search';
import DetailBeneficiaire from "../Beneficiaire/DetailBeneficiaire";
import BeneficiaireFilter from "./BeneficiaireFilter";



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

const Beneficaire = () => {
    const beneficiaireContext = useContext(BeneficiaireContext);
    const {filtered,beneficiaires,getBeneficiaires} = beneficiaireContext;

    useEffect(() => {


        getBeneficiaires();

        // eslint-disable-next-line
    }, []);
    const classes = useStyles();


    return (

        <div className={classes.mainContainer}>

            <div className="mb-sm-30">
                <Breadcrumb routeSegments={[
                    { name: "Secteurs Emergents", path: "#" },
                    { name: "Bénéficiaire" }
                ]}/>

            </div>
            <div className="mb-sm-30 flex justify-between items-center" >
<div>

</div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <BeneficiaireFilter classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}/>

                </div>


            </div>
            <Card elevation={6} className="px-6 py-5 ">

                <div className="overflow-auto">

                    <DetailBeneficiaire beneficiaires={filtered !== null ? filtered : beneficiaires}/>


                </div>
            </Card>

        </div>

            );
};

export default Beneficaire;
