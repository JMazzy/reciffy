class IndexIngredientsOnNameNotRecipes < ActiveRecord::Migration
  def change
    remove_index :recipes, :name
    add_index :ingredients, :name, unique: true
  end
end
