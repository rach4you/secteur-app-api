import React,{useState,useContext,useEffect,useRef} from 'react';
import AuthContext from '../../context/auth/authContext';

import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress
} from "@material-ui/core";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {makeStyles} from "@material-ui/core/styles";
import logo from "../../../img/logo.jpg";
import SnackContext from "../../context/snack/snackContext";


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

const Login = props => {
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated, loading } = authContext;
    const snackContext = useContext(SnackContext);
    const {getSnack}=snackContext;
    const form = useRef('');
    useEffect(() => {
        if (isAuthenticated) {

            props.history.push('/');
        }

       // console.log(loading);
        if (error === 'Invalid Credentials') {
            const danger ={
                message: 'Les informations d\'identification invalides',
                variant:'error'
            };
            getSnack(danger);
            clearErrors();
            setSpinner(false);
        }

        // eslint-disable-next-line
    }, [ error,isAuthenticated, props.history]);

    const classes = useStyles();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [spinner, setSpinner] = useState(false);

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setSpinner(true);
        login({
            email,
            password
        });
    };

    return (
        <div className="signup flex justify-center w-full h-full-screen">
            <div className="p-8">
                <Card className="signup-card position-relative y-center">
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>
                            <div className="p-8 flex justify-center items-center h-full">
                                <img src={logo} />
                            </div>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <div className="p-9 h-full bg-light-gray position-relative">
                                <ValidatorForm
                                    ref={form}
                                    onSubmit={onSubmit}
                                    onError={errors => null}
                                >

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
                                    <FormControlLabel
                                        className="mb-3"
                                        name="agreement"
                                      //  onChange={this.handleChange}
                                        control={<Checkbox checked />}
                                        label="Rester connecté."
                                    />
                                    <div className="flex flex-wrap items-center mb-4">
                                        <div className={classes.wrapper}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={spinner}
                                                type="submit"
                                            >
                                                Connexion
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

                                </ValidatorForm>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    );
};

export default Login;
