import React from 'react';

import PageLink from './PageLink';

const ShoppingCartTable = (props) => {
	let tableHeader = null;
	let tableRows = null;

	if (typeof props.movies != 'undefined') {
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
					<td><i data-id={movie.id} className="cart-remove fa fa-times" aria-hidden="true" onClick={props.removeItem}></i></td>
				</tr>
			);
		});
	}


	return (
		<div className="cart-table-container">
			<table className="site">
				{tableHeader}
				<tbody>
					{tableRows}
				</tbody>
			</table>
		</div>
	);
}

export default ShoppingCartTable;