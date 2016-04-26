class Activity < ActiveRecord::Base
  belongs_to :activable, polymorphic: true
  belongs_to :user

  validates :user, presence: true
  validates :event, presence: true
  validates :activable, presence: true
  validates :user_id, uniqueness: { scope: [:activable_id, :activable_type], message: "Event already logged in database!" }
end
