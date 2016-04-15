class MadeRecipe < ActiveRecord::Base
	belongs_to :user
	belongs_to :recipe
	
	validates :user_id, 
              :uniqueness => { :scope => :recipe_id }

    validate :recipe_user_exist

    def recipe_user_exist
      return false if (User.find(self.user_id).nil? ||
                       Recipe.find(self.recipe_id).nil?)
    end

end
