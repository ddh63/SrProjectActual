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
			deleteditem: false,
			madepurchase: false,
			movies: []
		}

		// Nav didn't update on initial load of this page
		// So put the user check here
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true }) });
	
			this.removeItem = this.removeItem.bind(this);
			this.makePurchase = this.makePurchase.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		// user is logged on due to user state changing
		// also, won't update cart on each page update
		// might change when implementing remove item
		if (this.state.user != prevState.user || this.state.deleteditem || this.state.madepurchase) {

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
				this.setState({ movies: data, deleteditem: false });
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
		}

	}

	removeItem(e) {
		var data = {
			user: this.state.user,
			id: e.target.dataset.id,
			type: e.target.dataset.type
		}

		$.ajax({
				type: 'POST',
				url: '/api/removeFromCart',
				data: data
			})
			.done((data) => {
				this.setState({ deleteditem: true });
				console.log(data);
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
	}

	makePurchase(e) {
		e.preventDefault();

		var data = {
			user: this.state.user,
			movies: this.state.movies
		}

		$.ajax({
			type: 'POST',
			url: '/api/purchase',
			data: data
		})
		.done((data) => {
			this.setState({ movies: [], madepurchase: true });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});
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

										<ShoppingCartTable 
											movies={this.state.movies}
											madepurchase={this.state.madepurchase}
											removeItem={this.removeItem}
											makePurchase={this.makePurchase} />

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