class RecommendationsController < ApplicationController

  def index
    from_subscribed = Recipe.get_subscribed_recipes(current_user.id)
    from_tags_of_rated_recipes = Recipe.tags_personal_highest_rated(current_user.id)

    @recommendations = ( from_subscribed + from_tags_of_rated_recipes ).uniq.shuffle

    respond_to do |format|
      format.json { render json: @recommendations }
    end
  end

end
