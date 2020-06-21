import React from 'react';
import SimpleCard from "./SimpleCard";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    progress: {
        margin: theme.spacing(2)
    }
}));
const Progress = () => {
    const classes = useStyles();
    return (
        <div className="text-center">
            <SimpleCard >
                <CircularProgress className={classes.progress} color="secondary" />
            </SimpleCard>
        </div>
    );
};

export default Progress;