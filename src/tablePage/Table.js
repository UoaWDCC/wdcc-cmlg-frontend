import React from 'react';

class Table extends React.Component {
	constructor( props ) {
		console.log("table constructor called")
		super( props );
		this.state = {
			data: [],
			isLoading: true,
			languages: [
				"zh_cn", "pinyin", "en_english", "it_italiano", "arabic", "serbian", "croatian",
				"russian", "de_german", "hebrew", "fr_french", "hu_hungarian", "slovak", "es_spanish",
				"portugues", "turkce", "gr_greek", "romanian"
			],
			searchWord: null,
		};
	}

	componentDidMount() {
		// const url = "https://cors-anywhere.herokuapp.com/cmlgbackend.wdcc.co.nz/translations/covid";
		const url = "https://cmlgbackend.wdcc.co.nz/translations/covid";

		this.setState({
			isLoading: true,
		});

		fetch( url )
			.then( ( response ) => response.json() )
			.then(( data ) => {
				this.manipulateData( data );
			});
		console.log( "component did mount called" )
		// console.log( this.state.data );
	}

	manipulateData( data ) {
		// loop through all the data
		let wordsInRow = [];
		let manipulateData = [];
		for( let i = 0; i < data.length; i++ ) {
			const word = data[i];

			if( word.language_name === this.state.languages[ wordsInRow.length ] ) {
				wordsInRow[ wordsInRow.length ] = word.name;
				// console.log(wordsInRow)
			} else {
				throw new Error("words don't match languages");
			}

			if( wordsInRow.length === this.state.languages.length ) {
				manipulateData[ manipulateData.length ] = wordsInRow;
				wordsInRow = [];
			}
		}

		this.setState({
			data: manipulateData,
		}, () => {
			// console.log( "data in state " + this.state.data[0] )
			this.setState({
				isLoading: false,
			});
		});
	}

	renderTableData() {
		console.log("render table data called");

		const data = this.state.data;
		if( data.length > 0 ) {
			console.log( "render table data " + data );
		} else {
			console.log( "no data" )
		}

		const isLoading = this.state.isLoading;
		if( isLoading && data.length <= 0 ) {
			console.log("loading")
			return (
				<tr>
					<td>loading</td>
				</tr>
			);
		} else {

			return data.map(( wordsInRow, rowIndex ) => {
				return(
					<tr key={ rowIndex }>
						{
							wordsInRow.map(( word, colIndex ) => {
								return (
									<td key={ colIndex }>{ word }</td>
								);
							})
						}
					</tr>
				);
			});

		}
	}

	componentDidUpdate( prevProps) {
		// Typical usage (don't forget to compare props):
		if ( this.props.searchWord !== prevProps.searchWord ) {
			// changes occur, do network requests
			// const url = "https://cors-anywhere.herokuapp.com/cmlgbackend.wdcc.co.nz/translations/covid";
			const url = "https://cmlgbackend.wdcc.co.nz/translations/" + this.props.searchWord;
			console.log(url);

			this.setState({
				isLoading: true,
			});

			fetch( url )
				.then( ( response ) => response.json() )
				.then(( data ) => {
					this.manipulateData( data );
				});

			// this.fetchData(this.props.userID);
			console.log("did update called")
		}
	}


	render() {
		console.log("render table called");

		return(
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">zh_cn</th>
						<th scope="col">pinyin</th>
						<th scope="col">en_english</th>
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
