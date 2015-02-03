class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :blog_id
      t.text :content
      t.string :filepicker_urls

      t.timestamps
    end
  end
end
