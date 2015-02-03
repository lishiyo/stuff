window.FilepickerTest = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
	Modals: {},
	
  initialize: function() {
		
		// backbone modal
		$('.open-post-modal').on('click', function(){
			var blog_id = $(this).data("id");
			var modalView = new FilepickerTest.Modals.PostModal({
				name: 'tab2',
				blog_id: blog_id
			});
			$('.post-modal').html(modalView.render().el);

		});
		
		new FilepickerTest.Routers.PostsRouter();
		Backbone.history.start();
		
	},
	
	setPostModal: function(){
		
		$("body").on("click", ".js-modal-open-1", function(event){
			event.preventDefault();

			var post = new FilepickerTest.Models.Post();
			var blog_id = $(event.currentTarget).data("id");
			console.log(blog_id);
			var newPostT1 = new FilepickerTest.Views.NewPostT1({
				model: post,
				blog_id: blog_id
			});

			$('.modal-container').html(newPostT1.render().$el);
		});

		$("body").on("click", ".js-modal-open-2", function(event){
			event.preventDefault();

			// render new Post view
			var post = new FilepickerTest.Models.Post();
			var blog_id = $(event.currentTarget).data("id");
			console.log(blog_id);
			var newPostT2 = new FilepickerTest.Views.NewPostT2({
				model: post,
				blog_id: blog_id
			});

			$('.modal-container').html(newPostT2.render().$el);
		});

		$("body").on("click", ".js-modal-close", function(event){
			event.preventDefault();
			$(".modal").removeClass("is-open");
		});

	}

}

$(document).ready(function() {
	
	filepicker.setKey("AFmd243qR4C3FGkOJfBTnz");

  FilepickerTest.initialize();
	FilepickerTest.setPostModal();
});
