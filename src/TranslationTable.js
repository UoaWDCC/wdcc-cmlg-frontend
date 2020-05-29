import React from "react";
import MUIDataTable from "mui-datatables";
/*This website is really useful: https://github.com/gregnb/mui-datatables*/

import jsonData from './finalJson.json';
import { TableFixedColumns } from '@devexpress/dx-react-grid-material-ui';

const columns = ["zh_cn","English", "it_italiano", "arabic","serbian","croatian","russian","de_german","hebrew","fr_french","hu_hungarian","slovak","es_spanish","portugues","turkce","gr_greek","romanian"];

var arr =[];
var data = [

    // ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    // ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    // ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    // ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    // ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    // [
    //     "Blake Duncan",
    //     "Business Management Analyst",
    //     "San Diego",
    //     65,
    //     "$94,000"
    // ],
    // ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    // ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    // ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    // ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    // ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    // ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    // ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    // ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    // ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
    // [
    //     "Addison Navarro",
    //     "Business Management Analyst",
    //     "New York",
    //     50,
    //     "$295,000"
    // ],
    // ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
    // ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
    // ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
    // ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
    // ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
    // ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
    // ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
    // ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
    // ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
    // ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
    // ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
    // ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
    // [
    //     "Gabby Strickland",
    //     "Business Process Consultant",
    //     "Scottsdale",
    //     26,
    //     "$45,000"
    // ],
    // ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
];

console.log(columns.length);


var wholeArray=[];
jsonData.map((x) =>{
    return(
            wholeArray.push(x.name),
            console.log(x.name)
        )
    })

for(var i=0;i<wholeArray.length;i+=0){
    var output=[];
    var j=0;
    while(j<18){
        output.push(wholeArray[i]);
        i++
        j++;
    }

    data.push([output[0] + " " + output[1],output[2], output[3],output[4],output[5],output[6],output[7],output[8],output[9],output[10],output[11],output[12],output[13],output[14],output[15],output[16],output[17]])

    }
      








// for(var i=0;i<10;i++){
//     var array=[];
//     jsonData.asperiores.map ((x) =>{
//         if(x.translation_id == i){
//             return (
//                 array.push(x.name),
//                 console.log(x.name)
//             )
//         }
//     })

//     jsonData.ut.map ((x) =>{
//         if(x.translation_id == i){
//             return (
//                 array.push(x.name),
//                 console.log(x.name)
//             )
//         }
//     })

//     if(array.length>0){
//         data.push([array[0],array[1]]) 
//     }
    
// }

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

// export default () => (

//     <MUIDataTable
//         title={"Translation list"}
//         data={data}
//         columns={columns}
//         options={options}
//     >
//         <TableFixedColumns
//             leftColumns={["Chinese", "English"]}
//         />
//     </MUIDataTable>
// )
