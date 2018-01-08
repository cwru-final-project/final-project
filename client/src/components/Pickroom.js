import React, { Component } from 'react';
import API from "../utils/API";

class Pickroom extends Component 
{
	state = 
	{
		id:0,
		name: "",
		email: "",
		age: "",
		token: "",
		room: "",
	}

	updateRoom = event =>
	{
		const token = sessionStorage.getItem('token');

		const data = 
		{
			room: event.target.name,
			token: token
		}

		API.updateRoom(data).then(function(result)
		{
			window.location = "/chatroom"
		})
	}

	listen = event =>
	{
		console.log("ready to listen")
		console.log(this.state)
		const This = this

		API.updateField({whereField: "id", whereValue: this.state.id, setField: "listening", setValue: 1}).then(function(result)
		{
			API.findwaiters(This.state.id).then(function(result2)
			{
				console.log(result2)
			})		
		})
	}

	speak = event =>
	{
		console.log("ready to speak")
		const This = this
		
		API.updateField({whereField: "id", whereValue: this.state.id, setField: "speaking", setValue: 1}).then(function(result)
		{
			API.findwaiters(This.state.id).then(function(result2)
			{
				console.log(result2)
			})		
		})
	}

	componentDidMount = () =>
	{
		const token = sessionStorage.getItem('token');

		const data =
		{
			token: token
		}

		const This = this

		API.findOneByToken(data).then(function(result)
		{
			This.setState(
			{
				id: result.data[0].id, 
				name: result.data[0].name, 
				email: result.data[0].email, 
				age: result.data[0].age, 
				token: result.data[0].token, 
				room: result.data[0].current_room
			})
		})
	}

	render()
	{
		return (

			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						<h2>Welcome {this.state.name}, how are you feeling?</h2>
					</div>
				</div>
				<div className="row text-center">
					<div className="col-md-4">
						<button type="button" className="btn btn-primary" onClick={this.updateRoom} name="happy">Happy</button>
					</div>
					<div className="col-md-4">
						<button type="button" className="btn btn-primary" onClick={this.updateRoom} name="sad">Sad</button>
					</div>
					<div className="col-md-4">
						<p>1 on 1</p>
						<button type="button" className="btn btn-primary" onClick={this.listen}>Listen</button>
						<button type="button" className="btn btn-primary" onClick={this.speak}>Speak</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Pickroom;