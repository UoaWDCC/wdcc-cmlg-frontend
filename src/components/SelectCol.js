import React from 'react';
import "./css/SelectCol.css";

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
        this.setState( prevState => ( {
            showComponent: !prevState.showComponent
        } ) );
    }

    handleClickOutside = event => {
        if ( !this.node || !this.node.contains( event.target ) ) {
            this.setState( {
                showComponent: false
            } );
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside );
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside );
    }

    render() {
        const Languages = this.props.allLanguages.map( ( language, index ) =>
            <div className = "custom-control custom-checkbox" key = { index }>
                <input type = "checkbox" className = "custom-control-input" id = { language.id } checked = { language.select }
                       onChange = { () => this.getCheckedValues( index ) } />
                <label className = "custom-control-label" htmlFor = { language.id }>{ language.id }</label>
            </div>
        );

        const card = (
            <div className = "card">
                <h6 id = "card-title">All Languages</h6>
                { Languages }
            </div>
        );

        return (
            <div id = "selectColumns" ref={ node => this.node = node }>
                <button className = "btn btn-light selectColButton"  onClick = { this.onButtonClick }  title = "Select Languages">
                    <i className="fas fa-tasks"/>
                </button>
                { this.state.showComponent ? card : null }
            </div>
        );
    }
}

export default SelectCol;
