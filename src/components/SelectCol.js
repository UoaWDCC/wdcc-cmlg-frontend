import React from 'react';

class LanguagesList extends React.Component{
    render() {
        const cardStyle= {
            width: "10rem",
            display: "none",
            paddingLeft: "10px",
            paddingBottom:"10px",
            position:"fixed",
            top: "45px",
            right: "16px",
            //overflow:"auto"
        }

        const languages = ["Chinese", "English", "Italian", "Arabic", "Serbian", "Croatian", "Russian", "German", "Hebrew", "French",
            "Hungarian", "Slovak", "Spanish", "Portugues", "Turkce", "Greek", "Romanian"];

        const listForm = languages.map((language) =>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={ language }/>
                <label className="custom-control-label" htmlFor={ language }>{ language }</label>
            </div>
        );

        return(
            <div id="language-options" className="card " style={ cardStyle }>
                <h6 className="card-title" style={{color:"grey", paddingTop:"8px"}}>Show Columns</h6>
                { listForm }
            </div>
        );
    }
}

class SelectCol extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            data: {
               　checkedValues: this.getCheckedValues()
            }
        }*/
    }

 /*   //need implement a parent call back function to pass the data to the table.
    sendData = () => {
        this.props.parentCallback(this.state.data.checkedValues);
    },*/

    //handle Event functions
    openForm(){
        const x = document.getElementById("language-options");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

        document.addEventListener('click',function(e){
            x.style.display = "none";
        });
    }

    handleClick(e){ //stop propagation of the react
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

  /* getCheckedValues(){ // need to test if this function get the expected values
        const boxes = document.getElementsByClassName("custom-control-input");
        const boxesChecked = [];

        for(var i=0;i<boxes.length;i++){
            if(boxes[i].checked){
                boxesChecked.push(boxes[i].id);
            }
        }

        // Return the array if it is non-empty, or null
        console.log("boxedChecked:"+ boxesChecked);
        return boxesChecked.length > 0 ? boxesChecked : null;

    }*/

    render() {
        console.log( "The Select Col render function gets called" );

        //Style will move to css file later
        const buttonStyle ={
            borderRadius: "50%",
            border:"none",
            position:"fixed",
            top: "8px",
            right: "16px"
        }

        return (
            <div id="selectCol" onClick={ (e) => { this.handleClick(e) } }>
                <button class="btn btn-light" onClick={ this.openForm } style={ buttonStyle } title="View Columns">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list-check" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <LanguagesList/>
            </div>
        );
    }
}
export default SelectCol;
