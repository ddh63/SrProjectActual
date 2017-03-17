import React from 'react';
import PageLink from './PageLink';

const Loading = () => {
	return (
		<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<PageLink to="/" className="navbar-brand">Brand Name</PageLink>
					</div>
				</div>
			</nav>
	);
}

export default Loading; 