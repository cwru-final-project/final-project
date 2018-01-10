import React, { Component } from 'react';
/*import { Link } from "react-router-dom";*/
import API from "../utils/API";
import logo from '../images/logo1.png';
import styles from '../css/style.css';
import Header from './Header'


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
		"loginError": "",
		"registerError": ""
	}

	updateField = event =>
	{
		this.setState({[event.target.id]:event.target.value})
	}

	login = event =>
	{
		const This = this;
		event.preventDefault()
		console.log(this.state.loginEmail)
		console.log(this.state.loginPassword)

		const data = 
		{
			"email":this.state.loginEmail,
			"password":this.state.loginPassword
		}

		API.login(data).then(function(result)
		{
			console.log("Done with login!")

			if(result.data.token)
			{
				sessionStorage.setItem('token', result.data.token);
				window.location='/pickroom'
			}

			else if (result.data === "No email")
			{
				This.setState({loginError: "We don't have this email in our system"})
				console.log(result.data)
			}

			else if (result.data === "Wrong password!")
			{
				This.setState({loginError: "Wrong password"})
				console.log(result.data)
			}

			else
			{
				This.setState({loginError: "There was an error, please try again"})
				console.log(result.data)
			}
		})
	}

	register = event =>
	{
		event.preventDefault()
		const This = this;
		if (this.state.registerName !== "Mind Over Mood")
		{
			const data = 
			{
				"name": this.state.registerName,
				"email": this.state.registerEmail,
				"password": this.state.registerPassword,
				"age": this.state.registerAge
			}

			API.register(data).then(function(result)
			{
				if (result.data === "Not new")
				{
					This.setState({registerError: "We already have this email in our system"})
					console.log("User already exists")
				}

				else
				{
					sessionStorage.setItem('token', result.data.token);
					window.location='/pickroom'
				}
			})
		}
	}

	render()
	{
		return (

			<div className="container">
				<Header />
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

						{this.state.loginError !== "" ? 
						<div className="alert alert-danger" role="alert" id="hit" style={styles.hit}>
					  		{this.state.loginError}
						</div> 
						: <div></div>}
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

						{this.state.registerError !== "" ? 
						<div className="alert alert-danger" role="alert" id="hit" style={styles.hit}>
					  		{this.state.registerError}
						</div> 
						: <div></div>}
					</div>
				</div>
			</div>
		)
	}
}

export default Login;