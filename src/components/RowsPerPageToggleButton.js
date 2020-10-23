import React from 'react';
import "./css/RowsPerPageToggleButton.css"

export function RowsPerPageToggleButton( props ) {
	return (
		<div className="btn-group btn-group-toggle" data-toggle="buttons">
			<label className="btn btn-light toggle-button rounded-0 active">
				<input type="radio" name="options" id="10rows" value={ "10" } defaultChecked
					   onClick={ event => props.onButtonClicked( event.target.value ) }/> 10 rows
			</label>
			<label className="btn btn-light toggle-button rounded-0">
				<input type="radio" name="options" id="all" value={ "all" }
					   onClick={ event => props.onButtonClicked( event.target.value ) }/> all
			</label>
		</div>
	);
}