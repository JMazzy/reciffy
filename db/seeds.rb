
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Recipe.delete_all
Ingredient.delete_all
Unit.delete_all
Recipeingredient.delete_all


puts "Creating User"

test_user = User.create(  email: "foo@bar.com",
                          password: "foo1bar2" )

10.times do |num|

  User.create(email: "user#{num}@gmail.com",
		      password: "foo1bar2")
end

puts "Creating Ingredients"

ingredients = ["cauliflower", "sugar", "spinach", "salt", "pepper", "green chilly",
               "flour","baking powder","eggs"]
ingredients.each do |element|
  Ingredient.create(name: element)
end

puts "Creating Units"

units = ["cup" ,"oz", "lbs", "grams", "tbsp", "tsp", "count"]
units.each do |element|
 Unit.create(unit_type: element)
end

puts "Creating Tags"
test_user.tags.create(  name: "footag" )
test_user.tags.create(  name: "bartag" )

