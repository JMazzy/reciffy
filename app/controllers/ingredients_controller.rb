class IngredientsController < ApplicationController
  def index
    @ingredients = Ingredient.all
    respond_to do |format|
      format.json { render json: @ingredients }
    end
  end


  def show
    @ingredient = Ingredient.find(params[:id])
    respond_to do |format|
      format.json { render json: @ingredient }
    end
  end
end
