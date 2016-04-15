class Profile < ActiveRecord::Base
  belongs_to :user
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings

  has_attached_file :avatar, styles: { thumb: "100x100", medium: "250x250", large: "500x500>" }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/, :unless => "avatar.blank?"
  validates_attachment_presence :avatar, presence: true, :unless => "avatar.blank?"
  validates_with AttachmentSizeValidator, attributes: :avatar, less_than: 5.megabytes, :unless => "avatar.blank?"

  validates :user_id, presence: true,
                      uniqueness: true,
                      allow_blank: false,
                      allow_nil: false

  accepts_nested_attributes_for :taggings
  accepts_nested_attributes_for :tags


  def full_name
    "#{first_name} #{last_name}"
  end
end
