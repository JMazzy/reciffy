class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :recipe

  validates :rating, presence: true
  validates :rating, numericality: { only_integer: true, less_than_or_equal_to: 5, greater_than_or_equal_to: 0 }
  validates :user, presence: true
  validates :recipe, presence: true
  validates :recipe_id, uniqueness: { scope: :user_id }
end
