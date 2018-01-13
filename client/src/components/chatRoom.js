import React, { Component } from 'react';
import API from "../utils/API";
//import User from "./User";
import Message from "./Message";

const styles =
{
	chatbox:
	{
		"height":"600px",
		"overflow":"scroll"
	},

	heart:
	{
		"color": "red"
	},

	me:
	{
		"backgroundColor": "#b4e3ff"
	}

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
		oldUsers: 0,
		number: 2,
		sides: 6,
		intent: "",
		freeze: false
	}

	componentWillMount = () =>
	{
		const This = this;
		const token = sessionStorage.getItem('token');
		const intent = sessionStorage.getItem("intent")
		this.setState({token: token, intent: intent});

		const data =
		{
			token: token
		}

		API.findOneByToken(data).then(function(result)
		{

			if (result.data.constructor === String)
			{
				alert("Please log back in");
				window.location = "/";
			}

			else if (result.data[0] === undefined)
			{
				window.location ="/"
			}

			else if (result.data[0].current_room === "")
			{
				window.location = "/pickroom";
			}

			else
			{
				This.setState(
				{
					id: result.data[0].id, 
					name: result.data[0].name, 
					email: result.data[0].email, 
					age: result.data[0].age, 
					token: result.data[0].token, 
					room: result.data[0].current_room,
					token: token
				})

				API.findAllByRoom(result.data[0].current_room).then(function(result2)
				{
					const data = This.state.room+'_chats';
					const amountOfUsers = This.state.users.length
					API.getLikeIds(This.state.id).then(function(result3)
					{
						for (let i=0; i<result3.data.length; i++)
						{
							if (This.state.id === result3.data[i].likerid)
							{
								for (let j=0; j<result.data.length; j++)
								{
									if (result3.data[i].likeyid === result.data[j].id)
									{
										//console.log(This.state.id+" has already liked "+result.data[j].id)
										result.data[j].liked = true;
									}
								}
							}
						}

						This.setState({messages:result2.data, users:result.data, oldUsers:amountOfUsers});

						API.findAllMessages(data).then(function(result3)
						{
							This.setState({messages:result3.data});

							setInterval(function()
							{
								This.updateUsersAndMessages();
							}, 1000);

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
					});
				});
			}
		});
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
			window.location="/";
		});
	}

	componentDidUpdate = () =>
	{
		if (this.state.room !== "happy" && this.state.room !== "sad" && this.state.oldUsers === 2 && this.state.users.length === 1)
		{
			const table = this.state.room+"_chats"
			alert("Your parter has left the room, try again!")
			window.location = "/pickroom";
/*			API.deleteTable(table).then(function(result)
			{
				window.location = "/pickroom";
			})*/
		}
	}

	tokenCheck = () =>
	{
		const This = this
		setInterval(function()
		{
			console.log((Date.now()-This.state.token.slice(10))/1000)
			if ((Date.now()-This.state.token.slice(10))/1000 > 60*10)
			{
				sessionStorage.removeItem("token");
				This.leaving();
			}

		}, 1000);
	}

	updateUsersAndMessages = () =>
	{
		const This = this

		const amountOfUsers = this.state.users.length

		API.findAllByRoom(this.state.room).then(function(result)
		{
			const data = This.state.room + '_chats';

			API.findAllMessages(data).then(function(result2)
			{
				for (let i=0; i<result2.data.length; i++)
				{
					const time = Math.abs((Date.now()/(60*1000).toFixed(0) - parseInt((new Date(result2.data[i].time).getTime() / (60*1000)).toFixed(0))).toFixed(0))
					if (time === 0 || time === 1)
					{
						result2.data[i].time = "just now";
					}

					else
					{
						result2.data[i].time = time + " minutes ago";
					}
				}

				API.getLikeIds(This.state.id).then(function(result3)
				{
					for (let i=0; i<result3.data.length; i++)
					{
						if (This.state.id === result3.data[i].likerid)
						{
							for (let j=0; j<result.data.length; j++)
							{
								if (result3.data[i].likeyid === result.data[j].id)
								{
									//console.log(This.state.id+" has already liked "+result.data[j].id)
									result.data[j].liked = true;
								}
							}
						}
					}

					console.log(result.data)

					This.setState({users: []})
					This.setState({messages:result2.data, users:result.data, oldUsers:amountOfUsers});
				});
			});
		});
	}

	updateField = event =>
	{
		this.setState({message: event.target.value});
	}

	pressEnter = event =>
	{
		if (event.key === "Enter")
		{
			this.sendMessage()
		}
	}

	back = () =>
	{
		window.location = "/pickroom"
	}

	loggout = () =>
	{
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('intent');
		window.location = "/"
	}

	sendMessage = event =>
	{
	    var number = this.state.number;
        var sides = this.state.sides;

		const table = this.state.room + '_chats';
		const userid = this.state.id;
		const message = this.state.message;

        let data = 
		{
			table: table,
			userid: userid,
			message: message,
			number: number,
			sides: sides
		}

		const This = this;

		if (data.message.length > 5 && data.message.substring(0, 6) === "//roll")
		{
            if(data.message.length > 8)
            {
            	var numberindex = 0;
        		var numberstring = "";
                var sidesindex = 0;
                var sidesstring = "";
                
                var args = message.substring(7, (message.length)).toLowerCase();

				numberindex = args.indexOf("d");
				sidesindex = args.indexOf("s");

				if(numberindex > 0 && sidesindex === 0)
				{
					numberstring = args.substring(numberindex, args.length);
					args = args.substring(0, (numberindex));
					number = parseInt(numberstring.substring(1, (numberstring.length)));
				}
			    else if(numberindex === 0 && sidesindex > 0)
			    {
					sidesstring   = args.substring(sidesindex,  args.length);
					args = args.substring(0, (sidesindex));
					sides = parseInt(sidesstring.substring(1, (sidesstring.length)));
				}
				
				if(numberindex === 0){number = parseInt(args.substring(1, (args.length)));}
				
				if(sidesindex === 0){sides = parseInt(args.substring(1, (args.length)));}

				if(sides < 2){sides = 2;}
				if(sides > 1000){sides = 1000;}
				if(number < 1){number = 1;}
				if(number > 50){number = 50;}
            }

            data.number = number;
            data.sides = sides;

			API.postRoll(data).then(function(result)
			{
				API.updateToken({email:This.state.email}).then(function(result)
				{
						//This.updateUsersAndMessages();
						This.setState({message:""});
						const chat = document.getElementById("messages");
						chat.scrollTop = chat.scrollHeight;
				});
			});	
		}

		else
		{
			if (this.state.message !== "")
			{
				API.postMessage(data).then(function(result)
				{
						//This.updateUsersAndMessages();
						This.setState({message:""});
						const chat = document.getElementById("messages");
						chat.scrollTop = chat.scrollHeight;
				});
			}
		}
	}

	likeUser = event =>
	{
		if (!this.state.freeze)
		{
			this.setState({freeze: true})
			console.log("FREEZE!")
			const This = this;
			const id = event.target.parentElement.id
			API.updateLikes(id).then(function(result)
			{
				const data = 
				{
					likerid: This.state.id,
					likeyid: id
				}

				API.updateLikesLookUp(data).then(function(result)
				{
					This.updateUsersAndMessages()
					This.setState({freeze:false})
				})
			})
		}
	}

	render()
	{
		return (

			<div className="chatroom">
				<div className="container">
					<div className="row text-center">
						<div className="col-md-12">
							<br></br>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-md-1">
						</div>
						<div className="col-md-2">




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





							<button className="send btn btn-success" type="button" onClick={this.back}>BACK</button>
							<br></br>
							<br></br>
							<button className="send btn btn-success" type="button" onClick={this.loggout}>LOGOUT</button>
						</div>
						<div className="col-md-8">
							<div className="card">
								<div className="title card-header">
									{this.state.room === "happy" ? <h4>What are you {this.state.room.charAt(0).toUpperCase()+this.state.room.slice(1)} about, {this.state.name}?</h4>
									: this.state.room === "sad" ? <h4>What are you {this.state.room.charAt(0).toUpperCase()+this.state.room.slice(1)} about, {this.state.name}?</h4>
									: this.state.users.length === 1 ? <h4>Waiting for partner...</h4>
									: <h4>One on One - You are the {this.state.intent}</h4>}
								</div>
								<div className="card-body text-left" style={styles.chatbox} id="messages">
									{this.state.messages.map((message, i) => <Message key={i} name={message.name} message={message.message} time={message.time}/>)}
								</div>
								<div className="card-footer text-muted">
									<div className="input-group">
										<input type="text" className="form-control" placeholder="Chat away!" value={this.state.message} onChange={this.updateField} onKeyPress={this.pressEnter}/>
										<span className="input-group-btn">
											<button className="send btn btn-success" type="button" onClick={this.sendMessage}>SEND</button>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-1">
						</div>
					</div>
				</div>
				<br></br>
				<br></br>
			</div>
		)
	}
}

export default Chatroom;