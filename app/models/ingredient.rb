class Ingredient < ActiveRecord::Base
	has_many :recipeingredients
end
