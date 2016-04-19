class RatingsController < ApplicationController

  def index
    @rated_recipes = current_user.ratings
    respond_to do |format|
      format.json { render json: @rated_recipes.to_json(
        include: [:recipe]
      )}
    end
  end

  def create
    @rating = Rating.new(rating_params)
    respond_to do |format|
      if @rating.save
        format.html { redirect_to request.referrer }
        format.json { render json: @rating.to_json(include: [:recipe]) }
      else
        format.html { redirect_to request.referrer }
        format.json { render json: @rating.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @rating = Rating.find_by_id(params[:id])
    respond_to do |format|
      if @rating.update(rating_params)
        format.html { redirect_to request.referrer }
        format.json { render json: @rating.to_json(include: [:recipe]) }
      else
        format.html { redirect_to request.referrer }
        format.json { render json: @rating.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:user_id, :recipe_id, :rating)
  end
end
