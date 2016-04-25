class Ingredient < ActiveRecord::Base
	has_many :recipe_ingredients

	validates :name, length: { in: 1..50 }, uniqueness: true
end
