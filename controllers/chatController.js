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
	}
}