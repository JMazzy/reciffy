class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :caption
      t.string :photo_file_name, null: false
      t.string :photo_content_type, null: false
      t.integer :photo_file_size, null: false
      t.timestamp :photo_updated_at, null: false
      t.integer :recipe_id, null: false

      t.timestamps null: false
    end
    add_index :photos, :recipe_id
  end
end
