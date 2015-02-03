class Link < ActiveRecord::Base
	
	belongs_to :user, class_name: "User", foreign_key: :user_id, primary_key: :id
	
	has_many :comments, as: :commentable
	has_many :commenters, through: :comments, source: :commentable, source_type: 'Link'
	
end
