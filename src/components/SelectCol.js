import React from 'react';

class SelectCol extends React.Component {

    openForm(){
        const x = document.getElementById("language-options");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    render() {
        console.log( "The Select Col render function gets called" );

        const cardStyle= {
            width: "10rem",
            display: "none",
            position:"relative"
        }

        const buttonStyle ={
            borderRadius: "50%",
            border:"none"
        }

        return (
            <div id="selectCol">
                <button class="btn btn-light" onClick={this.openForm} style={buttonStyle} title="View Columns">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list-check" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <div id="language-options" className="card" style={cardStyle}>
                    <div className="card-body custom-control custom-checkbox">
                        <h6 className="card-title">Show columns</h6>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="chinese"/>
                            <label className="custom-control-label" htmlFor="chinese">Chinese</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="english"/>
                            <label className="custom-control-label" htmlFor="english">English</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="japanese"/>
                            <label className="custom-control-label" htmlFor="japanese">Japanese</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="french"/>
                            <label className="custom-control-label" htmlFor="french">French</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="german"/>
                            <label className="custom-control-label" htmlFor="german">German</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectCol;
