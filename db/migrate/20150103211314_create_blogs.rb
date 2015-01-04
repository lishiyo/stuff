class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :avatar_url
      t.integer :user_id
			t.string :name, null: false
      t.text :description

      t.timestamps
    end
		
		add_index :blogs, :user_id
  end
end
