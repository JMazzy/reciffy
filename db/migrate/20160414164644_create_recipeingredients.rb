class CreateRecipeingredients < ActiveRecord::Migration
  def change
    create_table :recipeingredients do |t|
      t.integer :recipe_id, null: false
      t.integer :ingredient_id, null: false
      t.integer :unit_id, null: false
      t.decimal :quantity, null: false

      t.timestamps null: false
    end
    add_index :recipeingredients, [:recipe_id, :ingredient_id, :unit_id], name: 'recipe_ingredient_unit_index'
  end
end
