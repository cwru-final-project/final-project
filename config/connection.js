const mysql = require("mysql");
/*const connection = mysql.createConnection(
{
	host: "o3iyl77734b9n3tg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "gkkcbxxo8vtnc3aa",
	password: "l90lxmxztqrkq9z1",
	database: "mezd16yn9j6zlxe3"
});
*/

const connection = mysql.createConnection(
{
	host: "localhost",
	port: 3306,

	user: 'root',
	password: 'Kent2012',
	database: "moodrooms"
});


connection.connect(function(err)
{
	if(err){throw err}
})

module.exports = connection;