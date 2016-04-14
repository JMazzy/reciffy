class RecipeingredientsController < ApplicationController

  def new
    @recipe_ingredient = Recipeingredient.new
  end

  def create
    @recipe_ingredient = Recipeingredient.new(recipe_ingredient_params)
    @recipe_ingredient.recipe_id = params[:recipe_id]
    if @recipe_ingredient.save
      redirect_to recipe_path(@recipe_ingredient.recipe_id)
    else
      render :new
    end
  end

  private

  def recipe_ingredient_params
    params.require(:recipeingredient).permit(
      :recipe_id,
      :ingredient_id,
      :unit_id)
  end  
end