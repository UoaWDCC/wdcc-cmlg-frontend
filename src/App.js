import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import StickyHeadTable from './DataTable';


const useStyles = makeStyles(theme => ({
  textfield: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

export default function App() {
  return (
      <div className="App">
          <SearchTextField />
          <StickyHeadTable />
      </div>
  );
}

function SearchTextField() {
  const classes = useStyles();

  return (
      <form className={classes.textfield} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
      </form>
  );
}