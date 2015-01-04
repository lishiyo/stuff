class Blog < ActiveRecord::Base
	
	belongs_to :user
	has_many :posts, inverse_of: :blog
	validates :name, presence: true, uniqueness: true
	validates :description, length: { maximum: 140 }
	
	
end
