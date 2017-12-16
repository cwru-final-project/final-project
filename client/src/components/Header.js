import React, { Component } from 'react';
import logo from '../images/logo.png';

const styles =
{
	image:
	{
		"width":"100%"
	},

	headerText:
	{
		"color":"black",
		"fontSize":"50px"
	},

	infoText:
	{
		"color":"black",
		"fontSize":"30px"
	}
}

class Header extends Component 
{
	home = event =>
	{
		window.location="/"
	}
	render()
	{
		return (

			<div className="container">
				<div className="row">
					<div className="col-md-2">
						<img src={logo} style={styles.image} alt="logo" onClick={this.home}/>
					</div>
					<div className="col-md-10">
						<p style={styles.headerText}>Mood Rooms</p>
						<p style={styles.infoText}>Here is the description of Mood Rooms</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Header;