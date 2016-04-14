class Photo < ActiveRecord::Base
  has_attached_file :photo, styles: { thumb: "100x100", medium: "250x250", large: "500x500>" }
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
  validates_attachment_presence :photo, presence: true
  validates_with AttachmentSizeValidator, attributes: :photo, less_than: 5.megabytes

  belongs_to :recipe

  private

  def photo_from_url(url)
    self.photo = open(url)
  end
end
