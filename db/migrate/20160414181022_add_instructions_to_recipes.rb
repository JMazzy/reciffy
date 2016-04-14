class AddInstructionsToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :instructions, :text
    change_column :recipes, :description, :string
  end
end
