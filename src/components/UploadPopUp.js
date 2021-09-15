import {
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import React, { useState } from "react";
import useStyles from "../css/UploadPopupsCss";

import readXlsxFile from "read-excel-file";

const errorMsgText = {
  invalidExtension: "Invalid file extension",
  invalidHeaders:
    "Invalid file format – Columns must be in the following order: Chinese, Pinyin, English, Italian, Arabic, Serbian, Croatian, Russian, German, Hebrew,  French,  Hungarian,  Slovak,  Spanish, Português, Türkçe, Greek, Romanian",
};

function UploadPopUp({ darkMode, isOpen, handleClosePopUp }) {
  const classes = useStyles();
  const [file, setFile] = useState();
  const [error, setError] = useState("");

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

    // Checking that the file extension is .xlsx

    if (fileArray[1] != "xlsx") {
      console.log("ext");
      return errorMsgText.invalidExtension;
    }
    // Checking that the Excel headers are correct
    let validationError = await readXlsxFile(file).then((rows) => {
      if (JSON.stringify(rows[0]) === JSON.stringify(langArray)) {
        correct = true;
      }

      if (correct) {
        return "";
      } else {
        console.log("headers");
        return errorMsgText.invalidHeaders;
      }
    });
    console.log("end validation" + validationError);
    return validationError;
  }

  async function handleUploadSubmit(e) {
    let errMsg = await validateExcelFile();
    console.log("after" + errMsg);

    if (errMsg == "") {
      // Make fetch/axios call to backend to upload the file
      // https://cmlgbackend.wdcc.co.nz/api/uploadfile
      handleClose();
    } else {
      setError(errMsg);
    }
  }

  const handleClose = () => {
    handleClosePopUp();
    setError("");
  };

  // From https://material-ui.com/components/dialogs/#customized-dialogs
  const DialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle
        disableTypography
        classes={{
          root: classes.dialogTitle,
        }}
        {...other}
      >
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            classes={{
              root: `${classes.dialogCloseButton} ${
                darkMode ? classes.dialogCloseButtonDark : ""
              }`,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  };

  return (
    <div className="UploadPopUp ">
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
        classes={{
          paper: darkMode ? classes.dialogPaper : "",
        }}
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          Upload Translations
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            classes={{
              root: darkMode ? classes.dialogContentTextDark : "",
            }}
          >
            Accepted format: *.xlsx
          </DialogContentText>
          <input type="file" accept=".xlsx" onChange={onFileChangeHandler} />
          <p
            className={`${classes.errorMsg} ${
              darkMode ? classes.errorMsgDark : classes.errorMsgLight
            }`}
          >
            {error}
          </p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleUploadSubmit}
            className={`btn btn-outline-dark ${
              darkMode ? "btn-dark-mode" : "btn-light"
            } `}
          >
            Upload
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadPopUp;
