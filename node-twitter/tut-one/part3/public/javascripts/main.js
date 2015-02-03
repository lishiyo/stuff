$(function() {
  $("#submit").on("click",function() {
    event.preventDefault();
		
    var requestData = {num: $("#input").val()};
		console.log("requestData: " + requestData.num);
		
		//ajax call to routes.test, passing in requestData as req and getting back 'new_value'
    $.get( '/test', requestData, function(data) {
			console.log("real val: " + data.real_val);
      $('#results').html(data.answer);
    });
  });
});
