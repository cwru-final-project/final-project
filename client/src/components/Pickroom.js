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
			API.findwaiters({id: This.state.id, intent: "speaking"}).then(function(result2)
			{
				console.log(result2)
				window.location = "/chatroom"
			})		
		})
	}

	speak = event =>
	{
		console.log("ready to speak")
		const This = this

		API.updateField({whereField: "id", whereValue: this.state.id, setField: "speaking", setValue: 1}).then(function(result)
		{
			API.findwaiters({id: This.state.id, intent: "listening"}).then(function(result2)
			{
				console.log(result2)
				window.location = "/chatroom"
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

			API.updateField({whereField: "id", whereValue: This.state.id, setField: "listening", setValue: 0}).then(function(result)
			{
				API.updateField({whereField: "id", whereValue: This.state.id, setField: "speaking", setValue: 0}).then(function(result2)
				{
					API.updateField({whereField: "id", whereValue: This.state.id, setField: "waiting", setValue: 0}).then(function(result2)
					{

					})
				})		
			})
		})
	}

	render()
	{
		return (
			
			<div className="container-fluid">
			<div className="pickroom">
				<div className="row text-center">
					<br></br>
					<br></br>
					<br></br>
				</div>
				
				<div className="row text-center">
					<div className="col-md-1">
					</div>
					<div className="col-md-3">
					</div>
					<div className="happy-img col-md-3">
					</div>
					<div className="white-space col-md-3 ">
						<p id="button-desc">Please click on the button below to enter the happy room. This is an open forum to share and listen to good news and accomplishments with like-minded chatter.</p>
						<button type="button" className=" happy btn btn-primary" onClick={this.updateRoom} name="happy">HAPPY</button>
					</div>
					<div className="col-md-2">
					</div>
				</div>

				<div className="row text-center">
					<div className="col-md-1">
					</div>
					<div className="col-md-3">
						<h2>Welcome {this.state.name}</h2>
						<p id="small-text">How are you feeling?</p>
					</div>
					<div className="white-space col-md-3">
						<p id="button-desc">Please click on the button below to enter the sad room. This is an open forum to seek and give guidance for chatters who are struggling.</p>
						<button type="button" className="sad btn btn-primary" onClick={this.updateRoom} name="sad">SAD</button>
					</div>
					<div className="sad-img col-md-3">
					</div>
					<div className="col-md-2">
					</div>
				</div>

				<div className="row text-center">
					<div className="col-md-1">
					</div>
					<div className="col-md-3">
					</div>
					<div className="private-img col-md-3">
					</div>
					<div className="white-space col-md-3">
						<p id="button-desc">Please click on the coresponding button below to be either a speaker or listener in this one on one chatroom.</p>
						<button type="button" className="listen btn btn-primary" onClick={this.listen}>LISTEN</button>
						<span>or</span>
						<button type="button" className="speak btn btn-primary" onClick={this.speak}>SPEAK</button>
					</div>
					<div className="col-md-2">
					</div>
				</div>
			</div>
			</div>
		)
	}
}

export default Pickroom;