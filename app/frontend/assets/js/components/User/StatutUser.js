import React from 'react';
import { Grid, Card,  IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import PaymentIcon from '@material-ui/icons/Payment';
import {Link} from "react-router-dom";
const styles = theme => ({
    icon: {
        fontSize: "44px",
        opacity: 0.6,
        color: "primary"
    }
});
const StatutUser = ({ classes, info }) => {

    return (
        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={6}>
                <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">

                        <DescriptionIcon className={classes.icon}  style={{color:"#7467ef"}}/>

                        <div className="ml-3">
                            <small className="text-muted">Les formulaires crées</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{info && info.count_formulaire}</h6>
                        </div>
                    </div>
                    <Tooltip title="Voir Détails" placement="top">
                        <Link  to="/user_formulaire">
                        <IconButton>
                            <ArrowRightAltIcon/>
                        </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">

                    <ReceiptIcon className={classes.icon}  style={{color:"#7467ef"}}/>

                    <div className="ml-3">
                        <small className="text-muted">Les factures crées</small>
                        <h6 className="m-0 mt-1 text-primary font-medium">{info && info.count_facture}</h6>
                    </div>
                </div>
                    <Tooltip title="Voir Détails" placement="top">
                        <Link  to="/facturer">
                        <IconButton>
                            <ArrowRightAltIcon/>
                        </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">

                        <PeopleIcon className={classes.icon}  style={{color:"#7467ef"}}/>
                        <div className="ml-3">
                            <small className="text-muted">Les bénéficiaires crées</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{info && info.count_beneficiaire}</h6>
                        </div>
                    </div>
                    <Tooltip title="Voir Détails" placement="top">
                        <Link  to="/user_beneficiaire">
                        <IconButton>
                            <ArrowRightAltIcon/>
                        </IconButton>
                        </Link>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">

                        <PaymentIcon className={classes.icon}  style={{color:"#7467ef"}}/>

                        <div className="ml-3">
                            <small className="text-muted">Les formulaires payés</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{info && info.count_payer}</h6>
                        </div>
                    </div>
                    <Tooltip title="Voir Détails" placement="top">
                        <IconButton>
                            <ArrowRightAltIcon/>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
        </Grid>
    );
};
export default withStyles(styles, { withTheme: true })(StatutUser);
