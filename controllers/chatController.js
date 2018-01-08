const express = require('express');
const chatModel = require('../models/chatModel.js');

module.exports = 
{
	postMessage: function(req, res)
	{
		chatModel.postMessage(req.body.table, req.body.userid, req.body.message, function(result)
		{
			res.end()
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