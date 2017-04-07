import React from 'react';

const Pagination = (props) => {
		let pages = [];
		let pagesAdded = 0;
		let pagesToDisplay = 9;
		let pagesEitherSide = 0;
		let evenPageDisplay = !(pagesToDisplay % 2);

		if (evenPageDisplay)
			// Puts one less on left than right
			pagesEitherSide = pagesToDisplay / 2 - 1;
		else
			pagesEitherSide = Math.floor(pagesToDisplay / 2);

		// Logic to put more pages on left side when close to last page
		if (props.pageCount - props.currentPage <= pagesEitherSide) {
			pagesEitherSide += pagesEitherSide - (props.pageCount - props.currentPage);
			if (evenPageDisplay) {
				pagesEitherSide++;
			}
		}

		// Add arrow if page number is greater than 1
		if (props.currentPage > 1) {
			pages.push(<li key={0}><a href='#' className="back-arrow" onClick={(e) => props.pageChangeArrow(e, -1)}><i className="fa fa-angle-left"></i></a></li>);
		}

		// Logic for ellipsis on the front part of pagination
		if (props.currentPage - pagesEitherSide > 1) {
			pages.push(<li key={1}><a href='#' onClick={props.pageChange}>1</a></li>);
		}
		if (props.currentPage - pagesEitherSide >= 3) {
			pages.push(<li key={2}><span className="ellipsis">...</span></li>);
		}

		let addToBack = true;
		for (var i = props.currentPage - pagesEitherSide; pagesAdded < pagesToDisplay; i++) {
				if (i > props.pageCount) 
					break;
				if (i < 1)
					continue;
				if (i != props.currentPage)
					pages.push(<li key={i}><a href='#' onClick={props.pageChange}>{i}</a></li>);
				else
					pages.push(<li key={i}><span className='page-active'>{i}</span></li>);
				pagesAdded++;
				if (pagesAdded == pagesToDisplay && i == props.pageCount)
					addToBack = false;
		}

		// Stupid amount of logic on whether or not to use ellipsis on end of pagination
		let ellipsisBack = true;
		let overrideEllipsis = false;

		if (evenPageDisplay) {
			if (props.currentPage + pagesEitherSide == props.pageCount - 2 || pagesToDisplay / 2 + props.currentPage >= props.pageCount)
				ellipsisBack = false;
			// Replaces ellipsis with second to last page
			if (props.currentPage + pagesEitherSide + 1 == props.pageCount - 2)
				overrideEllipsis = true;
		}
		else {
			if (props.currentPage + pagesEitherSide >= props.pageCount - 1)
				ellipsisBack = false;
			// Replaces ellipsis with second to last page
			if (props.currentPage + pagesEitherSide == props.pageCount - 2)
				overrideEllipsis = true;
		}


		if (ellipsisBack) {
			if (overrideEllipsis)
				pages.push(<li key={props.pageCount - 1}><a href="#" onClick={props.pageChange}>{props.pageCount - 1}</a></li>);
			else
				pages.push(<li key={props.pageCount - 1}><span className="ellipsis">...</span></li>);0
		}

		if (addToBack)
				pages.push(<li key={props.pageCount}><a href="#" onClick={props.pageChange}>{props.pageCount}</a></li>);

		// Add arrow if page number is less than last page
		if (props.currentPage < props.pageCount) {
			pages.push(<li key={props.pageCount + 1}><a href='#' className="back-arrow" onClick={(e) => props.pageChangeArrow(e, 1)}><i className="fa fa-angle-right"></i></a></li>);
		}

		// Make pagination for small screens
		let pagesSmall = [];

		if (props.currentPage > 1) 
			pagesSmall.push(<li key={1}><a href='#' onClick={(e) => props.pageChangeArrow(e, -1)}><i className="fa fa-angle-left"></i></a></li>);

		pagesSmall.push(<li key={2}><span className='small-page-count'>{props.currentPage} of {props.pageCount}</span></li>);

		if (props.currentPage < props.pageCount)
			pagesSmall.push(<li key={3}><a href='#' onClick={(e) => props.pageChangeArrow(e, 1)}><i className="fa fa-angle-right"></i></a></li>);

		return (
			<div className="container">
				<div className="row">
					<div className="pagination-container">
						<ul className="hidden-xs hidden-sm pagination site">
							{pages}
						</ul>
						<ul className="hidden-md hidden-lg hidden-xl pagination site">
							{pagesSmall}
						</ul>
					</div>
				</div>
			</div>
		);
}

export default Pagination;