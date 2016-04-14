class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  	# @recipes = Recipe.includes(:recipeingredients)
  end

  def new
    @recipe  = current_user.recipes.build
    @recipe.recipeingredients.build
  end

  def create

    @recipe = current_user.recipes.build(recipe_params)
    @ri = @recipe.recipeingredients.build
    @ri.ingredient_id = params["recipe"]["recipeingredient"]["ingredient_id"]
    @ri.unit_id = params["recipe"]["recipeingredient"]["unit_id"]
    @ri.quantity = params["recipe"]["recipeingredient"]["quantity"]

    if @recipe.save

      flash[:success] = "Recipe was saved!"

      respond_to do |format|

        format.html {redirect_to recipe_path(@recipe)}

        format.js {render :none}
      end
    else
      respond_to do |format|
        flash[:alert] = "Recipe not saved!"
        redirect_to new_recipe_path
      end
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    @comment = Comment.new
  end

  private

  def edit
    @recipe  = Recipe.includes(:recipeingredients).find(params[:id])
    #@recipeingredient = Recipeingredient.find_by_recipe_id(@recipe.id)
  end

  def update
  	@recipe  = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
        flash[:success] = "#{@recipe} was updated successfully!"
        #redirect_to recipe_path(@recipe)
    else
      flash[:alert] = "Your update was NOT successfull!"
      render :edit
    end
  end

  def recipe_params

    params.require(:recipe).permit(
      :user_id,
      :name,
      :description,
      :instructions,
      :cook_time,
      :prep_time,
      { :recipeingredients_attributes => [
        :recipe_id,
        :ingredient_id,
        :unit_id,
        :quantity ] }
    )

  end

end
