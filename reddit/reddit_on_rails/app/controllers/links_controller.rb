class LinksController < ApplicationController
#	decorates_assigned :link
	before_action :authenticate_user!, only: [:new, :create, :destroy]
	before_action :set_link, only: [:edit, :update, :destroy]
	
	def index
		@links = LinkDecorator.decorate_collection(current_user.links)
	end
	
	def new
		@link = Link.new
	end
	
	def create
		@link = current_user.links.build(link_params)
		
		respond_to do |format|
			if @link.save
				format.html { redirect_to user_links_path(current_user), notice: 'Link submitted!' }
				format.js { }
				format.json { render json: @link, status: :created, location: user_links_path }
			else
				format.html do
					flash.now[:errors] = @link.errors.full_messages
					render action: :new 
				end
				format.json { render json: @link.errors.full_messages, status: :unprocessable_entity }
			end
		end
	end
	
	def edit
	end
	
	def update
	end
	
	def destroy	
		if @link.destroy!
			flash[:success] = "Link deleted."
			redirect_to root_url
		else
			flash[:danger] = "Something went wrong."
			redirect_to root_url
		end
	end
	
	private 
	
	def set_link
		@link = Link.find(params[:id])
	end
	
	def link_params
		params.require(:link).permit(:url, :title)
	end
	
	
end
