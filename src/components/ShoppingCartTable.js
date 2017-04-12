import React from 'react';

import PageLink from './PageLink';

const ShoppingCartTable = (props) => {
	let tableHeader = null;
	let tableRows = null;

	if (typeof props.movies != 'undefined') {
		if (props.movies.length != 0) {
			tableHeader = (
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
			);
			tableRows = props.movies.map((movie) => {
				return (
					<tr key={movie.id}>
						<td><PageLink to={"/movie/" + movie.id} className="cart-title">{movie.title}</PageLink></td>
						<td>Movie</td>
						<td>${movie.price}</td>
						<td><i data-id={movie.id} data-type={1} className="cart-remove fa fa-times" aria-hidden="true" onClick={props.removeItem}></i></td>
					</tr>
				);
			});
		}
	}


	return (
		<div>
			{props.movies.length && 
				<div>
				<h4 className="text-center site">Movies</h4>
					<div className="cart-table-container">

						<table className="site">
							{tableHeader}
							<tbody>
								{tableRows}
							</tbody>
						</table>
					
					</div>
				</div>
			}
		</div>
	);
}

export default ShoppingCartTable;