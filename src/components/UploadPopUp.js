import { DialogContent, DialogContentText, DialogActions, IconButton, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import React, { useState } from 'react';
import useStyles from '../css/UploadPopupsCss';

const errorMsgText = {
    invalidExtension: "Invalid file extension ",
    invalidHeaders: "Invalid file format – Columns must be in the following order: Chinese, Pinyin, English, Italian, Arabic, Serbian, Croatian, Russian, German, Hebrew,  French,  Hungarian,  Slovak,  Spanish, Português, Türkçe, Greek, Romanian"
}

function UploadPopUp({ darkMode }) {
    const classes = useStyles();

    const [file, setFile] = useState();
    const [error, setError] = useState("");
    const [open, setOpen] = React.useState(false);

    function onFileChangeHandler(e) {
        setFile(e.target.files[0])
    }

    function handleUploadSubmit(e) { // what is e?
        console.log("file to submit", file)
        let errMsg = errorMsgText.invalidHeaders;

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
    const DialogTitle = ((props) => {
        const { children, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography classes={{
                root: classes.dialogTitle
            }} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" 
                        classes={{
                            root: `${classes.dialogCloseButton} ${darkMode ? classes.dialogCloseButtonDark : ""}`
                        }}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    return (
        <div className='UploadPopUp '>
            {/* TO BE REMOVED */}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open modal
            </Button>
            {/* TO BE REMOVED */}
            <Dialog 
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title" 
                fullWidth={true} maxWidth='sm'
                classes={{
                    paper: darkMode ? classes.dialogPaper : ""
                }}
            >
                <DialogTitle id="form-dialog-title" onClose={handleClose}>Upload Translations</DialogTitle>
                <DialogContent>
                    <DialogContentText classes={{
                        root: darkMode ? classes.dialogContentTextDark : ""
                    }}>
                        Accepted format: *.xlsx
                    </DialogContentText>
                    <input type="file" accept=".xlsx" onChange={onFileChangeHandler} />
                    <p 
                        className={ `${ classes.errorMsg } ${ darkMode ? classes.errorMsgDark : classes.errorMsgLight }` }
                    >
                        {error}
                    </p>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleUploadSubmit} className={
                        `btn btn-outline-dark ${ darkMode? "btn-dark-mode" : "btn-light" } `}
                    >Upload</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UploadPopUp;