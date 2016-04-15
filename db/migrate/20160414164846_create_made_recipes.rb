class CreateMadeRecipes < ActiveRecord::Migration
  def change
    create_table :made_recipes do |t|
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false

      t.timestamps null: false
    end
    add_index :made_recipes, [:user_id, :recipe_id]
  end
end
