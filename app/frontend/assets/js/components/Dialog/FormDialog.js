import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = ({titre,children,open,closeDialog,size}) => {





    return (
        <div>

            <Dialog
                open={open}
                onClose={closeDialog}
                fullWidth={true}
                maxWidth={size}
                aria-labelledby="customized-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{titre}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default FormDialog;