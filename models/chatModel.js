const orm = require("../config/orm.js");

const chat =
{
	postMessage: function(table, userid, message, cb)
	{
		orm.postMessage(table, userid, message, function(result)
		{
			cb(result)
		})
	},

	findAllMessages: function(table, cb)
	{
		orm.findAllMessages(table, function(result)
		{
			cb(result)
		})
	},

	deleteMessage: function(table, value, cb)
	{
		orm.deleteOne(table, "id", value, function(result)
		{
			cb(result)
		})
	},

	deleteTable: function(name, cb)
	{
		orm.deleteTable(name, function(result)
		{
			cb(result)
		})
	}
}

module.exports = chat;