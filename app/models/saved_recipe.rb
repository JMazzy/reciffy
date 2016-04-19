class SavedRecipe < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :user

  validates :recipe_id, uniqueness: { scope: :user_id }
  validates :recipe, presence: true
  validates :user, presence: true
end
