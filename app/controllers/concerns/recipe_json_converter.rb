module RecipeJsonConverter extend ActiveSupport::Concern

  included do

  end

  def index_recipe_json(recipes)
    json_response = []
    recipes.each do |recipe|
      json_response.push(show_recipe_json(recipe))
    end
    return json_response.as_json
  end

  def show_recipe_json(recipe)
    json_response = {}
    recipe_json = recipe.as_json

    recipe_json.each do |key, value|
      json_response[key] = value
    end

    json_response["user"] = recipe.user.as_json
    json_response["tags"] = recipe.tags.as_json
    json_response["taggings"] = recipe.taggings.as_json
    json_response["photos"] = []
    recipe.photos.each do |photo|
      photo_json = photo.as_json
      photo_json["url"] = {}
      photo_json["url"]["large"] = photo.photo.url(:large).gsub(/\?.*/,"")
      photo_json["url"]["medium"] = photo.photo.url(:medium).gsub(/\?.*/,"")
      photo_json["url"]["original"] = photo.photo.url(:original).gsub(/\?.*/,"")
      photo_json["url"]["thumb"] = photo.photo.url(:thumb).gsub(/\?.*/,"")
      json_response["photos"].push( photo_json )
    end
    json_response["comments"] = []

    recipe.comments.includes(:profile).each do |comment|
      json_response["comments"].push(comment.as_json(include: :profile))
    end

    json_response["made_recipes"] =[]

    recipe.made_recipes.each do |made_recipe|
      json_response["made_recipes"].push(made_recipe.as_json)
    end

    json_response["ratings"] =[]

    recipe.ratings.each do |rating|
      json_response["ratings"].push(rating.as_json)
    end

    json_response["recipe_ingredients"] = []

    recipe.recipe_ingredients.each do |recipe_ingredient|
      ri = recipe_ingredient.as_json
      ri["ingredient"] = recipe_ingredient.ingredient
      ri["unit"] = recipe_ingredient.unit
      json_response["recipe_ingredients"].push(ri.as_json)
    end

    json_response["profile"] = recipe.profile.as_json

    return json_response.as_json
  end
end
