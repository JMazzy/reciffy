class RecommendationsController < ApplicationController

  def index
    @recommendations = Subscription.get_subscribed_recipes(current_user.id)

    respond_to do |format|
      format.json { render json: @recommendations }
    end
  end

end
