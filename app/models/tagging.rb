class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :taggable, polymorphic: true

  validates :tag_id, presence: true
  validates :taggable_id, presence: true
  validates :taggable_type, presence: true
end
