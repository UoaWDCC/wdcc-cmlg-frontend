import React from "react";


class Table extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            translationData: []
        };
    }

    renderTableData() {
        if ( this.state.translationData.length !== 0 ) {
            return this.state.translationData.map( ( translation, index ) => {

                const [ chinese, pinyin, english, italian, arabic, serbian, croatian, russian, german, hebrew, french,
                    hungarian, slovak, spanish, portuguese, turkce, greek, romanian ]
                    = translation // Destructuring.

                return (
                    <tr key={ index }>
                        <td>{ chinese + " " + pinyin }</td>
                        <td>{ english }</td>
                        <td>{ italian }</td>
                        <td>{ arabic }</td>
                        <td>{ serbian }</td>
                        <td>{ croatian }</td>
                        <td>{ russian }</td>
                        <td>{ german }</td>
                        <td>{ hebrew }</td>
                        <td>{ french }</td>
                        <td>{ hungarian }</td>
                        <td>{ slovak }</td>
                        <td>{ spanish }</td>
                        <td>{ portuguese }</td>
                        <td>{ turkce }</td>
                        <td>{ greek }</td>
                        <td>{ romanian }</td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td>{ "loading" }</td>
                </tr>
            )
        }
    }

    componentDidMount() {
        fetch( 'https://cmlgbackend.wdcc.co.nz/translations' )
            .then( results => {
                return results.json();
            })
            .then( data => {
                let sortedListOfWords = [];
                let translationsForOneWord = [];
                let dataIndex;
                let currentData;

                for ( dataIndex = 0; dataIndex < data.length; dataIndex++ ) {
                    currentData = data[ dataIndex ];

                    // innerArray.length starts from 0 whereas language_id starts from 1.
                    // Check if the translated word is in the correct column (under the correct language). So if the
                    // English translation for the word is not under English, throw an exception.
                    // + 1 infront of translationsForOneWord.length because the index starts from 0, whereas language_id
                    // starts from 1.
                    if ( translationsForOneWord.length + 1 === currentData.language_id ) {
                        translationsForOneWord[ translationsForOneWord.length ] = currentData.name;
                    } else {
                        throw new Error( "The translated word does not match the language." );
                    }

                    const numberOfLanguages = 18;

                    // When the word is translated to all languages, add innerArray into sortedArray.
                    // Empty innerArray so a new innerArray can be made for a new word.
                    if ( translationsForOneWord.length === numberOfLanguages ) {
                        sortedListOfWords[ sortedListOfWords.length ] = translationsForOneWord;
                        translationsForOneWord = [];
                    }
                }

                // asynchronous
                this.setState({
                    translationData: sortedListOfWords
                });
            })
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">zh_cn</th>
                    <th scope="col">English</th>
                    <th scope="col">it_italiano</th>
                    <th scope="col">arabic</th>
                    <th scope="col">serbian</th>
                    <th scope="col">croatian</th>
                    <th scope="col">russian</th>
                    <th scope="col">de_german</th>
                    <th scope="col">hebrew</th>
                    <th scope="col">fr_french</th>
                    <th scope="col">hu_hungarian</th>
                    <th scope="col">slovak</th>
                    <th scope="col">es_spanish</th>
                    <th scope="col">portugues</th>
                    <th scope="col">turkce</th>
                    <th scope="col">gr_greek</th>
                    <th scope="col">romanian</th>
                </tr>
                </thead>

                <tbody>
                { this.renderTableData() }
                </tbody>
            </table>
        );
    }
}

export default Table;

