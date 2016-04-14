class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :description
      t.integer :prep_time
      t.integer :cook_time
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
