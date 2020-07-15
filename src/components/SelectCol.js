import React from 'react';

class SelectCol extends React.Component {
    render() {
        return (
            <div className="custom-control custom-checkbox">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="chinese"></input>
                    <label class="custom-control-label" for="chinese">Chinese</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="english"></input>
                    <label className="custom-control-label" for="english">English</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="japanese"></input>
                    <label className="custom-control-label" for="japanese">Japanese</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="french"></input>
                    <label className="custom-control-label" for="french">French</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="german"></input>
                    <label className="custom-control-label" for="german">German</label>
                </div>
            </div>
        );
    }

}

export default SelectCol;



