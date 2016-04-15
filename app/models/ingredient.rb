class Ingredient < ActiveRecord::Base
	has_many :recipe_ingredients
end
