class Post < ActiveRecord::Base
	
	include Bootsy::Container
	
	belongs_to :blog
	has_one :author, through: :blog, source: :user
	
# 	my_post.bootsy_image_gallery.images.first.image_file.url
	
	validates :content, presence: true, unless: ->(post){ post.filepicker_urls.present? }
	validates :filepicker_urls, presence: true, unless: ->(post){ post.content.present? }
	
end
