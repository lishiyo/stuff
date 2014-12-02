class LinksController < ApplicationController
	
	before_action :authenticate_user!, only: [:new, :create]
	
	def show
	end
	
	def new
		@link = Link.new
	end
	
	def create
		link = Link.create!(link_params)
		if link.save
			link.update!(user_id: current_user.id)
			flash[:success] = "Link submitted!"
			redirect_to root_url
		else
			flash[:danger] = "Something went wrong."
			redirect_to new_link_path
		end
	end
	
	private 
	
	def link_params
		params.require(:link).permit(:url, :title, :user_id)
	end
	
end
