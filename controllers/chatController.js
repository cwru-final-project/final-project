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
		console.log("CAN YOU SEE ME!?")
		chatModel.findAllMessages(req.params.table, function(result)
		{
			res.send(result)
		})
	}
}