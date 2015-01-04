class PostsController < ApplicationController
	
	before_action :get_blog, only: [:index, :new]
	
	respond_to :html, :json
	
	def index
		@posts = @blog.posts
	end
	
	def show
		@post = Post.find(params[:id])
	end
	
	def new
		@post = @blog.posts.new
	end
	
	def create
		blog = Blog.find(post_params[:blog_id])
		
		@post = blog.posts.build(post_params)
		if @post.save
			respond_to do |format|
				format.html { redirect_to blog_url(blog) }
				format.json { render json: @post }
				format.js { render json: @post }
			end
		else
			flash.now[:errors] = "woops"
			redirect_to :back
		end
	end
	
	private
	
	def get_blog
		@blog = Blog.find(params[:blog_id])
	end
	
	def post_params
		params.require(:post).permit(:blog_id, :title, :content, :filepicker_urls, :bootsy_image_gallery_id)
	end
	
end
