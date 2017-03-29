import React from 'react';

const BrowseSearch = (props) => {
	let genres = null;

	genres = props.genres.map((genre) => {
		return (
			<option value={genre.id} key={genre.id}>{genre.genre}</option>
		);
	});

	return (
		<div className="row">
			<div className="col-md-6 col-md-offset-3 well">
				<form className="search-form" role="form" onSubmit={props.handleSubmit} >
					<input name="search" id="search" autoComplete="off" type="search" placeholder="Search..." onChange={props.handleSearch} />
					<button className="btn btn-success button" type="submit">Search</button>

					<div className="select-search-container">
						<select name="genre" className="select-search">
							<option value="0">Genre</option>
							{genres}
						</select>
					</div>

				</form>
			</div>
		</div>
	);
}

export default BrowseSearch;