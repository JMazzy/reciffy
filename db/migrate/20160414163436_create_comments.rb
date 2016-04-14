class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :comment_description, null: false
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false

      t.timestamps null: false
    end
    add_index :comments, [:user_id, :recipe_id]
  end
end
