import {
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import React, { useState } from "react";
import "../css/UploadPopUp.css";
import readXlsxFile from "read-excel-file";

// From https://material-ui.com/components/dialogs/#customized-dialogs
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const errorMsgText = {
  invalidExtension: "Invalid file extension",
  invalidHeaders:
    "Invalid file format – Columns must be in the following order: Chinese, Pinyin, English, Italian, Arabic, Serbian, Croatian, Russian, German, Hebrew,  French,  Hungarian,  Slovak,  Spanish, Português, Türkçe, Greek, Romanian",
};

function UploadPopUp() {
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);

  function onFileChangeHandler(e) {
    setFile(e.target.files[0]);
  }

  async function validateExcelFile() {
    const fileArray = file.name.split(".");
    var correct = false;
    const langArray = [
      "ZH CN",
      "pinyin",
      "EN English",
      "IT Italiano",
      "Arabic",
      "Serbian",
      "Croatian",
      "Russian",
      "DE German",
      "Hebrew",
      "FR French",
      "HU Hungarian",
      "Slovak",
      "ES Spanish",
      "Português",
      "Türkçe",
      "GR Greek",
      "Romanian",
    ];

    let validationError = await readXlsxFile(file).then((rows) => {
      if (JSON.stringify(rows[0]) === JSON.stringify(langArray)) {
        correct = true;
      }

      if (fileArray[1] === "xlsx" && correct === true) {
        console.log("alg");
        return "";
      } else if (fileArray[1] != "xlsx") {
        console.log("ext");
        return errorMsgText.invalidExtension; // not returning the error message?? can't see it on the pop-up box anymore :(((
      } else if (correct == false) {
        console.log("headers");
        return errorMsgText.invalidHeaders; // same issue
      }
    });
    console.log("end validation" + validationError);
    return validationError;
  }

  async function handleUploadSubmit(e) {
    // what is e?
    let errMsg = await validateExcelFile();
    console.log("after" + errMsg);

    if (errMsg == "") {
      console.log("correct");
      // Make fetch/axios call to backend to upload the file
      // https://cmlgbackend.wdcc.co.nz/api/uploadfile
      handleClose();
    } else {
      console.log("else"); // the correct file is using the else statement, which can't be right...
      setError(errMsg); // this isn't working anymore??????
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
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <div className="UploadPopUp ">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open modal
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          Upload Translations
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Accepted format: *.xlsx</DialogContentText>
          <input type="file" accept=".xlsx" onChange={onFileChangeHandler} />
          <p id="error-msg">{error}</p>
        </DialogContent>
        <DialogActions>
          <button onClick={handleUploadSubmit} className={`btn btn-light`}>
            Upload
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadPopUp;
