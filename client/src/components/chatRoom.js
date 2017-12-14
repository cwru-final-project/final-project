import React, { Component } from 'react';
import API from "../utils/API";
import User from "./User"

const styles =
{
	chatbox:
	{
		"border":"2px solid black"
	},
}

class Chatroom extends Component 
{
	state = 
	{
		name: "",
		age: "",
		token: "",
		room: ""
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
			This.setState({name: result.data[0].name})
			This.setState({age: result.data[0].age})
			This.setState({token: result.data[0].token})
			This.setState({room: result.data[0].current_room})

			API.findAllByRoom(This.state.room).then(function(result)
			{
				console.log(result)
			})
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
					<div className="col-md-3" style={styles.chatbox}>
					</div>
					<div className="col-md-9" style={styles.chatbox}>
					</div>
				</div>


				<div className="row text-center">
					<div className="col-md-3">
						
					</div>
					<div className="col-md-9">
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..."/>
							<span className="input-group-btn">
								<button className="btn btn-success" type="button">Send!</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Chatroom;