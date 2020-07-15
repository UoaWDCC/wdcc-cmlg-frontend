import React from 'react';

class SelectCol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelectBar: false,
        };
        this.selectLanguageClick = this.selectLanguageClick.bind(this);
    }

    selectLanguageClick() {
        this.setState(prevState => {
            return {
                showSelectBar: !prevState.showSelectBar,
            }
        });
    }

    showAllLanguage(){
        return (
            <div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="chinese"></input>
                    <label className="custom-control-label" htmlFor="chinese">Chinese</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="english"></input>
                    <label className="custom-control-label" htmlFor="english">English</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="japanese"></input>
                    <label className="custom-control-label" htmlFor="japanese">Japanese</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="french"></input>
                    <label className="custom-control-label" htmlFor="french">French</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="german"></input>
                    <label className="custom-control-label" htmlFor="german">German</label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="custom-control custom-checkbox">
                <button  onClick={this.selectLanguageClick}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list-check" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                {this.state.showSelectBar ?
                    this.showAllLanguage() :
                    null
                }
            </div>
        );
    }

}

export default SelectCol;



