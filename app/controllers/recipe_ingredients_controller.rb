class RecipeIngredientsController < ApplicationController

  def index
    @recipe_ingredients = RecipeIngredient.all.includes(:recipe, :unit, :ingredient)
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
    ingredient = Ingredient.find_or_create_by(name: params[:ingredient_name].downcase)
    @recipe_ingredient[:ingredient_id] = ingredient.id
    respond_to do |format|
      if @recipe_ingredient.save
         format.html { redirect_to request.referrer }
         format.json { render json: added_recipe_ingredient_json(@recipe_ingredient) }
      else
        format.html { redirect_to request.referrer }
        format.json { render json: @recipe_ingredient }
      end
    end
  end

  def destroy

    if @recipe_ingredient = RecipeIngredient.find_by_id(params[:id])

      respond_to do |format|
        if @recipe_ingredient.destroy
          format.html { redirect_to request.referrer }
          format.json { render json: @recipe_ingredient }
         else
          format.html { redirect_to request.referrer }
          format.json { render json: @recipe_ingredient }
        end
      end
    end

  end

  private

  def recipe_ingredient_params
    params.require(:recipe_ingredient).permit(
      :recipe_id,
      :ingredient_id,
      :quantity,
      :unit_id)
  end

  def added_recipe_ingredient_json(recipe_ingredient)
    ri = recipe_ingredient.as_json
    ri["ingredient"] = recipe_ingredient.ingredient.as_json
    ri["unit"] = recipe_ingredient.unit.as_json
    ri = ri.as_json
    return ri
  end

end
