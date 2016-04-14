class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :rating, null: false
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false

      t.timestamps null: false
    end
    add_index :ratings, [:user_id, :recipe_id]
  end
end
