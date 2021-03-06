FilepickerTest.Views.NewPostT2 = FilepickerTest.PostModal.extend({
	
	template: JST['posts/newPostT2'],
	
	events: {
		"submit form": "submitForm"
	},
	
	initialize: function(){
		console.log("initialized T2");
		$(".modal").removeClass("is-open");
	},
	
	render: function(){
		var content = this.template({ post: this.model });
		this.$el.html(content);
		
		this.setActive({ tabNum: 2 });
		this.makeDropPane();
		
		return this;
	},
	
// 	setActive: function(options) {
// 		this.$('.bbm-modal__tab a').removeClass('active');
// 		this.$('#tab2').addClass('active'); 
		
// 		this.$(".modal").addClass("is-open");
// 	},
	
	makeDropPane: function(){
		
		var targetPane = this.$('#dropPane'),
				view = this;
		
			filepicker.makeDropPane(targetPane[0], {
				multiple: true,
				dragEnter: function() {
					console.log("dragEnter");
					targetPane.html("Drop to upload").toggleClass('drag-enter');
				},
				dragLeave: function() {
					console.log("dragLeave");
					targetPane.html("Drop files here").toggleClass('drag-leave');
				},
				onSuccess: function(blobs) {
					targetPane.text("success!");
// 					$("#localDropResult").text(JSON.stringify(blobs));
					
					view.setImageOpts();
					view.processImages(blobs, view.imageOpts);
				},
				onError: function(type, message) {
					$("#localDropResult").text('('+type+') '+ message).removeClass('hidden');
				},
				onProgress: function(percentage) {
					targetPane.text("Uploading ("+percentage+"%)");
				}
			});

	}
})