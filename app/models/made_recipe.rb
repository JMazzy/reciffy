class MadeRecipe < ActiveRecord::Base
	belongs_to :user
	belongs_to :recipe

  validates :recipe_id, uniqueness: { scope: :user_id }
  validates :recipe_id, :user_id, presence: true

	validates :user_id,
              :uniqueness => { :scope => :recipe_id }

  validate :recipe_user_exist

  def recipe_user_exist
    return false if (User.find(self.user_id).nil? ||
                     Recipe.find(self.recipe_id).nil?)
  end
end
