class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :photo
  validates :user_id, uniqueness: true
end
