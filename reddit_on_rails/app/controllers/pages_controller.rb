class PagesController < ApplicationController
	
	def index
		params[:per_page] ||= 5
		params[:page]     ||= 1
	#	@links = Link.order('created_at DESC').page(params[:page])
		#.page(params[:page]).per_page(params[:per_page])
		
		links = Link.order('created_at DESC').paginate(per_page: params[:per_page], page: params[:page])
		@links = LinkDecorator.decorate_collection(links)
		
		respond_to do |format|
   	 	format.html
    	format.json  { render :json => @links }
  	end
	end
	
end
