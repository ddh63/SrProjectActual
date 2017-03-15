import React, { Component } from 'react';
import LoginForm from './LoginForm';
import LoginFormLinks from './LoginFormLinks';

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
									<LoginFormLinks value={this.props.value} />
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