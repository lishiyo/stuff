class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
			t.string :email, uniqueness: true
			t.string :username, uniqueness: true
      t.timestamps
    end
		
		add_index :users, :email, unique: true
  end
end
