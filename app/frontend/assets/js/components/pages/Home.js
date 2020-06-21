import React, {Fragment, useContext, useEffect} from 'react';
import Header from "../layout/Header";
import Particles from "react-particles-js";
import {makeStyles} from "@material-ui/styles";
import StatutUser from "../User/StatutUser";
import DernierFormulaire from "../User/DernierFormulaire";
import { Grid, Card } from "@material-ui/core";
import FormulaireContext from "../../context/formulaire/formulaireContext";
import bg from "../../../img/boule_agirhPub.png";
import AuthContext from "../../context/auth/authContext";
const useStyle= makeStyles({
    particlesCanva: {
        position: 'absolute',
        opacity: '0.3',

    },
    container:{
     //   backgroundImage:"url(../../assets/img/boule_agirhPub.png) "
    },
    typedContainer:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '100vw',
        textAlign:'center',
        zIndex: 2,
        marginBottom: '1rem'
    }
});
const Home = () => {

    useEffect(() => {
        getInfo();
        loadUser();
        getFilter();
    }, []);
    const formulaireContext = useContext(FormulaireContext);
    const {info,getInfo,getFilter,filteres} = formulaireContext;
    const authContext = useContext(AuthContext);
    const { user, loadUser } = authContext;
    const classes = useStyle();

    return (
        <Fragment>
            <Particles canvasClassName={classes.particlesCanva}  params={{
                particles:{
                    number: {
                        value:45,
                        density: {
                            enable: false,
                            value_area: 900
                        }
                    },
                    shape:{
                        type:'circle',
                        stroke:{
                            width: 1,
                            color: 'tomato'
                        },
                    },
                    size: {
                        value: 8,
                        random: true,
                        anim:{
                            enable:true,
                            speed:6,
                            size_min:0.1,
                            sync: true
                        }
                    },
                    opacity:{
                        value:1,
                        random:true,
                        anim:{
                            enable:true,
                            speed:1,
                            opacity_min:0.1,
                            sync: true
                        }
                    }
                }
            }}/>

            <div className="content-wrap position-relative m-20 ">

    <div className="analytics m-sm-30 mt--18 items-center " >
        <Grid container spacing={3} style={{
            backgroundImage: `url(${bg})`
        }}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <StatutUser info={info}/>

                {/* Top Selling Products */}
                <DernierFormulaire filteres={filteres}/>


            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
                <Card className="px-6 py-4 mb-6">

                    <div className="card-subtitle">


                        <Header user={user} info={info}/>

                    </div>

                </Card>


            </Grid>
        </Grid>


    </div>
</div>

        </Fragment>
    );
};

export default Home;
