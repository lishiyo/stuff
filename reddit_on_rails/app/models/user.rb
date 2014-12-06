class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	# links should live on without their submitters
	has_many :links, class_name: "Link", foreign_key: :user_id, primary_key: :id, inverse_of: :user
	# accepts_nested_attributes_for :links
	
	# comments that user makes
	has_many :comments, class_name: "Comment", foreign_key: :commenter_id, inverse_of: :commenter, dependent: :destroy
	
	#comments by others that show up on user's page
	has_many :comments_about, as: :commentable
	# has_many :commenters, through: :comments_about, source: :commentable, source_type: 'User'
	
end
