class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.text :bio
      t.string :tagline
      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :state
      t.integer :user_id, null: false

      t.string :avatar_file_name, null: false
      t.string :avatar_content_type, null: false
      t.integer :avatar_file_size, null: false
      t.timestamp :avatar_updated_at, null: false

      t.timestamps null: false
    end
    add_index :profiles, :user_id
  end
end
