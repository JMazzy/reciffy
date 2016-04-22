class MadeRecipesController < ApplicationController

  def index
    @made_recipes = current_user.made_recipes
    @made_recipes_json = made_recipes_index_json(@made_recipes)
    respond_to do |format|
      format.json { render json: @made_recipes_json.to_json}
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
        format.json { render json: @made_recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @made_recipe = MadeRecipe.find_by_id(params[:id])
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
    params.require(:made_recipe).permit(
      :recipe_id,
      :user_id)
  end

  def made_recipes_index_json(made_recipes)

    arr = []

    made_recipes.each do |made_recipe|
      json_response = {}
      made_recipe_json = made_recipe.as_json

      made_recipe_json.each do |key,value|
        json_response[key] = made_recipe_json[key]
      end

      json_response["recipe"]                = made_recipe.recipe.as_json
      json_response["original_user"]         = made_recipe.original_user.as_json,
      json_response["subscriptions"]         =  made_recipe.subscriptions.as_json,
      json_response["recipes_by_original_user"] = made_recipe.recipes_by_original_user.as_json,
      json_response["recipe"]["photo_url"]   =  made_recipe.photos[0].photo.url(:thumb).gsub(/\?.*/,"")

      arr.push(json_response)

    end

    return arr
  end


end
