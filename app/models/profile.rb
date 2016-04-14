class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :photo
  validates :user_id, uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end
end
