import React, {useContext, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../snackbar/MySnackbarContentWrapper";
import SnackContext from "../../context/snack/snackContext";
import AuthContext from '../../context/auth/authContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuTop from "./MenuTop";
import SearchBox from "./SearchBox";
import avatar from "../../../img/avatar.png";
import logo from "../../../img/logo.png";

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import {
    AppBar,

    MenuItem,
    ListItem,
    IconButton,
    ListItemText,
    ListItemIcon,
    Avatar,
    Divider,
    List,

    Box,
    Collapse, Tooltip, Icon
} from '@material-ui/core';
import {

    Home,


} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import {  makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from "@material-ui/core/Drawer";


import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme =>({
    menuSliderContainer: {
        width: 250,
        background:'#2A1B3D',
        height: '100%'
    },
    avatar: {
        display:"block",
        margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
    logo: {
        display:"block",
        //  margin: "0.5rem auto",
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    listItem: {
        color : '#fff'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    menuItem: {
        display: "flex",
        alignItems: "center",
        minWidth: 185
    },
    text: {
        marginTop: theme.spacing(2)
    }
}));


const secteurIcons =
    [
        {
            listIcon: <DescriptionIcon style={{color:"#D1D7E0"}}/>,
            listText: "Formulaires",
            link:'/formulaire'
        },
        {
            listIcon: <PeopleIcon style={{color:"#D1D7E0"}}/>,
            listText: "Bénéficiaires",
            link:'/beneficiaire'
        }
    ];
const menuIcons = [
    {
        listIcon: <Home style={{color:"#fff"}}/>,
        listText: "Accueil",
        link:'/'
    },
    /*
    {
        listIcon: <AssignmentInd color="secondary"/>,
        listText: "Resume",
        link:'/resume'
    },
    {
        listIcon: <Apps color="secondary"/>,
        listText: "Portfolio",
        link: '/portfolio'
    },
    {
        listIcon: <ContactMail color="secondary" />,
        listText: "Contacts",
        link: '/contact'
    }

     */

];

const IconButtonWhite = withStyles(theme => ({
    root: {
        backgroundColor: "transparent",
        padding: "5px"
    }
}))(IconButton);

const IconSmall = withStyles(() => ({
    root: {
        fontSize: "1rem"
    }
}))(Icon);
const Navbar = () => {
    const snackContext = useContext(SnackContext);
    const {snack,closeSnack}=snackContext;
    const openSnack = snackContext.open;
    const authContext = useContext(AuthContext);
    const { logout, user, isAuthenticated, loadUser } = authContext;
    const classes =useStyles();
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const onLogout = () => {

        setState({...state,"right":false });
        logout();

        //clearContacts();
    };
    const onReglage = () => {

        setState({...state,"right":false });


        //clearContacts();
    };

    const [state, setState] = useState({
        right:false
    });
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const toggleSlider =(slider,open)=>()=>{
        setState({...state,[slider]:open });
    };
    const snackClose = ()=>{
        closeSnack();
    };
    const sideList = slider => (
        <Box component="div" className={classes.menuSliderContainer} >
            <div >
                <div
                    className="sidenav__hold"

                >
                    <div className="flex items-center justify-between brand-area">
                        <div className="flex items-center brand">

                            <Avatar src={logo} width="23 px" height="23 px" alt="company-logo" />
                            <span className="brand__text ml-2 " style={{color:"#fff"}}>Anapec</span>
                        </div>

                    </div>
                    <div className="sidenav__user">
                        <div className="username-photo">

                            {
                                user
                                ?
                                user.employe &&
                                    user.employe.image ?
                                <img src={user.employe.image} alt="user" alt={user.employe.nom_employe + " " + user.employe.prenom_employe }/>
                                    :
                                    <img src={avatar} alt="user" />
                                :
                                <img src={avatar} alt="user" />

                            }




                        </div>
                        <div className="ml-4">
                <span className="username">
            {/* <Icon>lock</Icon> */}
                    {user && user.name}
                </span>
                            <div className="user__menu">

                                <Tooltip title="Réglages">
                                    <Link  to="/reglage">
                                    <IconButtonWhite aria-label="Delete" className="" size="small" onClick={() => onReglage()}>
                                        <SettingsIcon fontSize="small" style={{color:"#fff"}}/>
                                    </IconButtonWhite>
                                    </Link>
                                </Tooltip>

                                <Tooltip title="Profil">
                                    <IconButtonWhite aria-label="Delete" className="" size="small">
                                        <PersonIcon fontSize="small" style={{color:"#fff"}}/>
                                    </IconButtonWhite>
                                </Tooltip>
                                <Tooltip title="Déconnexion">
                                    <IconButtonWhite aria-label="Delete" className="" size="small" onClick={() => onLogout()}>

                                        <ExitToAppIcon  fontSize="small" style={{color:"#fff"}} />
                                    </IconButtonWhite>
                                </Tooltip>
                            </div>

                        </div>
                    </div>

                    <List>
                        {menuIcons.map((lsItem,key)=>(
                            <ListItem button key={key} component={Link} to={lsItem.link} onClick={toggleSlider("right",false)}>
                                <ListItemIcon className={classes.listItem} >
                                    {lsItem.listIcon}
                                </ListItemIcon>
                                <ListItemText className={classes.listItem} primary={lsItem.listText}   />
                            </ListItem>
                        ))}
                        <Divider />
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon className={classes.listItem}>
                                <ListIcon  style={{color:"#fff"}}/>
                            </ListItemIcon>
                            <ListItemText primary="Secteur Emergent"  className={classes.listItem} />
                            {open ? <ExpandLess className={classes.listItem}/> : <ExpandMore style={{color:"#fff"}} />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>

                            {secteurIcons.map((lsItem,key)=>(
                                <ListItem button key={key} className={classes.nested} component={Link} to={lsItem.link} onClick={toggleSlider("right",false)}>
                                    <ListItemIcon className={classes.listItem}>
                                        {lsItem.listIcon}
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItem} primary={lsItem.listText}   />
                                </ListItem>
                            ))}


                        </Collapse>
                    </List>

                </div>
            </div>
        </Box>
    );
    return (
        <>

            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={openSnack}
                autoHideDuration={5000}
                onClose={snackClose}
            >
                <MySnackbarContentWrapper
                    onClose={snackClose}
                    variant={snack.variant}
                    message={snack.message}
                />
            </Snackbar>

            <Box component="nav">
                <AppBar position="static" style={{background: "#802BB1"}}>
                    <div className="flex justify-between items-center h-full">
                        <div className="flex">
                            <IconButton onClick={toggleSlider("right",true)}>
                                <MenuIcon style={{color:"#ff9e43"}} />
                            </IconButton>
                            <MobileRightMenuSlider open={state.right} anchor="right" onClose={toggleSlider("right",false)} >
                                {sideList("right")}
                            </MobileRightMenuSlider>
                            <div className="uppercase font-bold text-30">
                                <span style={{color:"#fff"}}>Sigec</span>
                            </div>

                        </div>

                        <div className="flex items-center">

                            <MenuTop
                                menuButton={
                                    <img
                                        className="mx-2 align-middle circular-image-small cursor-pointer"
                                        src={logo}
                                        alt="user"
                                    />
                                }
                            >
                                <MenuItem>
                                    <Link className={classes.menuItem} to="/">

                                        <HomeIcon  color="primary"  />
                                        <span className="pl-4"> Accueil </span>
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    {/* <Link
                    className={classes.menuItem}
                    to="/page-layouts/user-profile"
                  > */}

                                    <PersonIcon  color="primary" />
                                    <span className="pl-4"> Profil </span>
                                    {/* </Link> */}
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                    <Link className={classes.menuItem} to="/reglage">
                                    <SettingsIcon  color="primary" />
                                    <span className="pl-4"> Réglages </span>
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => onLogout()}
                                    className={classes.menuItem}
                                >
                                    <ExitToAppIcon  color="primary" />
                                    <span className="pl-4"> Déconnexion </span>
                                </MenuItem>
                            </MenuTop>

                        </div>
                    </div>




                </AppBar>
            </Box>
        </>

    );
};

export default Navbar;
