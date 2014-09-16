exports.setup = function(){
	var real_value = Math.floor(Math.random()*2+1);
	console.log("real_value: " + real_value);
	res.send(real_value);
};

exports.index = function(req, res){
  res.render('index', {title:'AJAX Testing'});
};

exports.test = function(req, res){
  var val = parseInt(req.query.num);
	
  if (val == req.real_value) {
  	new_value = "Right!";
  } else {
  	new_value = "Wrong. Guess again."
  }
	
	var data = {
		answer: new_value,
		real_val: req.real_value
	};
	
  res.send("hello");
};
