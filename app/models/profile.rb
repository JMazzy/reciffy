class Profile < ActiveRecord::Base
  belongs_to :user

  has_attached_file :avatar, styles: { thumb: "100x100", medium: "250x250", large: "500x500>" }
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
  validates_attachment_presence :photo, presence: true
  validates_with AttachmentSizeValidator, attributes: :photo, less_than: 5.megabytes

  validates :user_id, uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end
end
