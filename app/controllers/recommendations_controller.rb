class RecommendationsController < ApplicationController
  include RecipeJsonConverter

  def index
    @recommendations = Recipe.recommendations( current_user.id )

    respond_to do |format|
      format.json { render json: index_recipe_json(@recommendations) }
    end

  end

end
