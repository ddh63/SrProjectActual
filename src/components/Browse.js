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
			newSearch: false,
			genre: 0,
			order: 1,
			genres: [],
			videos: [],
			pagination: true,
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
    this.handlePagination = this.handlePagination.bind(this);
		this.searchSubmit = this.searchSubmit.bind(this);

		this.checkLoadMore = this.checkLoadMore.bind(this);

		this.pageChange = this.pageChange.bind(this);
		this.pageChangeArrow = this.pageChangeArrow.bind(this);
	}

	componentDidMount() {
		document.addEventListener("scroll", this.debounce(this.checkLoadMore));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.debounce(this.checkLoadMore));
  }

  // Limits how often scroll event listener is called per second
  debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  checkLoadMore(e) {
  	if (!this.state.pagination && this.state.currentPage < this.state.pageCount) {
	  	let loadButton = document.getElementById('load-more');

	  	let loadInAt = (window.scrollY + window.innerHeight) - loadButton.clientHeight;
	  	let isShown = loadInAt > loadButton.offsetTop;
	  	if (isShown) {
	  		if (!loadButton.classList.contains('disabled')) {
	  			loadButton.classList.add('disabled');
	  			loadButton.innerHTML = "Loading...";
	  			this.getVideos(this.state.currentPage + 1);
	  		}
	  	}
  	}
  }

	handleSearch(e) {
		this.setState({ search: e.target.value, newSearch: true });
	}

	handleGenre(e) {
		this.setState({ genre: e.target.value });
	}

	handleOrder(e) {
		this.setState({ order: e.target.value });
	}

	handlePagination(e) {
		let boolVal = e.target.value == 1 ? true : false;
		this.setState({ pagination: boolVal });
	}

	searchSubmit(e) {
		e.preventDefault();
		this.getVideos(1);
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
			if (this.state.pagination || this.state.newSearch) {
				this.setState({ totalVideos: data[0], videos: data[1], pageCount: Math.ceil(data[0] / this.state.itemsPerPage), newSearch: false });
			}
			else {
				this.setState({ totalVideos: data[0], videos: [...this.state.videos, ...data[1]], pageCount: Math.ceil(data[0] / this.state.itemsPerPage), currentPage: page });
				let loadButton = document.getElementById('load-more');
				loadButton.classList.remove('disabled');
	  		loadButton.innerHTML = "Load More";
			}
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
					handlePagination={this.handlePagination}
					genres={this.state.genres} />

					{this.state.pageCount > 0 && this.state.totalVideos > 0 && this.state.pagination &&
						<div>
							<h3 className="text-center site video-count">{this.state.totalVideos} results found</h3>
							<Pagination
								pageChange={this.pageChange}
								pageChangeArrow={this.pageChangeArrow}
								currentPage={this.state.currentPage}
								pageCount={this.state.pageCount} />
						</div>
					}

					{!this.state.pagination &&
					<div>
						<h3 className="text-center site video-count">{this.state.totalVideos} results found</h3>
					</div>
					}

					<BrowseMovies videos={this.state.videos} />

					{!this.state.pagination && this.state.currentPage < this.state.pageCount &&
						<div className="text-center buttons">
							<button className="btn btn-default" id="load-more" role="button">Load More</button>
						</div>
					}

					{this.state.pageCount > 0 && this.state.totalVideos > 0 && this.state.pagination &&
						<Pagination
							pageChange={this.pageChange}
							pageChangeArrow={this.pageChangeArrow}
							currentPage={this.state.currentPage}
							pageCount={this.state.pageCount} />
					}

				</div>
			</div>
		);
	}

}

export default Browse;