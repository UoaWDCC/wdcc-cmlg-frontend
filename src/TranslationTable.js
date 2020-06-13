import React, {Component} from "react";
import MUIDataTable from "mui-datatables";
/*This website is really useful: https://github.com/gregnb/mui-datatables*/

import jsonData from './response.json';
import "./App.scss"

const columns = ["zh_cn","English", "it_italiano", "arabic","serbian","croatian","russian","de_german","hebrew","fr_french","hu_hungarian","slovak","es_spanish","portugues","turkce","gr_greek","romanian"];

var data = [];
var nameArray=[];

// load data from JSON file
jsonData.map((x) =>{
    return(
            nameArray.push(x.name)
        )
    })

// Input data to the table
for(var i=0;i<nameArray.length;i+=0){
    var output=[];
    var j=0;
    while(j<18){
        output.push(nameArray[i]);
        i++
        j++;
    }
    data.push([output[0] + " " + output[1],output[2], output[3],output[4],output[5],output[6],output[7],output[8],output[9],output[10],output[11],output[12],output[13],output[14],output[15],output[16],output[17]]);

}

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


export default () => (

    <MUIDataTable
        title={"Translation list"}
        data={data}
        columns={columns}
        options={options}
    />
)
