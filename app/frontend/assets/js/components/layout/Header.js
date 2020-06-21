import React from 'react';
import avatar from '../../../img/avatar.png';
import Typed from 'react-typed'
import {Avatar,  Typography, Grid} from "@material-ui/core";
import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    avatar: {

        width: theme.spacing(15),
        height: theme.spacing(15),
        margin : theme.spacing(1)
    },
    title: {
        color: 'tomato !important',

    },
    subtitle:{
        color: 'tan !important',
        marginBottom: '3rem'
    },
    typedContainer:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100vw',
        textAlign:'center',
        zIndex: 1
    }
}));



const Header = ({user, info}) => {
    const classes =useStyles();



    return (
        <div>

                <Grid container justify="center">

                    {
                        user
                            ?
                            user.employe &&
                            user.employe.image ?
                                <Avatar src={user.employe.image} className={classes.avatar}  alt={user.employe.nom_employe + " " + user.employe.prenom_employe } />
                                :
                                <Avatar src={avatar} className={classes.avatar}  alt="" />
                            :
                            <Avatar src={avatar} className={classes.avatar}  alt="" />

                    }




                </Grid>

                <Typography variant="h4" className={classes.title}>

                    {
                        user && <Typed  strings={[`Bienvenue ${user.name}`]} typeSpeed={40} />

                    }



                </Typography>
                <br/>
                <Typography variant="h5" className={classes.subtitle}>
                    {
                        info
                    &&
                        <Typed  strings={[`Vous avez Creé ${info.count_formulaire} Formulaires`,`Vous avez Creé ${info.count_facture} Factures`,`Vous avez Creé ${info.count_beneficiaire} Bénéficiaires`]}
                               typeSpeed={40} backSpeed={60} loop
                        />
                    }

                </Typography>

        </div>

    );
};

export default Header;
