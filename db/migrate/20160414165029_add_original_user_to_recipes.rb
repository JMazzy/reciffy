class AddOriginalUserToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :original_id, :integer
    add_index :recipes, :original_id
  end
end
