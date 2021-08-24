import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ 
    dialogPaper: {
        backgroundColor: '#262626',
        border: 'white solid',
        color: 'white',
    },
    dialogContentTextDark: {
        color: 'white'
    },
    dialogTitle: {
        margin: 0,
        padding: theme.spacing(2),
    },
    dialogCloseButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogCloseButtonDark: {
        color: 'white',
        '&:hover': {
            background: "grey"
        }
    },
    errorMsg: {
        fontFamily: 'Arial, Helvetica, sans-serif',  
        color: 'red',
        marginTop: '12px',
        marginBottom: '0px',
    },
    errorMsgLight: {
        color: 'red',
    },
    errorMsgDark: {
        color: '#cf6679'
    }
}));  

export default useStyles;