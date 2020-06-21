import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from "../context/auth/AuthState";
import PrivateRoute from "./routing/PrivateRoute";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Login from "./auth/Login";
import NotFound from "./pages/NotFound";
import Formulaire from "./Formulaires/Formulaire";
import FormulaireUser from "./Formulaires/FormulaireUser";
import FormulairePayer from "./Formulaires/FormulairePayer";
import FormulaireState from "../context/formulaire/FormulaireState";
import BeneficiaireState from "../context/beneficiaire/BeneficiaireState";
import Beneficiaire from "./Beneficiaire/Beneficiaire";
import BeneficiaireUser from "./Beneficiaire/BeneficiaireUser";
import Reglage from "./User/Reglage";
import FacureState from "../context/facture/FacureState";
import SnackState from "../context/snack/SnackState";
import '../../css/App.css';
import '../../css/styles/_app.scss';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {frFR} from "@material-ui/core/locale";

const textLight = {
    primary: "rgba(52, 49, 76, 1)",
    secondary: "rgba(52, 49, 76, 0.54)",
    disabled: "rgba(52, 49, 76, 0.38)",
    hint: "rgba(52, 49, 76, 0.38)"
};
const secondaryColor = {
    light: "#f9a352",
    main: "#ff9e43",
    dark: "#ff932e",
    contrastText: textLight.primary
};

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#802BB1",
            contrastText: "#ffffff"
        },
        secondary: secondaryColor,
        text: textLight
    }
},frFR);

const App = () => {
    return (
        <SnackState>

            <ThemeProvider theme={theme}>
                <AuthState>

                    <FormulaireState>
                        <FacureState>
                            <BeneficiaireState>
                                <Router>
                                    <Switch>
                                        <Route exact path='/login' component={Login} />
                                    </Switch>



                                    <CssBaseline />
                                    <Navbar/>
                                    <Container maxWidth="xl">
                                        <Switch>
                                            <PrivateRoute exact path='/' component={Home} />


                                            <PrivateRoute exact path='/formulaire' component={Formulaire} />
                                            <PrivateRoute exact path='/beneficiaire' component={Beneficiaire} />
                                            <PrivateRoute exact path='/user_formulaire' component={FormulaireUser} />
                                            <PrivateRoute exact path='/user_beneficiaire' component={BeneficiaireUser} />
                                            <PrivateRoute exact path='/facturer' component={FormulairePayer} />
                                            <PrivateRoute exact path='/reglage' component={Reglage} />
                                            <PrivateRoute component={NotFound} />
                                        </Switch>
                                    </Container>
                                </Router>
                            </BeneficiaireState>
                        </FacureState>
                    </FormulaireState>
                </AuthState>
            </ThemeProvider>

        </SnackState>
    );
};

export default App;
