class MadeRecipesController < ApplicationController
  def new
    @made_recipes = current_user.made_recipes
  end

  def create
    @made_recipe = current_user.made_recipes.build(made_recipe_params)
    if @made_recipe.save
      redirect_to :back
    else
      render :new
    end
  end

  def destroy
    @made_recipe = MadeRecipe.find_by(user_id: params[:user_id], recipe_id: params[:id])
    if @made_recipe.destroy
      flash[:success] = 'Removed your made recipe'
      redirect_to :back
    else
      flash[:error] = 'Failed to remove your made recipe'
      redirect_to :back
    end
  end

  private

  def made_recipe_params
    params.permit(
      :recipe_id,
      :user_id)
  end 
end
