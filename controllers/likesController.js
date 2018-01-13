const express = require('express');
const likesModel = require('../models/likesModel.js');

module.exports = 
{
	updateLikesLookUp: function(req, res)
	{
		likesModel.updateLikesLookUp(req.body.likerid, req.body.likeyid, function(result)
		{
			res.end()
		})
	},

	getLikeIds: function(req, res)
	{
		likesModel.getLikeIds(req.params.id, function(result)
		{
			res.send(result)
		})
	}
}