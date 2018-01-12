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
					for (let i=0; i<result3.data.length; i++)
					{
						if (This.state.id === result3.data[i].likerid)
						{
							for (let j=0; j<result2.data.length; j++)
							{
								if (result3.data[i].likeyid === result2.data[j].id)
								{
									//console.log(This.state.id+" has already liked "+result2.data[j].id)
									result2.data[j].liked = true;
								}
							}
						}
					}

					console.log(result2.data)

					if (result.data[0].current_room === "happy" || result.data[0].current_room === "sad")
					{
						This.setState({users:[]})
						This.setState({users:result2.data, id: result.data[0].id});						
					}

					else if (result2.data.length > 1)
					{
						console.log("CAN YOU SEEEEEEE ME!?!?!?!")
						This.setState({users:[]})
						This.setState({users:result2.data, id: result.data[0].id});							
					}
				});
			});	
		});
	}

	componentWillMount = () =>
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
						: user.liked ? <li key ={i} className="list-group-item"><i className="fas fa-heart fa-2x float-left" style={styles.heart}></i>{user.name} <span className="float-right">+{user.likes}</span></li>
						: <li key ={i} className="list-group-item"><div id={user.id} onClick={this.likeUser}><i id={user.id} className="far fa-heart fa-2x float-left" style={styles.heart}></i></div>{user.name} <span className="float-right">+{user.likes}</span></li>)}
				</ul>
			</div>
		)
	}
}

export default User;