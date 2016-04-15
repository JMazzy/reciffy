class ChangeTableNames < ActiveRecord::Migration
  def change
  	rename_table :recipe_ingredients, :recipe_ingredients
  	rename_table :maderecipes, :made_recipes
  	rename_table :savedrecipes, :saved_recipes
  end
end
