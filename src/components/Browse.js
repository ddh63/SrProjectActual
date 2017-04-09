import React, { Component } from 'react';

import Nav from './Nav';
import BrowseSearch from './BrowseSearch';
import BrowseMovies from './BrowseMovies';
import Pagination from './Pagination';

class Browse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			genre: 0,
			order: 1,
			genres: [],
			videos: [],
			itemsPerPage: 12,
			totalVideos: 0,
			currentPage: 1,
			pageCount: 1
		};

		document.title = "Browse";

		fetch('/api/getGenres')
			.then((response) => response.json())
			.then((result) => this.setState({ genres: result }));

		this.getVideos(this.state.currentPage);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
		this.searchSubmit = this.searchSubmit.bind(this);

		this.pageChange = this.pageChange.bind(this);
		this.pageChangeArrow = this.pageChangeArrow.bind(this);
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
		this.getVideos(this.state.currentPage);
	}

	pageChange(e) {
		e.preventDefault();
		let page = parseFloat(e.target.innerHTML);
		if (Number.isInteger(page)) {
			this.setState({ currentPage: page });
			this.getVideos(page);
		}
	}

	pageChangeArrow(e, val) {
		e.preventDefault();
		// Prevent click adding focus to the arrow buttons
		e.target.tagName == 'A' ? e.target.blur() :	e.target.parentNode.blur();		
		this.setState({ currentPage: this.state.currentPage + val });
		this.getVideos(this.state.currentPage + val);
	}

	getVideos(page) {
		var data = {
			'search': this.state.search,
			'genre': this.state.genre,
			'order': this.state.order,
			'itemsPerPage': this.state.itemsPerPage,
			'currentPage': page
		}

		$.ajax({
			type: 'POST',
			url: '/api/getSearch',
			data: data
		})
		.done((data) => {
			this.setState({ totalVideos: data[0], videos: data[1], pageCount: Math.ceil(data[0] / this.state.itemsPerPage) });
		})
		.fail((jqXhr) => {
			console.log("AJAX failure");
		})
	}

	render() {
		return (
			<div>
				<Nav />
				<div className="container">
					<BrowseSearch 
					handleSearch={this.handleSearch}
					handleSubmit={this.searchSubmit}
					handleGenre={this.handleGenre}
					handleOrder={this.handleOrder}
					genres={this.state.genres} />

					<Pagination
						pageChange={this.pageChange}
						pageChangeArrow={this.pageChangeArrow}
						currentPage={this.state.currentPage}
						pageCount={this.state.pageCount} />

					<BrowseMovies videos={this.state.videos} />

					<Pagination
						pageChange={this.pageChange}
						pageChangeArrow={this.pageChangeArrow}
						currentPage={this.state.currentPage}
						pageCount={this.state.pageCount} />
				</div>
			</div>
		);
	}

}

export default Browse;