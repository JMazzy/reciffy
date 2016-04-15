class CreateMadeRecipes < ActiveRecord::Migration
  def change
    create_table :maderecipes do |t|
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false

      t.timestamps null: false
    end
    add_index :maderecipes, [:user_id, :recipe_id]
  end
end
