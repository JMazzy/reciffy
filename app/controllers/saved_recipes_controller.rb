class SavedRecipesController < ApplicationController

  def create
    @saved_recipe = current_user.saved_recipes.build(saved_recipe_params)
    respond_to do |format|
      if @saved_recipe.save
        format.html { redirect_to request.referrer }
        # format.json { render json: @made_recipe.to_json() }
      else
        format.html { redirect_to request.referrer }
        # format.json { render json: render json: @made_recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @saved_recipe = SavedRecipe.find_by(user_id: params[:user_id], recipe_id: params[:id])
    respond_to do |format|
      if @saved_recipe.destroy
        format.html { redirect_to request.referrer }
        format.json { head :no_content }
      else
        format.html { redirect_to request.referrer }
        format.json { head :no_content }
      end
    end
  end

  private

  def saved_recipe_params
    params.permit(:recipe_id, :user_id)
  end
end
