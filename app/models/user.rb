class User < ActiveRecord::Base
	
	validates :email, presence: true
	has_many :blogs, inverse_of: :user
	has_many :posts, through: :blogs
	
end

