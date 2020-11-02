import React from 'react';
import "../css/SelectCol.css";

class SelectCol extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            showComponent: false,
        };
        this.getCheckedValues = this.getCheckedValues.bind( this );
        this.onButtonClick = this.onButtonClick.bind( this );
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

    onButtonClick() {
        if (!this.state.showComponent) {
            document.addEventListener("click", this.handleClickOutside);
        } else {
            document.removeEventListener("click", this.handleClickOutside);
        }

        this.setState( prevState => ( {
            showComponent: !prevState.showComponent
        } ) );
    }

    handleClickOutside = event => {
        if (!this.node.contains( event.target ) ) {
            this.onButtonClick();
        }
    }

    render() {
        const Languages = this.props.allLanguages.map( ( language, index ) =>
            <div className = "custom-control custom-checkbox" key = { index }>
                <input type = "checkbox" className = "custom-control-input" id = { language.id } checked = { language.select }
                       onChange = { () => this.getCheckedValues( index ) } />
                <label className = "custom-control-label" htmlFor = { language.id }>{ language.id }</label>
            </div>
        );

        return (
            <div id = "selectColumns" ref={ node => this.node = node }>
                <button className = { ` btn btn-light selectColButton ${ this.props.darkMode ? "dark-mode" : ""  } ` }
                        onClick = { this.onButtonClick } >
                    <i className="fas fa-tasks"/>
                </button>

                { this.state.showComponent && (
                    <div className = { ` card ${ this.props.darkMode ? "dark-mode" : "" } ` }>
                        <h6 id = { this.props.darkMode ? "dark-mode-title" : "card-title" }>All Languages</h6>
                        { Languages }
                    </div>
                ) }

            </div>
        );
    }
}

export default SelectCol;
