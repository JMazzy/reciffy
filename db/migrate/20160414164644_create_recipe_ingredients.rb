class CreateRecipeIngredients < ActiveRecord::Migration
  def change
    create_table :recipe_ingredients do |t|
      t.integer :recipe_id, null: false
      t.integer :ingredient_id, null: false
      t.integer :unit_id, null: false
      t.decimal :quantity, null: false

      t.timestamps null: false
    end
    add_index :recipe_ingredients, [:recipe_id, :ingredient_id, :unit_id], name: 'recipe_ingredient_unit_index'
  end
end
