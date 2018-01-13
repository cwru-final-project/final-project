const orm = require("../config/orm.js");

const likes =
{
	updateLikesLookUp: function(likerid, likeyid, cb)
	{
		orm.updateLikesLookUp(likerid, likeyid, function(result)
		{
			cb(result)
		})
	},

	getLikeIds: function(id, cb)
	{
		orm.getLikeIds(id, function(result)
		{
			cb(result)
		})
	}
}

module.exports = likes;