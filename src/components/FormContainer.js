import React, { Component } from 'react';
import LoginForm from './LoginForm';

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
											<LoginForm value={this.props.value} />
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