import React from 'react'

class SearchBar extends React.Component {

	render() {
		return (
			<div className="input-group flex-nowrap">
				<div className="input-group-prepend">
					<span className="input-group-text" id="addon-wrapping">search</span>
				</div>
				<input type="text" className="form-control" placeholder="search for ..."
					   onChange={ event => this.props.onChange(event) }
				/>
			</div>
		);
	}

}

export default SearchBar;