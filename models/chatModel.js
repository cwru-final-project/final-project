const orm = require("../config/orm.js");

const chat =
{
	postMessage: function(table, userid, message, cb)
	{
		orm.postMessage(table, userid, message, function(result)
		{
			cb(result)
		})
	}
}

module.exports = chat;