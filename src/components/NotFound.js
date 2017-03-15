import React from 'react';
import Nav from './Nav';
import PageLink from './PageLink';

const NotFound = () => (
	<div>
		<Nav />
		<div className="container-fluid site">
			<div className="container flex-container">
				<div className="col-md-6">
					<h1 className="text-center logo-header">Page Not Found</h1>
					<div className="buttons text-center">
						<PageLink to="/" className="btn btn-success" role="button">Home</PageLink>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default NotFound;