class RecommendationsController < ApplicationController

  def index
    @recommendations = Recipe.recommendations( current_user.id )

    binding.pry

    respond_to do |format|
      format.json { render json: @recommendations }
    end

  end

end
