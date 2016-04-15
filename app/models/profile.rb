class Profile < ActiveRecord::Base
  belongs_to :user

  has_attached_file :avatar, styles: { thumb: "100x100", medium: "250x250" }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/, :unless => "avatar.blank?"
  validates_attachment_presence :avatar, presence: true, :unless => "avatar.blank?"
  validates_with AttachmentSizeValidator, attributes: :avatar, less_than: 5.megabytes, :unless => "avatar.blank?"

  validates :user, presence: true

  def full_name
    "#{first_name} #{last_name}"
  end
end
