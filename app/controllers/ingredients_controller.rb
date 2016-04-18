class IngredientsController < ApplicationController
  def index
    @ingredients = Ingredient.all
    respond_to do |format|
      format.json { render json: @ingredients.as_json }
    end
  end


  def show
    @ingredient = Ingredient.find(params[:id])
    respond_to do |format|
      format.json { render json: @ingredient.as_json }
    end
  end
end
