FilepickerTest.Collections.Posts = Backbone.Collection.extend({
	url: "/posts",
	modal: FilepickerTest.Models.Post,
	initialize: function(models, opts){
		this.blog = opts.blog;
	}
})