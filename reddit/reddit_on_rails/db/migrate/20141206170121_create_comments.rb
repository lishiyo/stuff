class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :message, null: false
#       t.integer :commentable_id
#       t.string :commentable_type
			t.references :commentable, polymorphic: true
			t.integer :commenter_id, null: false

      t.timestamps
    end
		
		add_index :comments, :commenter_id
		add_index :comments, [:commentable_id, :commentable_type]
  end
end
