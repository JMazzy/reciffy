class IndexIngredientsOnName < ActiveRecord::Migration
  def change
    add_index :recipes, :name, unique: true
  end
end
