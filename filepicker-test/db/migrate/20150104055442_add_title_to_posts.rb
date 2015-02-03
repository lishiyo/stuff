class AddTitleToPosts < ActiveRecord::Migration
  def change
		add_column :posts, :title, :string
		
		add_index :posts, :blog_id
  end
end
