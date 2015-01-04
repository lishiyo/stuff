class UsersController < ApplicationController
	
	def show
		@user = User.find(params[:id])
		# When the file_url is uploaded its as a hash of files.. so you just need to .split(",") them into a hash and you can display them on a page. 
		@filepicker_urls = @user.filepicker_url.split(",")
	end
	
	def new
		@user = User.new
	end
	
	def create
		@user = User.new(user_params)
		if @user.save
			redirect_to user_url(@user)
		else
			render json: @user.errors.full_messages, status: 422
		end
	end
	
	private
	
	def user_params
		params.require(:user).permit(:username, :filepicker_url)
	end
	
end
