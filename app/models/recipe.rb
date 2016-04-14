class Recipe < ActiveRecord::Base
  has_many :photos, dependent: :destroy
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
end
