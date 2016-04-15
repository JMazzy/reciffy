class MadeRecipe < ActiveRecord::Base
	belongs_to :user
	belongs_to :recipe

  validates :recipe_id, uniqueness: { scope: :user_id }
  validates :recipe_id, :user_id, presence: true
end
