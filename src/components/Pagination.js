import React, { Component } from 'react';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 7,
			count: 20
		}
	}

	render() {
		let pages = [];
		let pagesAdded = 0;
		let pagesToDisplay = 10;
		let pagesEitherSide = 0;
		if (pagesToDisplay % 2 == 0)
			pagesEitherSide = Math.floor(pagesToDisplay / 2) - 1;
		else
			pagesEitherSide = Math.floor(pagesToDisplay / 2);

		for (var i = this.state.current - pagesEitherSide; pagesAdded < pagesToDisplay || i > this.state.count; i++) {
				if (i < 1)
					continue;
				if (i != this.state.current)
					pages.push(<li key={i}><a href='#'>{i}</a></li>);
				else
					pages.push(<li key={i}><a className='page-active' href='#'>{i}</a></li>);
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