puts "Deleting everything in Database"

Recipe.delete_all
Ingredient.delete_all
Unit.delete_all
RecipeIngredient.delete_all
Tag.delete_all
Tagging.delete_all
User.delete_all
Subscription.delete_all
Profile.delete_all

puts "Creating Users"

User.create( email: "harry@potter.com", password: "qwerqwer" )

User.create(  email: "foo@bar.com", password: "foo1bar2" )

10.times do |num|
  User.create(email: "user#{num}@gmail.com", password: "foo1bar2")
end

puts 'Creating Profiles'

User.all.each do |user|
  user.profile.first_name = Faker::Name.first_name
  user.profile.last_name = Faker::Name.last_name
  user.profile.bio = Faker::Hipster.paragraph
  user.profile.tagline = Faker::Hipster.sentence
  user.profile.city = Faker::Address.city
  user.profile.state = Faker::Address.state
  user.profile.save!
end

puts "Creating Ingredients"

ingredients = [
  "cauliflower",
  "sugar",
  "spinach",
  "salt",
  "pepper",
  "green chilly",
  "flour",
  "baking powder",
  "eggs"
]

ingredients.each do |element|
  Ingredient.create(name: element)
end

puts "Creating Units"

units = ["cup" ,"oz", "lbs", "grams", "tbsp", "tsp", "count"]
units.each do |element|
 Unit.create(unit_type: element)
end

puts "Creating Recipes"

10.times do
  Recipe.create(
    name: Faker::Hipster.words.join(" ").titleize,
    description: Faker::Hipster.sentence,
    instructions: Faker::Hipster.paragraph,
    prep_time: Random.rand(60),
    cook_time: Random.rand(60),
    user_id: User.all.sample.id
  )
end

Recipe.all.each do |r|
  5.times do
    r.recipe_ingredients.create(
      ingredient_id: Ingredient.all.sample.id,
      unit_id: Unit.all.sample.id,
      quantity: Random.rand(4)
    )
  end
end

puts "Creating Tags"

puts "Creating User Taggings"

User.all.each do |u|
  2.times do
    u.profile.tags.create( name: Faker::Hipster.word )
  end
end

puts "Creating Recipe Taggings"

Recipe.all.each do |r|
  3.times do
    r.tags.create( name: Faker::Hipster.word )
  end
end

puts "Creating Subscriptions"
User.all.each do |u|
  s_arr = User.where("id != ?",u.id)
  3.times do
    s = s_arr.sample
    #s_arr.delete(s)
    Subscription.create(
      subscriber_id: u.id,
      subscribed_id: s.id
    )
  end
end

puts "Creating Saved Recipes"
User.all.each do |u|
  all_recipes = Recipe.all.pluck(:id).shuffle
  3.times do
    SavedRecipe.create(user_id: u.id, recipe_id: all_recipes.pop)
  end
end
