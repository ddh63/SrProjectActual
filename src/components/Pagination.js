import React, { Component } from 'react';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 2,
			count: 20
		}
	}

	render() {
		let pages = [];
		for (var i = 1; i <= this.state.count; i++) {
			// TODO: Add logic to only show up to ten pages
			pages.push(<li key={i}><a href='#'>{i}</a></li>);
		}

		return (
			<nav aria-label="Page navigation">
				<ul className="pagination">
					<li>
						<a href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					{pages}
					<li>
						<a href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Pagination;

// <nav aria-label="Page navigation">
//   <ul class="pagination">
//     <li>
//       <a href="#" aria-label="Previous">
//         <span aria-hidden="true">&laquo;</span>
//       </a>
//     </li>
//     <li><a href="#">1</a></li>
//     <li><a href="#">2</a></li>
//     <li><a href="#">3</a></li>
//     <li><a href="#">4</a></li>
//     <li><a href="#">5</a></li>
//     <li>
//       <a href="#" aria-label="Next">
//         <span aria-hidden="true">&raquo;</span>
//       </a>
//     </li>
//   </ul>
// </nav>