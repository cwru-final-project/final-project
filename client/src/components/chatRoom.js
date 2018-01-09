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
	state = 
	{
		id:0,
		name: "",
		email: "",
		age: "",
		token: "",
		room: "",
		users:[],
		message:"",
		messages:[],
		oldUsers: 0
	}

	componentWillMount = () =>
	{
		let allGood = false;
		const token = sessionStorage.getItem('token');
		this.setState({token: token})

		const data =
		{
			token: token
		}

		const This = this

		API.findOneByToken(data).then(function(result)
		{

			if (result.data.constructor === String)
			{
				alert("Please log back in")
				window.location = "/"
			}

			else if (result.data[0].current_room === "")
			{
				window.location = "/pickroom"
			}

			else
			{
				allGood = true;
				This.setState({
					id: result.data[0].id, 
					name: result.data[0].name, 
					email: result.data[0].email, 
					age: result.data[0].age, 
					token: result.data[0].token, 
					room: result.data[0].current_room})
			

				API.findAllByRoom(result.data[0].current_room).then(function(result)
				{
					if (allGood)
					{
						This.setState({users:result.data})

						const data = This.state.room+'_chats'

						API.findAllMessages(data).then(function(result)
						{
							This.setState({messages:result.data})
							setInterval(function()
							{
								This.updateUsersAndMessages()
							}, 1000)

							window.onbeforeunload = function(e)
							{
								const xhttp = new XMLHttpRequest();

								const data = 
								{
									token: This.state.token,
									room: ""
								}

								xhttp.open("POST", "/updateroom", false);
								xhttp.setRequestHeader("Content-type", "application/json");
								xhttp.send(JSON.stringify(data));
							}				

							//This.tokenCheck()
						})
					}
				})
			}
		})
	}

	leaving = () =>
	{
		const data = 
		{
			token: this.state.token,
			room: ""
		}

		API.updateRoom(data).then(function(result)
		{
			window.location="/"
		})
	}

	componentDidUpdate = () =>
	{
		if (this.state.room !== "happy" && this.state.room !== "sad" && this.state.oldUsers === 2 && this.state.users.length === 1)
		{
			console.log("Your partner left")
			window.location = "/pickroom"
		}
	}

	tokenCheck = () =>
	{
		const This = this
		setInterval(function()
		{
			console.log((Date.now()-This.state.token.slice(10))/1000)
			if ((Date.now()-This.state.token.slice(10))/1000 > 60)
			{
				sessionStorage.removeItem("token")
				This.leaving()
			}

		}, 1000)
	}

	updateUsersAndMessages = () =>
	{
		const This = this
		This.setState({oldUsers:this.state.users.length})

		API.findAllByRoom(this.state.room).then(function(result)
		{
			This.setState({users:result.data})

			const data = This.state.room+'_chats'

			API.findAllMessages(data).then(function(result)
			{
				for (let i=0; i<result.data.length; i++)
				{
					result.data[i].time = Math.abs((Date.now()/(60*1000).toFixed(0) - parseInt((new Date(result.data[i].time).getTime() / (60*1000)).toFixed(0))).toFixed(0))
				}

				This.setState({messages:result.data})
			})
		})
	}

	updateField = event =>
	{
		this.setState({message: event.target.value})
	}

	sendMessage = event =>
	{
		console.log(this.state)
		const table = this.state.room+'_chats'
		const userid = this.state.id
		const message = this.state.message

		const data = 
		{
			table: table,
			userid: userid,
			message: message
		}

		const This = this

		if (data.message === "/roll")
		{
			API.postRoll(data).then(function(result)
			{
				API.updateToken({email:This.state.email}).then(function(result)
				{
					This.updateUsersAndMessages()
					This.setState({message:"", token:result.data.token})
					sessionStorage.setItem('token', result.data.token);
					const chat = document.getElementById("messages");
					chat.scrollTop = chat.scrollHeight;
				})
			})	
		}

		else
		{
			API.postMessage(data).then(function(result)
			{
				API.updateToken({email:This.state.email}).then(function(result)
				{
					This.updateUsersAndMessages()
					This.setState({message:"", token:result.data.token})
					sessionStorage.setItem('token', result.data.token);
					const chat = document.getElementById("messages");
					chat.scrollTop = chat.scrollHeight;
				})
			})
		}
	}

	render()
	{
		return (

			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						{this.state.room === "happy" ? <h2>{this.state.room.charAt(0).toUpperCase()+this.state.room.slice(1)} Room</h2>
						: this.state.room === "sad" ? <h2>{this.state.room.charAt(0).toUpperCase()+this.state.room.slice(1)} Room</h2>
						: this.state.users.length === 1 ? <h2>Waiting for partner...</h2>
						: <h2>One on One</h2>}
					</div>
				</div>

				<div className="row text-center">
					<div className="col-md-3">

						<div className="card">
							<div className="card-header">
								Who's here?
							</div>
							<ul className="list-group list-group-flush">
								{this.state.users.map((user, i) => <User key={i} name={user.name} />)}	
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						<div className="card">
							<div className="card-header">
								Chat
							</div>
							<div className="card-body text-left" style={styles.chatbox} id="messages">
								{this.state.messages.map((message, i) => <Message key={i} name={message.name} message={message.message} time={message.time}/>)}
							</div>
							<div className="card-footer text-muted">
								<div className="input-group">
									<input type="text" className="form-control" placeholder="Chat away!" value={this.state.message} onChange={this.updateField} />
									<span className="input-group-btn">
										<button className="btn btn-success" type="button" onClick={this.sendMessage}>Send!</button>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Chatroom;