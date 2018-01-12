import React, { Component } from 'react';
import API from "../utils/API";

const styles =
{
	heart:
	{
		"color": "red"
	},

	me:
	{
		"backgroundColor": "#b4e3ff"
	}
}

class User extends Component
{
	state =
	{
		users: [],
		id: 0
	}

	updateUsers = ()  =>
	{
		const This = this;
		const token = sessionStorage.getItem('token');
		const data =
		{
			token: token
		}

		API.findOneByToken(data).then(function(result)
		{
			API.findAllByRoom(result.data[0].current_room).then(function(result2)
			{
				API.getLikeIds(result.data[0].id).then(function(result3)
				{
					This.setState({users:result2.data, id: result.data[0].id});
				});
			});	
		});
	}

	componentDidMount = () =>
	{
		const This = this;

		this.updateUsers()
		setInterval(function()
		{
			This.updateUsers();
		}, 1000);
	}

	likeUser = event =>
	{
		const This = this;
		const id = event.target.parentElement.id
		API.updateLikes(id).then(function(result)
		{
			const data = 
			{
				likerid: This.state.id,
				likeyid: id
			}

			API.updateLikesLookUp(data).then(function(result2)
			{
				This.updateUsers()
			})
		})
	}

	render()
	{
		return(
			<div className="card whoshere">
				<div className="title card-header">
					Who's here?
				</div>
				<ul className="list-group list-group-flush">
					{this.state.users.map((user, i) => this.state.id === user.id
						? <li key ={i} className="list-group-item" style={styles.me}><span className="float-left">(you)</span>{user.name}  <span className="float-right">+{user.likes}</span></li>
						: <li key ={i} className="list-group-item"><div id={user.id} onClick={this.likeUser}><i id={user.id} className="far fa-heart fa-2x float-left" style={styles.heart} onClick={this.likeUser}></i></div>{user.name}  <span className="float-right">+{user.likes}</span></li>)}
				</ul>
			</div>
		)
	}
}

export default User;