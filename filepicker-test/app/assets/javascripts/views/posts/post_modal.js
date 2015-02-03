

FilepickerTest.Modals.PostModal = Backbone.Modal.extend({
	
// 	template: _.template($('#modal-template').html()),
	template: JST['posts/new_container'],
	viewContainer: '.my-container',
	cancelEl: '.bbm-button',
	
	events: {
		"click .upload-fp": 'upload',
		"submit form": "submitForm"
	},
	
	initialize: function(opts){
		this.blog_id = opts.blog_id;
		filepicker.setKey("AFmd243qR4C3FGkOJfBTnz");
	},
	
	onShow: function(){
		
		$('#post-content').wysihtml5({
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
		
		
	
// 		$('#post-content').editable({
// 			inlineMode: false,
// 			imageUpload: false,
// 			imageLink: false,
// 			saveUrl: '/posts',
// 			saveParams: {
// 				blog_id: this.blog_id
// 			}
// 		});
		
// 		$('.post-save').on('click', function() {
// 			console.log("post save clicked");
// 			$("#edit").editable("save");
// 		});
		
	},
	
	upload: function (event) {
		
		var $imagesDiv = $('div.image-thumbnails');
		var $inputDiv = $('#post_filepicker_urls');
		var inputDivVal = $inputDiv.val();
		
		var xBtn = $('<a href="#"><i class="icon-remove-sign">X</i></a>');
		
		// clear out all pics
		xBtn.on('click', function(event){
			event.preventDefault();
			$inputDiv.val("")
			$imagesDiv.empty();
			
		});
		
		filepicker.pickMultiple({
			maxFiles: 10,
			folders: true,
			maxSize: 1024*1024,
			container: 'modal'
		}, function(blobs) {
			
			blobs.forEach(function(blob){
				
				inputDivVal = inputDivVal.split(",").concat(blob.url).filter(function(v){ return v!==''}).toString();
				
				$inputDiv.val(inputDivVal);
				var $image = $('<img>').attr('src', blob.url);
				$imagesDiv.append($image);
				
			});
			
			$imagesDiv.append(xBtn);
		}.bind(this));
		
	},
	
	submitForm: function(event) {
		event.preventDefault();
		
		var formData = $(event.currentTarget).serializeJSON();
		console.log("clicked submit", formData);
		var modalView = this;
		
		var post = new FilepickerTest.Models.Post();
		post.save(formData, {
			success: function(model) {
				console.log("post saved!", post);
				this.submit();
			}.bind(this),
			error: function() {
				console.log("something went wrong");
			}
		});
		
	},
	
	submit: function(event) {
		event.preventDefault();
		this.$(".modal").removeClass("is-open");
// 		console.log("clicked submit");
// 		window.location.replace("/blogs/"+this.blog_id);
	},

	views: {
		'click #tab1': {
			name: 'tab1',
			view: JST["posts/new_tab1"],
			onActive: 'setActive'
		},
		
		'click #tab2': {
			name: 'tab2',
			view: JST["posts/new_tab2"],
// 			view: _.template($('#modal-view2-template').html()),
			onActive: 'setImagesTab'
		},
	},
		
	setActive: function(options) {
		this.$('.bbm-modal__tab a').removeClass('active');
		this.$('#'+options.name).addClass('active'); 
	},
	
	setImagesTab: function(options) {
		this.$('.bbm-modal__tab a').removeClass('active');
		this.$('#'+options.name).addClass('active'); 
		
		this.makeDropPane();
	},
	
	makeDropPane: function(){
		
	setTimeout(function(){
		var targetPane = $('#exampleDropPane');
		
			console.log("dom2", targetPane[0]);
		
			filepicker.makeDropPane(targetPane[0], {
				multiple: true,
				dragEnter: function() {
					
					$("#exampleDropPane").html("Drop to upload").css({
						'backgroundColor': "#E0E0E0",
						'border': "1px solid #000",
						"padding": '10px'
					});
				},
				dragLeave: function() {
					
					$("#exampleDropPane").html("Drop files here").css({
						'backgroundColor': "#F6F6F6",
						'border': "1px dashed #666",
						"padding": '10px'
					});
				},
				onSuccess: function(Blobs) {
					$("#exampleDropPane").text("Done, see result below");
					$("#localDropResult").text(JSON.stringify(Blobs));
				},
				onError: function(type, message) {
					$("#localDropResult").text('('+type+') '+ message);
				},
				onProgress: function(percentage) {
					$("#exampleDropPane").text("Uploading ("+percentage+"%)");
				}
			});
			
			
		}, 600);

	}
	
});

// outside Modal


		