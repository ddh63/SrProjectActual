import React from 'react';
import LoginForm from './LoginForm';
import LoginFormLinks from './LoginFormLinks';

const FormContainer = (props) => {
	return (
		<div className="container site">
			<div className="row">
				<div className="flex-container">
					<div className="col-md-6">
						<div className="panel panel-login">
							<div className="panel-heading">
								<LoginFormLinks value={props.value} />
							</div>
							<div className="panel-body">
								<div className="row">
									<div className="col-lg-12">
										<LoginForm value={props.value}
											userField={props.userField}
											emailField={props.emailField}
											passField={props.passField}
											confirmpassField={props.confirmpassField}
											loginSubmit={props.loginSubmit}
											registerSubmit={props.registerSubmit} />
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

export default FormContainer;