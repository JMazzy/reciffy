class ChangeTableNames < ActiveRecord::Migration
  def change
  	rename_table :recipeingredients, :recipe_ingredients
  	rename_table :maderecipes, :made_recipes
  	rename_table :savedrecipes, :saved_recipes
  end
end
