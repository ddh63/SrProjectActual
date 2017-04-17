import React, { Component } from 'react';

import Nav from './Nav';
import PageLink from './PageLink';
import BrowseSearch from './BrowseSearch';
import BrowseMovies from './BrowseMovies';
import Pagination from './Pagination';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: false,
			loaded: false,
			search: '',
			newSearch: false,
			genre: 0,
			order: 1,
			genres: [],
			videos: [],
			trackPagination: 1,
			pagination: true,
			itemsPerPage: 12,
			totalVideos: 0,
			currentPage: 1,
			pageCount: 1
		}

		document.title = "Account";

		// Nav didn't update on initial load of this page
		// So put the user check here
		fetch('/api/isLoggedIn')
			.then((response) => response.json())
			.then((result) => { 
				this.setState({ user: result.user, loaded: true }) 
			});

		fetch('/api/getGenres')
			.then((response) => response.json())
			.then((result) => this.setState({ genres: result }));

    this.handleSearch = this.handleSearch.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
		this.searchSubmit = this.searchSubmit.bind(this);

		this.checkLoadMore = this.checkLoadMore.bind(this);

		this.smoothScroll = this.smoothScroll.bind(this);

		this.pageChange = this.pageChange.bind(this);
		this.pageChangeArrow = this.pageChangeArrow.bind(this);

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.user != prevState.user) {
			this.getVideos(this.state.currentPage);
		}
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
		this.setState({ search: e.target.value });
	}

	handleGenre(e) {
		this.setState({ genre: e.target.value });
	}

	handleOrder(e) {
		this.setState({ order: e.target.value });
	}

	handlePagination(e) {
		this.setState({ trackPagination: e.target.value });
	}

	searchSubmit(e) {
		e.preventDefault();
		this.setState({ newSearch: true });
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

	smoothScroll(e) {
		let docHeight = document.body.scrollTop;

		// 25 intervals == 0.5 seconds
		let scrollUp = Math.ceil(docHeight / 25);

		let intr = setInterval(function() {
			window.scrollBy(0, -scrollUp);
			docHeight -= scrollUp;
			if (docHeight < 0) clearInterval(intr);
		}, 20);
	}

	getVideos(page) {
		var data = {
			'user': this.state.user,
			'search': this.state.search,
			'genre': this.state.genre,
			'order': this.state.order,
			'itemsPerPage': this.state.itemsPerPage,
			'currentPage': page
		}

		$.ajax({
			type: 'POST',
			url: '/api/getOwnedVideos',
			data: data
		})
		.done((data) => {
			if (this.state.newSearch) {
				if (this.state.trackPagination == 1)
					this.setState({ totalVideos: data[0], videos: data[1], pageCount: Math.ceil(data[0] / this.state.itemsPerPage), pagination: true, currentPage: 1, newSearch: false });
				else
					this.setState({ totalVideos: data[0], videos: data[1], pageCount: Math.ceil(data[0] / this.state.itemsPerPage), pagination: false, currentPage: 1, newSearch: false });
			}
			else if (this.state.trackPagination == 1) {
				this.setState({ totalVideos: data[0], videos: data[1], pageCount: Math.ceil(data[0] / this.state.itemsPerPage), pagination: true, newSearch: false });
			}
			else {
				this.setState({ totalVideos: data[0], videos: [...this.state.videos, ...data[1]], pageCount: Math.ceil(data[0] / this.state.itemsPerPage), currentPage: page });
				let loadButton = document.getElementById('load-more');
				if (typeof loadButton != 'undefined' && loadButton != null) {
					loadButton.classList.remove('disabled');
		  		loadButton.innerHTML = "Load More";
		  	}
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

				{this.state.user && this.state.loaded &&
					<div className="container">
						<h1 className="text-center site">Owned videos</h1>
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
								<button className="btn btn-default" id="load-more" role="button" onClick={this.checkLoadMore}>Load More</button>
							</div>
						}

						{!this.state.pagination && this.state.currentPage == this.state.pageCount && this.state.pageCount > 1 &&
							<div className="text-center buttons">
								<button className="btn btn-default" id="to-the-top" role="button" onClick={this.smoothScroll}>Back to Top</button>
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
				}

				{!this.state.user && this.state.loaded &&
					<div className="container">
						<h1 className="text-center site">Shopping Cart</h1>
						<div className="buttons text-center">
							<PageLink to="login" className="btn btn-success">Login</PageLink>
						</div>
					</div>
				}

			</div>
		);
	}
}

export default Account;