import React, { Component } from 'react';
import API from "../utils/API";
import User from "./User"
import Message from "./Message"

const styles =
{
	chatbox:
	{
		"height":"400px",
		"overflow":"scroll"
	},
}

class Chatroom extends Component 
{

	componentDidMount = () =>
	{
		console.log("HJI!!!!!!!!!!!!")
	}

	componentWillUnmount = () =>
	{
		console.log("FUCK!")
	}

	render()
	{
		return (

			<div className="container">
				<a href="https://www.google.com"><button>Click Me!</button></a>
			</div>
		)
	}
}

export default Chatroom;