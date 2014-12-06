class LinksController < ApplicationController
	
	before_action :authenticate_user!, only: [:new, :create, :destroy]
	
	def index
		@links = current_user.links
	end
	
	def new
		@link = Link.new
		@current_user = current_user
	end
	
	def create
		link = current_user.links.new(link_params)
		
		respond_to do |format|
			if link.save
				format.html { redirect_to user_links_path(current_user), notice: 'Link submitted!' }
				format.js { }
				format.json { render json: link, status: :created, location: user_links_path }
			else
				format.html { render action: :new }
				format.json { render json: link.errors, status: :unprocessable_entity }
			end
		end
	end
	
	def destroy
		link = Link.find(params[:id])
		if link.destroy!
			flash[:success] = "Link deleted."
			redirect_to root_url
		else
			flash[:danger] = "Something went wrong."
			redirect_to root_url
		end
	end
	
	private 
	
	def link_params
		params.require(:link).permit(:url, :title)
	end
	
end
