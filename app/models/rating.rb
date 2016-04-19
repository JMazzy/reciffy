class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :recipe

  validates :rating, presence: true
  validates :user, presence: true
  validates :recipe, presence: true
  validates :recipe_id, uniqueness: { scope: :user_id }
end
