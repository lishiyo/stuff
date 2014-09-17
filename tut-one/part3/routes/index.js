var nomo = require('node-monkey').start({
	port: 4000
});

var real_value = Math.floor(Math.random()*20+1);
console.log("real_value initiated in routes: " + real_value);

exports.index = function(req, res){
  res.render('index', { 
		title: 'AJAX Testing' 
	});
};

exports.test = function(req, res){
  var val = parseInt(req.query.num);
	
  if (val == real_value) {
  	new_value = "yes!";
  } else {
  	new_value = "Wrong. Guess again."
  }
	
	var data = {
		answer: new_value,
		real_val: real_value
	};
	
  res.send(data);
};

exports.userlist = function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');

	
  collection.find({},{},function(e,docs){
		console.log("docs: " + JSON.stringify(docs));
        res.render('userlist', {
            userlist: docs
        });
   });
};

exports.newuser = function(req, res) {
	res.render('newuser', { 
		title: 'Add New User' 
	});
};

exports.adduser = function(req, res) {
	// Set our internal DB variable (0.0.0.0/testdb)
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
};