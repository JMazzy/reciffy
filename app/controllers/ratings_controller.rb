class RatingsController < ApplicationController

  def create
    @rating = Rating.new(rating_params)
    respond_to do |format|
      if @rating.save
        format.html { redirect_to request.referrer }
        # format.json { render json: @rating.to_json() }
      else
        format.html { redirect_to request.referrer }
        # format.json { render json: @rating.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @rating = Rating.find_by(user_id: current_user.id, recipe_id: params[:id])
    respond_to do |format|
      if @rating.update(rating_params)
        format.html { redirect_to request.referrer }
        # format.json { render json: @rating.to_json() }
      else
        format.html { redirect_to request.referrer }
        # format.json { render json: @rating.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:user_id, :recipe_id, :rating)
  end
end
