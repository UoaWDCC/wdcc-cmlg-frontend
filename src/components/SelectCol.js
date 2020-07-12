import React from 'react';

class SelectCol extends React.Component {
    render() {

        const { classes, columns, options } = this.props;
        return (
            <div className="custom-control custom-checkbox">
                <div>
                    <input type="checkbox" id="chinese" name="chinese" value="chinese"></input>
                    <label for="check1">Chinese</label>
                </div>
                <div>
                    <input type="checkbox" id="Japanese" name="Japanese" value="Japanese"></input>
                    <label htmlFor="check1">Japanese</label>
                </div>
                <div>
                    <input type="checkbox" id="English" name="English" value="English"></input>
                    <label htmlFor="check1">English</label>
                </div>
                <div>
                    <input type="checkbox" id="French" name="French" value="French"></input>
                    <label htmlFor="check1">French</label>
                </div>
                <div>
                    <input type="checkbox" id="German" name="German" value="German"></input>
                    <label htmlFor="check1">German</label>
                </div>
            </div>
        );
    }

}

export default SelectCol;



