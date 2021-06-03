import { DialogContent, DialogContentText, DialogActions, IconButton, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import React, { useState } from 'react';
import "../css/UploadPopUp.css";

// From https://material-ui.com/components/dialogs/#customized-dialogs
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const errorMsgText = {
    invalidExtension: "Invalid file extension ",
    invalidHeaders: "Invalid file format – Columns must be in the following order: Chinese, English, Italian, Arabic, Serbian, Croatian, Russian, German, Hebrew,  French,  Hungarian,  Slovak,  Spanish, Português, Türkçe, Greek, Romanian"
}

function UploadPopUp() {

    const [file, setFile] = useState();
    const [error, setError] = useState("");
    const [open, setOpen] = React.useState(true);

    function onFileChangeHandler(e) {
        setFile(e.target.files[0])
    }

    function handleUploadSubmit(e) { // what is e?
        console.log("file to submit", file)
        let errMsg = "";

        // Validate the file => correct extension/ headers
        // Inside the validation method, set the error message and return it
        // errMsg = errorMsgText.invalidExtension;
        // errMsg = errorMsgText.invalidHeader;

        if (errMsg == "") {
            // Make fetch/axios call to backend to upload the file 
            // https://cmlgbackend.wdcc.co.nz/api/uploadfile
            handleClose();
        } else {
            setError(errMsg);
        }
    }

    // To be deleted
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
    };

    // From https://material-ui.com/components/dialogs/#customized-dialogs
    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    return (
        <div className='UploadPopUp '>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open modal
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth='sm'>
                <DialogTitle id="form-dialog-title" onClose={handleClose}>Upload Translations</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Accepted format: *.xlsx
                    </DialogContentText>
                    <input type="file" accept=".xlsx" onChange={onFileChangeHandler} />
                    <p id="error-msg">{error}</p>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleUploadSubmit} className={`btn btn-light`}>Upload</button>
                </DialogActions>
            </Dialog>


        </div>
    );
}

export default UploadPopUp;