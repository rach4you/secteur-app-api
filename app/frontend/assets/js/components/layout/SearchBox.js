import React, {useState} from 'react';
import {  IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles,withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&::placeholder": {
            color: theme.palette.primary.contrastText
        }
    }
});

const SearchBox = (props) => {
    const [open, setOpen] = useState(false);
    toggle = () => {
        setOpen(!open);
    };
        let { classes } = props;
    return (
        <React.Fragment>
                {!open && (
                    <IconButton onClick={toggle}>
                        <SearchIcon style={{color:"#ff9e43"}} />

                    </IconButton>
                )}

                {open && (
                    <div
                        className={`flex items-center h-full matx-search-box ${classes.root}`}
                    >
                        <input
                            className={`px-4 search-box w-full ${classes.root}`}
                            type="text"
                            placeholder="Rechercher..."
                            autoFocus
                        />
                        <IconButton onClick={toggle} className="align-middle mx-4">

                            <CloseIcon style={{color:"#ff9e43"}} />
                        </IconButton>
                    </div>
                )}
            </React.Fragment>
    );
};

export default withStyles(styles, { withTheme: true })(SearchBox);