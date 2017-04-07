import React, { Component } from 'react';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 28,
			count: 35
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
			pagesEitherSide = pagesToDisplay / 2 - 1;
		else
			pagesEitherSide = Math.floor(pagesToDisplay / 2);

		// Logic to put more pages on left side when close to last page
		if (this.state.count - this.state.current <= pagesEitherSide) {
			pagesEitherSide += pagesEitherSide - (this.state.count - this.state.current);
			if (evenPageDisplay) {
				pagesEitherSide++;
			}
		}

		if (this.state.current - pagesEitherSide > 1) {

		}

		let addToBack = true;
		for (var i = this.state.current - pagesEitherSide; pagesAdded < pagesToDisplay; i++) {
				if (i > this.state.count) 
					break;
				if (i < 1)
					continue;
				if (i != this.state.current)
					pages.push(<li key={i}><a href='#' onClick={this.pageChange}>{i}</a></li>);
				else
					pages.push(<li key={i}><span className='page-active'>{i}</span></li>);
				pagesAdded++;
				if (pagesAdded == pagesToDisplay && i == this.state.count)
					addToBack = false;
		}

		// Stupid amount of logic on whether or not to use ellipsis on end of pagination
		let ellipsisBack = true;
		let overrideEllipsis = false;

		if (evenPageDisplay) {
			if (this.state.current + pagesEitherSide == this.state.count - 2 || pagesToDisplay / 2 + this.state.current >= this.state.count)
				ellipsisBack = false;
			// Replaces ellipsis with second to last page
			if (this.state.current + pagesEitherSide + 1 == this.state.count - 2)
				overrideEllipsis = true;
		}
		else {
			if (this.state.current + pagesEitherSide >= this.state.count - 1)
				ellipsisBack = false;
			// Replaces ellipsis with second to last page
			if (this.state.current + pagesEitherSide == this.state.count - 2)
				overrideEllipsis = true;
		}


		if (ellipsisBack) {
			if (overrideEllipsis)
				pages.push(<li key={this.state.count - 1}><a href="#" onClick={this.pageChange}>{this.state.count - 1}</a></li>);
			else
				pages.push(<li key={this.state.count - 1}><span className="ellipsis">...</span></li>);
		}

		if (addToBack)
				pages.push(<li key={this.state.count}><a href="#" onClick={this.pageChange}>{this.state.count}</a></li>);

		return (
			<div className="container">
				<div className="row">
					<div className="pagination-container">
						<ul className="pagination site">
							<li><span>...</span></li>
							{pages}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Pagination;