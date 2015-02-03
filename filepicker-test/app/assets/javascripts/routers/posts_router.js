FilepickerTest.Routers.PostsRouter = Backbone.Router.extend({
	routes: {
		"posts/:post_id/comments": "showComments"
	},
	
	initialize: function(){
		
	},
	
	showComments: function(post_id){
		
		var commCont = '#post-comments-' + post_id;
		var $commCont = $(commCont);
		var post = new FilepickerTest.Models.Post({id: post_id});
		
		post.fetch({
			success: function(){
				var post_comments = new FilepickerTest.Collections.Comments({ post: post });
				post_comments.fetch();
				
				var commentsIndex = new FilepickerTest.Views.CommentsIndex({ collection: post_comments });
			
				$commCont.html(commentsIndex.render().$el);
			},
			error: function(){
				console.log("something went wrong");
			}
		})
		
		
	}
})