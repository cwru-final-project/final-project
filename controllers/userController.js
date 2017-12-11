const express = require('express');
const usersModel = require('../models/users-model.js');

module.exports = 
{
	findAll: function(req, res)
	{
		usersModel.findAll(function(result)
		{
			console.log(result)
		})
	},

	login: function(req, res)
	{
		usersModel.login(req.params.email, function(result)
		{
			console.log(result)
		})
	},

	newUser: function(req, res)
	{
		console.log(req.body)
		usersModel.newUser(req.body.name, req.body.email, req.body.password, req.body.age, function(result)
		{
			console.log(result)
		})
	}
}

/*


usersModel.findAll(function(result)
{
	console.log(result)
})

usersModel.login(value, function(result)
{
	console.log(result)
})

module.exports = usersModel*/