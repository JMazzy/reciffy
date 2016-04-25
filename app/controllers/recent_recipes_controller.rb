class RecentRecipesController < ApplicationController
  include RecipeJsonConverter

  def index
    @recipes = Recipe.get_recent_recipes
    respond_to do |format|
      format.json { render json: index_recipe_json(@recipes), status: 200 }
    end
  end

end
