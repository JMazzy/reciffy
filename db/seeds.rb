
def quick_ingredients
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

  ingredients.each do |ingredientName|
    Ingredient.create(name: ingredientName)
  end
end

def usda_ingredients
  ingredients = []
  offset = 0
  max = 500

  loop do
    responseList = JSON.parse(USDA_API.getList("food", offset, max).body)['list']['item']
    ingredients += responseList
    puts "got #{responseList.length} items"
    break if responseList.length == 0
    offset += max
    sleep(0.5)
  end

  ingredients.each do |i|
    Ingredient.create(name: i['name'])
  end
end


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
Rating.delete_all

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
  user.profile.avatar = File.new("#{Rails.root}/public/images/avatar.jpeg")
  user.profile.save!
end

puts "Creating Ingredients"

usda_ingredients

puts "Creating Units"

units = ["cup" ,"oz", "lbs", "grams", "tbsp", "tsp", "count"]
units.each do |element|
 Unit.create(unit_type: element)
end

puts "Creating Recipes"

10.times do
  newRecipe = Recipe.new(
    name: Faker::Hipster.words.join(" ").titleize,
    description: Faker::Hipster.sentence,
    instructions: Faker::Hipster.paragraph,
    prep_time: Random.rand(60),
    cook_time: Random.rand(60),
    user_id: User.all.sample.id
  )
  newRecipe.save!
  Photo.create(
    photo: File.new("#{Rails.root}/public/images/food-image.jpg"),
    recipe_id: Recipe.last.id
  )
  newRecipe.photos << Photo.last
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

10.times do
  Tag.create( name: Faker::Hipster.word );
end

puts "Creating User Taggings"

User.all.each do |u|
  2.times do
    u.profile.taggings.create( tag_id: Tag.all.sample.id, taggable_id: u.profile.id, taggable_type: "Profile" )
  end
end

puts "Creating Recipe Taggings"

Recipe.all.each do |r|
  3.times do
    r.taggings.create( tag_id: Tag.all.sample.id, taggable_id: r.id, taggable_type: "Recipe" )
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

puts "Creating Comments"
Recipe.all.each do |r|
  r.comments.create(  user_id: User.all.sample.id,
                      comment_description: Faker::Hipster.sentence )
end

puts "Creating Made Recipes"
User.all.each do |u|
  all_recipes = Recipe.all.pluck(:id).shuffle
  3.times do
    MadeRecipe.create(user_id: u.id, recipe_id: all_recipes.pop)
  end
end

puts "Creating Ratings for Recipes"
User.all.each do |u|
  all_recipes = Recipe.all.pluck(:id).shuffle
  3.times do
    Rating.create(
      user_id: u.id,
      recipe_id: all_recipes.pop,
      rating: rand(1..5)
    )
  end
end
