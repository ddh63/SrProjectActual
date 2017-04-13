import React from 'react';

import PageLink from './PageLink';

const ShoppingCartTable = (props) => {
	let movieTableHeader = null;
	let movieTableRows = null;
	let price = 0.0;
	let count = 0;
	let comment = null;

	if (typeof props.movies != 'undefined') {
		if (props.movies.length != 0) {
			movieTableHeader = (
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
			);
			movieTableRows = props.movies.map((movie) => {
				count++;
				price += movie.price;
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

	if (count == 0) {
		console.log(props.madepurchase);
		if (!props.madepurchase)
			comment = <h3 className="text-center site">No items in cart</h3>;
		else
			comment = <h3 className="text-center site">Purchase made</h3>;
	}
	else {
		comment = (
			<div className="text-center buttons">
				<h3 className="site">Total: ${price.toFixed(2)}</h3>;
				<button className="btn btn-success" onClick={props.makePurchase}>Purchase</button>
			</div>
		);
	}


	return (
		<div>
			{props.movies.length && 
				<div>
				<h4 className="text-center site">Movies</h4>
					<div className="cart-table-container">

						<table className="site">
							{movieTableHeader}
							<tbody>
								{movieTableRows}
							</tbody>
						</table>
					
					</div>
				</div>
			}
			{comment}
		</div>
	);
}

export default ShoppingCartTable;