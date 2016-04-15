class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :recipe

  validates :recipe_id, :user_id, :rating, presence: true
  validates :recipe_id, uniqueness: { scope: :user_id }
end
