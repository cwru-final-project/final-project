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
		"color":"purple",
		"fontSize":"50px"
	},

	infoText:
	{
		"color":"purple",
		"fontSize":"30px"
	}
}

class Header extends Component 
{
	render()
	{
		return (

			<div className="container">
				<div className="row">
					<div className="col-md-2">
						<img src={logo} style={styles.image} alt="logo"/>
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