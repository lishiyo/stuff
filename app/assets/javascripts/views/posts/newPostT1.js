FilepickerTest.Views.NewPostT1 = FilepickerTest.PostModal.extend({
	template: JST['posts/newPostT1'],
	
	events: {
		"click .upload-fp": 'upload',
		"submit form": "submitForm"
	},
	
	initialize: function(opts){
		this.blog_id = opts.blog_id;
		$(".modal").removeClass("is-open");
	},
	
	onShow: function(){
		this.$('#post-content').wysihtml5({
			toolbar: {
				"font-styles": true, 
				"emphasis": true, //Italics, bold, etc. Default true
				"lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
				"html": false, //Button which allows you to edit the generated HTML. Default false
				"link": false, 
				"image": false, 
				"color": true, //Button to change color of font  
				"blockquote": true, //Blockquote  
				"fa": true
			}
		});
	},
	
	render: function(){
		var content = this.template({ post: this.model });
		this.$el.html(content);
		
		this.onShow();
		this.setActive({ tabNum: 1 });
		
		return this;
	},
	
// 	setActive: function() {
// 		this.$('.bbm-modal__tab a').removeClass('active');
// 		this.$('#tab1').addClass('active'); 
		
// 		this.$(".modal").addClass("is-open");
// 	},
	
// 	upload: function (event) {
		
// 		var $imagesDiv = this.$('div.image-thumbnails');
// 		var $inputDiv = this.$('#post_filepicker_urls');
// 		var inputDivVal = $inputDiv.val();
		
// 		var xBtn = $('<a href="#"><i class="icon-remove-sign">X</i></a>');
		
// 		// clear out all pics
// 		xBtn.on('click', function(event){
// 			event.preventDefault();
// 			$inputDiv.val("");
// 			$imagesDiv.empty();
			
// 		});
		
// 		filepicker.pickMultiple({
// 			maxFiles: 10,
// 			folders: true,
// 			maxSize: 1024*1024,
// 			container: 'modal'
// 		}, function(blobs) {
			
// 			blobs.forEach(function(blob){
				
// 				inputDivVal = inputDivVal.split(",").concat(blob.url).filter(function(v){ return v!==''}).toString();
				
// 				$inputDiv.val(inputDivVal);
// 				var $image = $('<img>').attr('src', blob.url);
// 				$imagesDiv.append($image);
				
// 			});
			
// 			$imagesDiv.append(xBtn);
// 		}.bind(this));
		
// 	},
	
// 	submitForm: function(event) {
// 		event.preventDefault();
		
// 		var formData = $(event.currentTarget).serializeJSON();
// 		console.log("clicked submit", formData);
// 		var modalView = this;
		
// 		var post = new FilepickerTest.Models.Post();
// 		post.save(formData, {
// 			success: function(model) {
// 				console.log("post saved!", post);
// 				this.submit();
// 			}.bind(this),
// 			error: function() {
// 				console.log("something went wrong")
// 			}
// 		});
		
// 	},
	
// 	submit: function(event) {
// 		console.log("clicked submit");
// 		window.location.replace("/blogs/"+this.blog_id);
// 	}
		
})