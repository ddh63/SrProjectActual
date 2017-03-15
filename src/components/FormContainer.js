import React, { Component } from 'react';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="container site">
				<div className="row">
					<div className="flex-container">
						<div className="col-md-6">
							<div className="panel panel-login">
								<div className="panel-heading">
									<div className="row">
										<div className="col-xs-6">
											<a href="#" className="active">Login</a>
										</div>
										<div className="col-xs-6">
											<a href="#">Register</a>
										</div>
									</div>
								</div>
								<div className="panel-body">
									<div className="row">
										<div className="col-lg-12">
											<form id="login-form" action="#" method="post" role="form">
												<div className="form-group">
													<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
												</div>
												<div className="form-group">
													<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
												</div>
												<div className="form-group">
													<div className="row">
														<div className="col-sm-6 col-sm-offset-3">
															<input type="submit" name="login-submit" id="login-submit" tabIndex="3" className="form-control btn btn-success btn-logreg" value="Log In" />
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormContainer;