const express = require('express');
const chatModel = require('../models/chatModel.js');
const usersModel = require('../models/users-model.js');

module.exports = 
{
	postMessage: function(req, res)
	{
		chatModel.postMessage(req.body.table, req.body.userid, req.body.message, function(result)
		{
			res.end()
		})
	},

	postRoll: function(req, res)
	{
		const r = Math.floor(Math.random()*6)+1;
		const message = req.body.userid+" has rolled a "+r;
		usersModel.findOneUser("id", req.body.userid, function(result)
		{
			console.log(result)
			const message = result[0].name+" has rolled a "+r;
			chatModel.postMessage(req.body.table, 1, message, function(result2)
			{
				res.end()
			})
		})
	},

	findAllMessages: function(req, res)
	{
		chatModel.findAllMessages(req.params.table, function(result)
		{
			res.send(result)
		})
	},

	deleteMessage: function(req, res)
	{
		console.log("Trying to delete!")
		chatModel.deleteMessage(req.params.table, req.params.value, function(result)
		{
			res.send(result)
		})
	}
}