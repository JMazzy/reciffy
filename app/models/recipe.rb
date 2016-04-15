class Recipe < ActiveRecord::Base

  belongs_to :user
  has_many :recipe_ingredients

  has_many :photos, dependent: :destroy
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  has_many :comments
  has_many :made_recipes

  accepts_nested_attributes_for :recipe_ingredients,
	  :allow_destroy => true,
    :reject_if     => :all_blank

  accepts_nested_attributes_for :photos, reject_if: :all_blank, allow_destroy: true

  validates :name, :description, :instructions, :prep_time, :cook_time, presence: true
end
