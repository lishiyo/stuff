class Dashboard < ActiveRecord::Base
	
	belongs_to :user
	has_many :blogs, through: :user
	has_many :own_posts, through: :blogs, source: :posts # user's own posts
	
end
