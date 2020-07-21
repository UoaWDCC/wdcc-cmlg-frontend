import React from 'react';

class SelectCol extends React.Component {
    constructor( props ) {
        super( props );
        this.getCheckedValues = this.getCheckedValues.bind(this);
        this.state = {
            languages: [ "Arabic", "Serbian", "Croatian", "Russian", "German", "Hebrew", "French",
                "Hungarian", "Slovak", "Spanish", "Portugues", "Turkce", "Greek", "Romanian"],
            defaultLans: this.props.default
        }
    }

    getCheckedValues( index ) { //Get the selected Value and pass to other component
        //toggle the default languages
        if (index != null) {
            const newLans = this.state.defaultLans.slice() //copy the array
            newLans[ index ].value = !this.state.defaultLans[ index ].value;  //execute the manipulations
            this.setState({ defaultLans: newLans }) //set the new state
        }

        const values = [ ];
        const boxes = document.getElementsByClassName("custom-control-input");
        for(let i=0; i< boxes.length; i++){
            if(boxes[i].checked){
               values.push(boxes[i].id);
            }
        }

        //pass the values to the searchPage component
        this.props.parentCallback(values);
    }

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

    render() {
        console.log( "The Select Col render function gets called" );

        const buttonStyle ={
            borderRadius: "50%",
            border:"none",
            position:"fixed",
            top: "8px",
            right: "16px"
        }

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

        const defaultLanguages = this.state.defaultLans.map(( language, index) =>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={ language.name } checked={ language.value }
                       onChange={() => this.getCheckedValues(index)} />
                <label className="custom-control-label" htmlFor={ language.name }>{ language.name }</label>
            </div>
        );

        const listLanguages = this.state.languages.map(( language) =>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={ language } onClick={() => this.getCheckedValues()}/>
                <label className="custom-control-label" htmlFor={ language }>{ language }</label>
            </div>
        );

        return (
            <div id="selectColumns" onClick={ (e) => { this.handleClick(e) } }>
                <button className="btn btn-light" onClick={ this.openForm } style={ buttonStyle } title="View Columns">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list-check" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <div id="language-options" className="card" style={ cardStyle }>
                    <h6 className="card-title" style={{color:"grey", paddingTop:"8px"}}>Show Columns</h6>
                    { defaultLanguages }
                    { listLanguages }
                </div>
            </div>
        );
    }
}

export default SelectCol;
