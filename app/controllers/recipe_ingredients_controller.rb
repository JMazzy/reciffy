class RecipeIngredientsController < ApplicationController

  def index
    @recipe_ingredients = RecipeIngredient.all
    respond_to do |format|
      format.json { render json: @recipe_ingredients }
    end
  end

  def show
    @ri = RecipeIngredient.find(params[:id])
    respond_to do |format|
      format.json { render json: @ri }
    end
  end

  def new
    @recipe_ingredient = RecipeIngredient.new
  end

  def create
    @recipe_ingredient = RecipeIngredient.new(recipe_ingredient_params)
    @recipe_ingredient.recipe_id = params[:recipe_id]
    if @recipe_ingredient.save
      redirect_to recipe_path(@recipe_ingredient.recipe_id)
    else
      render :new
    end
  end

  def destroy

    if @recipe_ingredient = RecipeIngredient.find_by_id(params[:id])

      respond_to do |format|
        if @recipe_ingredient.destroy
          format.html { redirect_to request.referrer }
          format.json { head :no_content }
         else
          format.html { redirect_to request.referrer }
          format.json { head :no_content }
        end
      end
    end
      
  end 
  private

  def recipe_ingredient_params
    params.require(:recipe_ingredient).permit(
      :recipe_id,
      :ingredient_id,
      :unit_id)
  end
end
