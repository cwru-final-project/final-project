const express = require('express');
const chatModel = require('../models/chatModel.js');
const usersModel = require('../models/users-model.js');

module.exports = 
{
	postMessage: function(req, res)
	{
		chatModel.postMessage(req.body.table, req.body.userid, req.body.message, function(result)
		{
			res.end();
		});
	},

	postRoll: function(req, res)
	{
		usersModel.findOneUser("id", req.body.userid, function(result)
		{
			console.log(result);
			var message = result[0].name + " has rolled " + req.body.number + " " + req.body.sides + "-sided " +
			                ((req.body.number === 1) ? "die" : "dice") + " and got ";
			for(var i = 0; i < req.body.number; i++)
			{
				message += (Math.floor(Math.random() * req.body.sides) + 1) + " ";
			}
			chatModel.postMessage(req.body.table, 1, message, function(result2)
			{
				res.end();
			});
		});
	},

	findAllMessages: function(req, res)
	{
		chatModel.findAllMessages(req.params.table, function(result)
		{
			res.send(result);
		});
	},

	deleteMessage: function(req, res)
	{
		chatModel.deleteMessage(req.params.table, req.params.value, function(result)
		{
			res.send(result);
		});
	},

	deleteTable: function(req, res)
	{
		chatModel.deleteTable(req.params.name, function(result)
		{
			res.end()
		})
	}
}