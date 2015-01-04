class CreateDashboards < ActiveRecord::Migration
  def change
    create_table :dashboards do |t|
			t.integer :user_id, null: :false

      t.timestamps
    end
		
		add_index :dashboards, :user_id, unique: true
  end
end
