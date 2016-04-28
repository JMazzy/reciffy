class Tag < ActiveRecord::Base
  has_many :taggings, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :name, length: { in: 1..50 }
end
