import React, { Component } from 'react';

const styles =
{
	infoText:
	{
		"color":"purple",
		"fontSize":"30px",
		"textAlign":"center"
	}
}

class Login extends Component 
{
	render()
	{
		return (


			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<p style={styles.infoText}>Login</p>
						<form>
							<div className="form-group">
								<label htmlFor="login-email">Email address</label>
								<input type="email" className="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email" required/>
							</div>
							<div className="form-group">
								<label htmlFor="login-password">Password</label>
								<input type="password" className="form-control" id="login-password" placeholder="Enter Password" required/>
							</div>

							<button type="submit" className="btn btn-primary">Login</button>
						</form>
					</div>
					<div className="col-md-6">
						<p style={styles.infoText}>Register</p>
						<form>
							<div className="form-group">
								<label htmlFor="register-name">Name</label>
								<input type="text" className="form-control" id="register-name" aria-describedby="emailHelp" placeholder="Enter name" required/>
							</div>
							<div className="form-group">
								<label htmlFor="register-email">Email address</label>
								<input type="email" className="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email" required/>
							</div>
							<div className="form-group">
								<label htmlFor="register-password">Password</label>
								<input type="password" className="form-control" id="register-password" placeholder="Enter password" required/>
							</div>
							<div className="form-group">
								<label htmlFor="register-age">Age</label>
								<input type="number" className="form-control" id="register-age" placeholder="Enter age" required/>
							</div>

							<button type="submit" className="btn btn-primary">Register</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;