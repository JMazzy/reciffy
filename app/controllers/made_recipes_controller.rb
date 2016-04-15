class MadeRecipesController < ApplicationController


  def index
    @made_recipes = current_user.made_recipes
    respond_to do |format|
      format.html {redirect_to request.referrer)}
      format.json {render :json => @made_recipes}
    end 
  end

  def create
    @made_recipe = current_user.made_recipes.build(made_recipe_params)
    respond_to do |format|
      if @made_recipe.save
        format.html { redirect_to request.referrer }
        format.json { render json: @made_recipe.to_json() }
      else
        format.html { redirect_to request.referrer }
        format.json { render json: render json: @made_recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @made_recipe = MadeRecipe.find_by(user_id: params[:user_id], recipe_id: params[:id])
    respond_to do |format|
      if @made_recipe.destroy
        format.html { redirect_to request.referrer }
        format.json { head :no_content }
      else
        format.html { redirect_to request.referrer }
        format.json { head :no_content }
      end
    end
  end

  private

  def made_recipe_params
    params.permit(
      :recipe_id,
      :user_id)
  end 
end
