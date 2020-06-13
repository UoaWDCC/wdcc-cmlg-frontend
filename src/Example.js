import React from "react";
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "./TranslationTable";

class Example extends React.Component {

  state = {
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  // get data
  getData = () => {
    this.xhrRequest().then(res => {
      this.setState({ data: res.data , isLoading: false});
    });
  }

  // mock async function
  xhrRequest = () => {

    return new Promise((resolve, reject) => {
      // mock page data
      const data = [
        ["Gabby George", "Business Analyst", "Minneapolis"],
        ["Aiden Lloyd", "Business Consultant", "Dallas"],
        ["Jaden Collins", "Attorney", "Santa Ana"],
        ["Franky Rees", "Business Analyst", "St. Petersburg"],
        ["Aaren Rose", "Business Analyst", "Toledo"]
      ];
      setTimeout(() => {
        resolve({
          data
        });
      }, 2500);

    });

  }

  render() {

    const columns = ["Name", "Title", "Location"];
    const { data} = this.state;

    const options = {
     
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    print: false,
    searchOpen: true,
    disableToolbarSelect: false,
    selectableRowsHeader: false,
    pagination: false,
    filter:false,
    selectableRows: 'none',
    fixedHeaderOptions: {
        xAxis: true,
        yAxis: true
    },
      
    };
    return (

        <MUIDataTable >
           data={data} columns={columns} options={options} >
           </MUIDataTable>

    );

  }
}

export default Example;