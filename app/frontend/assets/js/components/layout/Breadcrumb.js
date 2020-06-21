import React from "react";
import {  Breadcrumbs, Hidden } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit'
    },
    icon: {
        vertical:'align',
        margin: '.5rem',
        color:'#802BB1',
        verticalAlign:'middle'
    },
}));
//align-middle ml-2 mb-1
const Breadcrumb = ({ routeSegments }) => {
    const classes = useStyles();
    return (
        <div className="flex flex-wrap items-center">
            {routeSegments ? (
                <Hidden xsDown>
                    <h4 className="m-0 pb-1px text-16 capitalize align-middle">
                        {routeSegments[routeSegments.length - 1]["name"]}
                    </h4>
                    <h4 className="m-0 pb-3px ml-2 text-hint">|</h4>
                </Hidden>
            ) : null}
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                className="flex items-center position-relative"
            >
                <NavLink to="/">
                    <HomeIcon className={classes.icon}  />

                </NavLink>
                {routeSegments
                    ? routeSegments.map((route, index) => {
                        return index !== routeSegments.length - 1 ? (
                            <NavLink key={index} to={route.path} className={classes.link}>
                                <span className="capitalize text-muted">{route.name}</span>
                            </NavLink>
                        ) : (
                            <span key={index} className="capitalize text-muted">
                  {route.name}
                </span>
                        );
                    })
                    : null}
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;