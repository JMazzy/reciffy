class SavedRecipe < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :user
  
  validates :recipe_id, uniqueness: { scope: :user_id }
  validates :recipe_id, :user_id, presence: true
end
