import React, { Component } from 'react';

import Nav from './Nav';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<Nav />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">

						<h1 className="text-center site cart-head">Shopping Cart</h1>

							<div className="cart">

								<form>

									<table className="site">
										<thead>
											<tr>
												<th>Title</th>
												<th>Description</th>
												<th>Price</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Logan</td>
												<td>Movie</td>
												<td>$6.99</td>
												<td>X</td>
											</tr>
											<tr>
												<td>Logan</td>
												<td>Movie</td>
												<td>$6.99</td>
												<td>X</td>
											</tr>
										</tbody>
									</table>

								</form>

							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShoppingCart;