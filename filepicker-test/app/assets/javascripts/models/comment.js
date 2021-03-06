FilepickerTest.Models.Comment = Backbone.Model.extend({
	
	initialize: function(opts){
		this.post = opts.post;
	},
	
	child_comments: function(){
		if(!this._child_comments) {
      this._child_comments = new FilepickerTest.Collections.Comments([], {
        parent_comment: this
      });
    }

    return this._child_comments;
	},
	
	parse: function(resp) {
		if (resp.child_comments) {
			this.child_comments().set(resp.child_comments, {parse: true});
			delete resp.child_comments;
		} 
			
		return resp;
	}
	
});