import React from 'react';
import "./css/SelectCol.css";

class SelectCol extends React.Component {
    constructor( props ) {
        super( props );
        this.getCheckedValues = this.getCheckedValues.bind( this );
    }

    getCheckedValues( index ) {
        //Get the selected Value and pass to other component
        //toggle all languages
        if ( index != null ) {
            const newLans = this.props.allLanguages.slice(); //copy the array
            newLans[ index ].select = !this.props.allLanguages[ index ].select;  //execute the manipulations
            this.props.getsSelectedLanguage( newLans );
        }
    }

    //handle Event functions
    openForm() {
        const x = document.getElementById( "language-options" );
        if ( x.style.display === "none" ) {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

        document.addEventListener( 'click', function() {
            x.style.display = "none";
        } );
    }

    handleClick( e ) { //stop propagation of the react
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {

        const cardStyle = {
            width: "10rem",
            display: "none",
            paddingLeft: "10px",
            paddingBottom:"10px",
            position: "fixed",
            top: "9%",
            right: "16px",
            //overflow:"auto"
        }

        const Languages = this.props.allLanguages.map( ( language, index ) =>
            <div className = "custom-control custom-checkbox" key = { index }>
                <input type = "checkbox" className = "custom-control-input" id = { language.id } checked = { language.select }
                       onChange = { () => {this.getCheckedValues( index ) } } />
                <label className = "custom-control-label" htmlFor = { language.id }>{ language.id }</label>
            </div>
        );

        return (
            <div id = "selectColumns" onClick = { ( e ) => { this.handleClick( e ) } }>
                <button className = "btn btn-light selectColButton" onClick = { this.openForm }  title = "Select Languages">

                    <svg width = "1em" height = "1em" viewBox = "0 0 16 16" className = "bi bi-list-check" fill = "currentColor"
                         xmlns = "http://www.w3.org/2000/svg">
                        <path
                            d = "M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <div id = "language-options" className = "card" style = { cardStyle }>
                    <h6 className = "card-title" style = { { color: "grey", paddingTop: "8px" } }>All Languages</h6>
                    { Languages }
                </div>
            </div>
        );
    }
}

export default SelectCol;
