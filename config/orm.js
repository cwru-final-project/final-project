const connection = require('../config/connection.js');

const orm = 
{
	findAll: function(table, cb)
	{
		connection.query(`SELECT * FROM ${table}`, function(err, result)
		{
			if(err){throw err;}
			cb(result);
		})
	},

	findOne: function(table, field, value, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE ? = ?`, [field, value], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
}

module.exports = orm;