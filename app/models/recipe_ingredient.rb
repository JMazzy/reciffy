class RecipeIngredient < ActiveRecord::Base
	belongs_to :recipe
	belongs_to :ingredient

    validate :recipe_ingredoent_exist

	def recipe_ingredient_exist
      return false if (Ingredient.find(self.ingredient_id).nil? ||
                       Recipe.find(self.recipe_id).nil?)
    end
end
