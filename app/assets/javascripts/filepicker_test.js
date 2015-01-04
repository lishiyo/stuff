window.FilepickerTest = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
	Modals: {},
	
  initialize: function() {
    
		$('.open-post-modal').on('click', function(){
			var blog_id = $(this).data("id");
			
			var modalView = new FilepickerTest.Modals.PostModal({
				name: 'tab2',
				blog_id: blog_id
			});
			
			$('.post-modal').html(modalView.render().el);

		});
	}

}

$(document).ready(function() {
	
  FilepickerTest.initialize();
});
