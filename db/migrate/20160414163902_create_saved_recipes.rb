class CreateSavedRecipes < ActiveRecord::Migration
  def change
    create_table :saved_recipes do |t|
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false

      t.timestamps null: false
    end
    add_index :saved_recipes, [:user_id, :recipe_id]
  end
end
