import React, { Component } from 'react';
import API from "../utils/API";

class Pickroom extends Component 
{
	state = 
	{
		name: ""
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
			console.log("room updated")
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
			This.setState({name: result.data[0].name})
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
					</div>
					<div className="col-md-2">
						<button type="button" className="btn btn-primary" onClick={this.updateRoom} name="happy">Happy</button>
					</div>
					<div className="col-md-2">
						<button type="button" className="btn btn-primary" onClick={this.updateRoom} name="sad">Sad</button>
					</div>
					<div className="col-md-4">
					</div>
				</div>
			</div>
		)
	}
}

export default Pickroom;