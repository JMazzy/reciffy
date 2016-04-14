class Recipe < ActiveRecord::Base
  has_many :photos, dependent: :destroy
  has_many :taggings, as: :taggable
end
