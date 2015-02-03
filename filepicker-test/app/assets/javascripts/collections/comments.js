FilepickerTest.Collections.Comments = Backbone.Collection.extend({

  url: function(){
		return this.post.url() + "/comments.json"
	},
	
	initialize: function(opts){
		this.post = opts.post;
		this.parent_comment = opts.parent_comment || null;
		
	},

  model: FilepickerTest.Models.Comment
	
})
