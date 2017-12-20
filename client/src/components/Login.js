import React, { Component } from 'react';
import { Link } from "react-router-dom";
import API from "../utils/API";
import logo from '../images/logo1.png';
import styles from '../css/style.css';


class Login extends Component 
{
	state = 
	{
		"loginEmail": "",
		"loginPassword": "",
		"registerName": "",
		"registerEmail": "",
		"registerPassword": "",
		"registerAge": "",
	}

	updateField = event =>
	{
		this.setState({[event.target.id]:event.target.value})
	}

	login = event =>
	{
		event.preventDefault()
		console.log(this.state.loginEmail)
		console.log(this.state.loginPassword)

		const data = 
		{
			"email":this.state.loginEmail,
			"password":this.state.loginPassword
		}

		API.login(data, function(result)
		{
			console.log("Done with login!")
			console.log(result)
		})

	}

	register = event =>
	{
		event.preventDefault()

		const data = 
		{
			"name": this.state.registerName,
			"email": this.state.registerEmail,
			"password": this.state.registerPassword,
			"age": this.state.registerAge
		}

		API.register(data)
	}

	render()
	{
		return (

			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<p style={styles.infoText}>Login</p>
						<form action="/login" method="get">
							<div className="form-group">
								<label htmlFor="loginEmail">Email address</label>
								<input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" value={this.state.loginEmail} onChange={this.updateField} required></input>
							</div>
							<div className="form-group">
								<label htmlFor="loginPassword">Password</label>
								<input type="password" className="form-control" id="loginPassword" value={this.state.loginPassword} onChange={this.updateField} required/>
							</div>

							<button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
						</form>
					</div>
					
					<div className="col-md-4">
						<div className= "logo">
							<img src={logo} alt="logo"/>
						</div>
					</div>

					<div className="col-md-4">
						<p style={styles.infoText}>Register</p>
						<form action="/register" method="post">
							<div className="form-group">
								<label htmlFor="registerName">Name</label>
								<input type="text" className="form-control" id="registerName" aria-describedby="emailHelp" value={this.state.registerName} onChange={this.updateField} required/>
							</div>
							<div className="form-group">
								<label htmlFor="registerEmail">Email address</label>
								<input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" value={this.state.registerEmail} onChange={this.updateField} required/>
							</div>
							<div className="form-group">
								<label htmlFor="registerPassword">Password</label>
								<input type="password" className="form-control" id="registerPassword" value={this.state.registerPassword} onChange={this.updateField} required/>
							</div>
							<div className="form-group">
								<label htmlFor="registerAge">Age</label>
								<input type="number" className="form-control" id="registerAge" value={this.state.registerAge} onChange={this.updateField} required/>
							</div>

							<button type="submit" className="btn btn-primary" onClick={this.register}>Register</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;