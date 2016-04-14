class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :subscriber_id, null: false
      t.integer :subscribed_id, null: false

      t.timestamps null: false
    end
    add_index :subscriptions, [:subscribed_id, :subscriber_id]
  end
end
