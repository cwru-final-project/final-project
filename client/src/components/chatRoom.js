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
		age: "",
		token: "",
		room: "",
		users:[],
		message:"",
		messages:[]
	}

	componentDidMount = () =>
	{
		const token = sessionStorage.getItem('token');
		this.setState({token: token})

		const data =
		{
			token: token
		}

		const This = this

		API.findOneByToken(data).then(function(result)
		{
			This.setState({id: result.data[0].id})
			This.setState({name: result.data[0].name})
			This.setState({age: result.data[0].age})
			This.setState({token: result.data[0].token})
			This.setState({room: result.data[0].current_room})

			API.findAllByRoom(result.data[0].current_room).then(function(result)
			{
				This.setState({users:result.data})

				const data = This.state.room+'_chats'

				API.findAllMessages(data).then(function(result)
				{
					This.setState({messages:result.data})
					console.log(This.state)
				})
			})
		})
	}

	updateUsersAndMessages = () =>
	{
		const This = this

		API.findAllByRoom(this.state.room).then(function(result)
		{
			This.setState({users:result.data})

			const data = This.state.room+'_chats'

			API.findAllMessages(data).then(function(result)
			{
				This.setState({messages:result.data})
				console.log(This.state)
			})
		})
	}

	updateField = event =>
	{
		this.setState({message: event.target.value})
	}

	sendMessage = event =>
	{
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
		API.postMessage(data).then(function(result)
		{
			This.updateUsersAndMessages()
			This.setState({message:""})
		})
	}

	render()
	{
		return (

			<div className="container">
				<div className="row text-center">
					<div className="col-md-12">
						<h2>{this.state.room.charAt(0).toUpperCase()+this.state.room.slice(1)} Room</h2>
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
							<div className="card-body text-left" style={styles.chatbox}>
								{this.state.messages.map((message, i) => <Message key={i} name={message.name} message={message.message}/>)}
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