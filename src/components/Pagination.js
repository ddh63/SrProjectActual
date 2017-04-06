import React, { Component } from 'react';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 1,
			count: 7
		}

		this.pageChange = this.pageChange.bind(this);
	}

	pageChange(e) {
		e.preventDefault();
		let page = parseFloat(e.target.innerHTML);
		if (Number.isInteger(page))
			this.setState({ current: page });
	}

	render() {
		let pages = [];
		let pagesAdded = 0;
		let pagesToDisplay = 10;
		let pagesEitherSide = 0;
		let evenPageDisplay = !(pagesToDisplay % 2);

		if (evenPageDisplay)
			// Puts one less on left than right
			pagesEitherSide = Math.floor(pagesToDisplay / 2) - 1;
		else
			pagesEitherSide = Math.floor(pagesToDisplay / 2);

		// Logic to put more pages on left side when close to last page
		if (this.state.count - this.state.current <= pagesEitherSide) {
			pagesEitherSide += pagesEitherSide - (this.state.count - this.state.current);
			if (evenPageDisplay) pagesEitherSide++;
		}

		for (var i = this.state.current - pagesEitherSide; pagesAdded < pagesToDisplay; i++) {
				if (i > this.state.count) 
					break;
				if (i < 1)
					continue;
				if (i != this.state.current)
					pages.push(<li key={i}><a href='#' onClick={this.pageChange}>{i}</a></li>);
				else
					pages.push(<li key={i}><a className='page-active' href='#' onClick={this.pageChange}>{i}</a></li>);
				pagesAdded++;
		}

		return (
			<div className="container">
				<div className="row">
					<div className="pagination-container">
						<ul className="pagination site">
							{pages}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Pagination;