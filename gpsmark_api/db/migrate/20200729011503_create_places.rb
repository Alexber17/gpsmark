class CreatePlaces < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.string :nick_name
      t.string :addrees
      t.string :img

      t.timestamps
    end
  end
end
