Recipe.delete_all
Ingredient.delete_all
Unit.delete_all
Recipeingredient.delete_all
Tag.delete_all
Tagging.delete_all
User.delete_all

test_user = User.create(  email: "foo@bar.com",
                          password: "foo1bar2" )

test_user.tags.create(  name: "footag" )
test_user.tags.create(  name: "bartag" )

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
