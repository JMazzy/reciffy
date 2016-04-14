class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :prep_time, null: false
      t.integer :cook_time, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :recipes, :user_id
  end
end
