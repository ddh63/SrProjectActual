import React from 'react';

const BrowseSearch = (props) => {
	return (
		<div className="row">
			<div className="col-md-6 col-md-offset-3 well">
				<form className="search-form" role="form" onSubmit={props.handleSubmit} >
					<input name="search" id="search" autoComplete="off" type="search" placeholder="Search..." onChange={props.handleSearch} />
					<button className="btn btn-success button" type="submit">Search</button>
				</form>
			</div>
		</div>
	);
}

export default BrowseSearch;