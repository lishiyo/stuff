class BlogsController < ApplicationController
	
	
	def show
		@blog = Blog.includes(:posts).find(params[:id])
	end
	
	def new
		@blog = Blog.new
	end
	
	def create
		@blog = Blog.new(blog_params)
		if @blog.save
			redirect_to blog_url(@blog)
		else
			render 'new'
		end
	end
	
	private
	
	def blog_params
		params.require(:blog).permit(:avatar_url, :user_id, :name, :description)
	end
	
	
end
