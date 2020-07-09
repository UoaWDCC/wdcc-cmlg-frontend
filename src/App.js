import React from "react";

// import MUIDataTable from "./TranslationTable";
import Table from "./tablePage/Table";
import SearchBar from "./tablePage/Search";

class App extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            input: null,
        }
    }

    // this function is called when there is a change in input text
    onTextChange(event) {
        console.log(event)
        console.log("text changes" + event.target.value);
        this.setState({
            input: event.target.value,
        }, () => {
            console.log(this.state.input)
        });
    }

    render() {
        return (
            <div className="App">
                <SearchBar onChange = { (event) => this.onTextChange(event) } />
                <Table searchWord = {this.state.input}/>
            </div>
        );
    };

}

export default App;
