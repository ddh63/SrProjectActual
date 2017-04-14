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
			update: false,
			deleteditemvalue: [],
			madepurchase: false,
			movies: []
		}

		// Nav didn't update on initial load of this page
		// So put the user check here
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true }) 
			});
	
			this.removeItem = this.removeItem.bind(this);
			this.makePurchase = this.makePurchase.bind(this);
			this.reAddVideo = this.reAddVideo.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		// user is logged on due to user state changing
		// also, won't update cart on each page update
		// might change when implementing remove item
		if (this.state.user != prevState.user || this.state.update || this.state.madepurchase) {

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
				this.setState({ movies: data, update: false });
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
				this.setState({ update: true, deleteditemvalue: data[0] });
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
	}

	reAddVideo(e) {
		var data = {
			id: this.state.deleteditemvalue.id,
			user: this.state.user
		}

		$.ajax({
			type: 'POST',
			url: '/api/addToCart',
			data: data
		})
		.done((data) => {
			this.setState({ deleteditemvalue: [], update: true });
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
		let comment = null;

		if (this.state.deleteditemvalue.length != 0) {
			comment = (
				<p className="text-center site">Removed <PageLink to={"/movie/" + this.state.deleteditemvalue.id}><strong>{this.state.deleteditemvalue.title}</strong></PageLink> from cart. <span onClick={this.reAddVideo} className="undo-delete">Undo.</span></p>
			);
		}

		return (
			<div>
				<Nav 
					user={this.getUser} />
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">

						<h1 className="text-center site cart-head">Shopping Cart</h1>
							<div id="removeitemconfirm">
								{comment}
							</div>
							{this.state.user && this.state.loaded &&
								<div className="cart">

										<ShoppingCartTable 
											movies={this.state.movies}
											madepurchase={this.state.madepurchase}
											removeItem={this.removeItem}
											makePurchase={this.makePurchase} />

								</div>
							}

							{!this.state.user && this.state.loaded &&
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