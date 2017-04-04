import React, { Component } from 'react';

import Loading from './Loading';
import Nav from './Nav';
import BrowseSearch from './BrowseSearch';
import BrowseMovies from './BrowseMovies';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loaded: false,
			search: '',
			genre: 0,
			order: 1,
			genres: [],
			videos: []
		};

		document.title = "Browse";

		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => this.setState({ user: result.user, loaded: true }));

		fetch('/api/getGenres')
			.then((response) => response.json())
			.then((result) => this.setState({ genres: result }));

		this.getInitialVideos();

    this.handleSearch = this.handleSearch.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
		this.searchSubmit = this.searchSubmit.bind(this);

		this.checkScroll = this.checkScroll.bind(this);
		this.addVideos = this.addVideos.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.checkScroll);
	}

	componentWillMount() {
		window.removeEventListener('scroll', this.checkScroll);
	}

	checkScroll() {
		let windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
    let documentHeight = Math.max(
    		document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    let trackLength = documentHeight - windowHeight
		let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let pctScrolled = Math.floor(scrollTop / trackLength * 100);

    // TODO: Add logic that stops this from being called if there's no more vidoes to get
    if (pctScrolled == 100) {
   		this.addVideos();	
   	}
	}

	// TODO: Add limits to the database query to get only the next page worth of results
	addVideos() {
		var data = {
				'search': this.state.search,
				'genre': this.state.genre,
				'order': this.state.order
			}

			$.ajax({
				type: 'POST',
				url: '/api/getSearch',
				data: data
			})
			.done((data) => {
				this.setState(previousState => ({ videos: [...previousState.videos, ...data] }));
			})
			.fail((jqXhr) => {
				console.log("AJAX failure");
			})
	}

	handleSearch(e) {
		this.setState({ search: e.target.value });
	}

	handleGenre(e) {
		this.setState({ genre: e.target.value });
	}

	handleOrder(e) {
		this.setState({ order: e.target.value });
	}

	searchSubmit(e) {
		e.preventDefault();
		this.getInitialVideos();
	}

	getInitialVideos() {
		var data = {
			'search': this.state.search,
			'genre': this.state.genre,
			'order': this.state.order
		}

		$.ajax({
			type: 'POST',
			url: '/api/getSearch',
			data: data
		})
		.done((data) => {
			this.setState({ videos: data });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})
	}

	render() {
		if (!this.state.loaded) return <Loading />;
		return (
			<div>
				<Nav user={this.state.user} />
				<div className="container">
					<BrowseSearch 
					handleSearch={this.handleSearch}
					handleSubmit={this.searchSubmit}
					handleGenre={this.handleGenre}
					handleOrder={this.handleOrder}
					genres={this.state.genres} />

					<BrowseMovies videos={this.state.videos} />
				</div>
			</div>
		);
	}

}

export default Browse;