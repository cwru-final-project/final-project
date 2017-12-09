var express = require('express');
var bodyParser = require("body-parser");
var routes = require("./routes");
var port = process.env.PORT || 3001;

var app = express();

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("client/build"));

app.use(routes);

app.listen(port, function()
{
	console.log("Listening on port "+port)
});
