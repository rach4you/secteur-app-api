import React,{useState,useContext,useEffect,useRef} from 'react';
import AuthContext from '../../context/auth/authContext';

import {
    Card,

    Grid,
    Button,
    CircularProgress
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {makeStyles} from "@material-ui/core/styles";
import SnackContext from "../../context/snack/snackContext";
import Breadcrumb from "../layout/Breadcrumb";
import avatar from "../../../img/avatar.png";

const useStyles = makeStyles(theme =>({
    wrapper: {
        position: "relative"
    },

    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },


}));
const Reglage = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser, user , update} = authContext;
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const form = useRef('');

    useEffect(() => {
        loadUser();
        setProfil({
            email: user.email,
            password: '',
            name: user.name,

        });
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();
    const [profil, setProfil] = useState({
        email: '',
        password: '',
        name: '',

    });
    const [spinner, setSpinner] = useState(false);

    const { email, password, name } = profil;
    const [image, setImage] = useState(null);
    const onChange = e =>{



        if(e.target.name==='image'){

            setImage(e.target.files[0]);
        }else{
            setProfil({ ...profil, [e.target.name]: e.target.value });
        }
       // console.log(profil) ;
    } ;


    const onSubmit = e => {
        e.preventDefault();
        let id = null;
        if(user.employe && image !== null){


                const data = new FormData();
                data.append('image', image);
                update(profil,data,user.employe.id);

        }else{
            update(profil,null,null);
        }



        setSpinner(true);
      //  console.log(data,image);
     //
        const success ={
            message: 'Les informations sont bien modifiés',
            variant:'success'
        };
        getSnack(success);
        setSpinner(false);

    };
    return (
        <>
            <div className="mb-sm-30">
                <Breadcrumb routeSegments={[
                    { name: "Profil", path: "#" },
                    { name: "Réglage" }
                ]}/>

            </div>
        <div className=" flex justify-center ">

            <div >
                <Card className=" position-relative y-center">
                    <ValidatorForm
                        ref={form}
                        onSubmit={onSubmit}
                        onError={errors => null}
                    >
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>

                            <div className="p-8 flex justify-center items-center h-full ">
                                <div className="username-photo">
                                    {
                                        user
                                            ?
                                            user.employe &&
                                            user.employe.image ?

                                                <img src={user.employe.image} />
                                                :
                                                <img src={avatar} />                                            :
                                            <img src={avatar} />
                                    }



                                </div>
                                <div>
                                    <input type="file" name="image"  onChange={onChange}/>
                                </div>


                            </div>

                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full  position-relative">

                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Nom"
                                        onChange={onChange}
                                        type="text"
                                        name="name"
                                        value={name}
                                        validators={["required"]}
                                        errorMessages={["Vous avez oublié de définir le nom"]}
                                    />
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Email"
                                        onChange={onChange}
                                        type="email"
                                        name="email"
                                        value={email}
                                        validators={["required", "isEmail"]}
                                        errorMessages={[
                                            "Vous avez oublié de définir l'email",
                                            "L'email n'est pas valide"
                                        ]}
                                    />
                                    <TextValidator
                                        className="mb-3 w-full"
                                        label="Mot de Passe"
                                        variant="outlined"
                                        onChange={onChange}
                                        name="password"
                                        type="password"
                                        value={password}
                                        validators={["required"]}
                                        errorMessages={["Vous avez oublié de définir le mot de passe"]}
                                    />

                                    <div className="flex flex-wrap items-center mb-4">
                                        <div className={classes.wrapper}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={spinner}
                                                type="submit"
                                            >
                                                Envoyer
                                            </Button>
                                            {spinner && (
                                                <CircularProgress
                                                    size={24}
                                                    className={classes.buttonProgress}
                                                    color="secondary"
                                                />
                                            )}


                                        </div>

                                    </div>


                            </div>
                        </Grid>
                    </Grid>
                    </ValidatorForm>
                </Card>
            </div>
        </div>
            </>
    );
};

export default Reglage;
