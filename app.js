var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



var connection = mysql.createConnection({
	host    : '127.0.0.1',
	user    : 'root',
	database: 'join_us'
});
 
app.get("/", function(req, res){
	//find count of users in database
	var q = "SELECT COUNT(*) as count FROM users"; // named "as count"
	connection.query(q, function(error,results){
		if (error) throw error;
		var count = results[0].count;// use "count"here as defined in q
        //res.send("We have " + count + " user in our database");
		res.render("home", {count_lable: count});
		
	});
});

app.post("/register", function(req, res){
	var person = {email: req.body.email};
	connection.query('INSERT INTO users SET ?', person, function(err,result) {
		if(err) throw err;
		res.redirect("/");
	});
});

app.get("/joke", function(req, res){
	var joke = "What do you call a dog that does magic tricks";
	res.send(joke)
});
//each app.get generate a route for a webpage
app.get("/random_num", function(req, res){
	var num = Math.floor(Math.random()*10) + 1;
	res.send("Your lucky number is " + num);
});


app.listen(8080, function () {
 console.log('App listening on port 8080!');
});