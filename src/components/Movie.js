import React, { Component } from 'react';

import PageLink from './PageLink';
import Nav from './Nav';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			loaded: false,
			owned: false,
			id: this.props.params.id,
			movie: []
		}

		// Nav didn't update on initial load of this page
		// So put the user check here
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true }) });

		var data = {
			type: 1,
			id: this.state.id || 1
		};

		$.ajax({
			type: 'POST',
			url: '/api/getSingleVideo',
			data: data
		})
		.done((data) => {
			this.setState({ movie: data });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});

		this.addToCart = this.addToCart.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.user != prevState.user) {
			var data = {
				user: this.state.user,
				id: this.state.id || 1
			}

			$.ajax({
				type: "POST",
				url: "/api/checkOwned",
				data: data
			})
			.done((data) => {
				this.setState({ owned: data });
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			});
		}
	}

	addToCart(e) {
		e.preventDefault();
		var data = {
			user: this.state.user,
			id: this.state.id
		};

		$.ajax({
			type: 'POST',
			url: '/api/addToCart',
			data: data
		})
		.done((data) => {
			if (data)
				document.getElementById('cart-text').innerHTML = "<h3 class='text-center site'>Added to cart</h3>";
			else
				document.getElementById('cart-text').innerHTML = "<h3 class='text-center site'>Item already in cart</h3>";
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		});
	}

	render() {
		if (typeof this.state.movie[0] === 'undefined') {
			document.title = "Loading";
			return (
				<div>
					<Nav />
				</div>
			);
		}

		document.title = this.state.movie[0].title + " (" + this.state.movie[0].year + ")";

		let numGenres = this.state.movie[0].genres.length;
		let count = 0;
		let genres = this.state.movie[0].genres.map((genre) => {
			count++;
			if (count != numGenres) {
				return (
					<span key={genre.id}>{genre.genre}, </span>
				);
			}
			else {
				return (
					<span key={genre.id}>{genre.genre}</span>
				);
			}
		});

		let button = null;

		if (this.state.loaded) {
			if (!this.state.user) {
				button = <PageLink to="/login" className="btn btn-success">Login to Watch/Purchase</PageLink>;
			}
			else {
				if (!this.state.owned)
					button = <a href="#" className="btn btn-success" onClick={this.addToCart}>Add to Cart (${this.state.movie[0].price})</a>
				else
					button = <PageLink to={"/video/1/"+this.state.id} className="btn btn-success">Watch</PageLink>
			}
		}

		return (
			<div>
				<Nav />
				<div className="container well">
					<div className="row">
						<div className="col-sm-4 poster">
							<img src="/img/posterplaceholder.png" />
						</div>
						<div className="col-sm-8 description">
							<h1 className="text-center site">{this.state.movie[0].title} ({this.state.movie[0].year})</h1>
							<p className="text-center site">{genres}</p>
							<p className="site">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<div id="cart-text"></div>
							<div className="buttons text-center">
								{button}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;