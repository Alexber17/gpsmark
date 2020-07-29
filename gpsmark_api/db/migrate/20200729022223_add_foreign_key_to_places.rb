class AddForeignKeyToPlaces < ActiveRecord::Migration[6.0]
  def change
    add_column :places, :user_id, :integer 
  end
end
