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

        return (
            <div id="selectCol">
            <button class="btn btn-primary" onClick={this.openForm}>Select Column</button>
            <div id="language-options" className="card" style={cardStyle}>
                <div className="card-body custom-control custom-checkbox">
                    <h6 className="card-title">Show columns</h6>
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
            </div>
            </div>
        );
    }
}

export default SelectCol;



