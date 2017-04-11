import React, { Component } from 'react';

import Nav from './Nav';
import ShoppingCartTable from './ShoppingCartTable';
import PageLink from './PageLink';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			loaded: false,
			movies: []
		}

		// Nav didn't update on initial load of this page
		// So put the user check here
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true }) });
	}

	componentDidUpdate(prevProps, prevState) {
		// user is logged on due to user state changing
		// also, won't update cart on each page update
		// might change when implementing remove item
		if (this.state.user != prevState.user) {

			var data = {
				user: this.state.user
			};

			// Get movie information
			$.ajax({
				type: 'POST',
				url: '/api/fillCartMovies',
				data: data
			})
			.done((data) => {
				this.setState({ movies: data });
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
		}

	}


	render() {
		return (
			<div>
				<Nav 
					user={this.getUser} />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">

						<h1 className="text-center site cart-head">Shopping Cart</h1>

							{this.state.user && this.state.loaded &&
								<div className="cart">

									<form>

										<h4 className="text-center site">Movies</h4>
										<ShoppingCartTable 
											movies={this.state.movies} />

									</form>

								</div>
							}

							{this.state.loaded && !this.state.user &&
								<div className="buttons text-center">
									<PageLink to="login" className="btn btn-success">Login</PageLink>
								</div>
							}

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ShoppingCart;