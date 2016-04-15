class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  end

  def new
    @recipe  = current_user.recipes.build
    @recipe.recipe_ingredients.build
    @tag = @recipe.tags.build
  end

  def create

    @recipe = current_user.recipes.build(recipe_params)

    @ri = @recipe.recipe_ingredients.build
    @ri.ingredient_id = params["recipe"]["recipe_ingredient"]["ingredient_id"]
    @ri.unit_id = params["recipe"]["recipe_ingredient"]["unit_id"]
    @ri.quantity = params["recipe"]["recipe_ingredient"]["quantity"]
    tag = Tag.find_or_create_by( name: params[:recipe][:tag][:name].downcase)

    if @recipe.save

      @recipe.taggings.create( tag_id: tag.id )

      flash[:success] = "Recipe was saved!"

      respond_to do |format|

        format.html {redirect_to recipe_path(@recipe)}

        format.js {render :none}
      end
    else
      respond_to do |format|

        format.html {
          flash[:alert] = "Recipe not saved!"
          redirect_to new_recipe_path
        }

      end
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    @comment = Comment.new
  end

  def edit
    @recipe  = Recipe.includes(:recipe_ingredients).find(params[:id])
    @tag = @recipe.tags.build
  end

  def update
    @recipe  = Recipe.find(params[:id])
    tag = Tag.find_or_create_by( name: params[:recipe][:tag][:name].downcase)
    @recipe.taggings.build( tag_id: tag.id )
    if @recipe.update(recipe_params)
        flash[:success] = "#{@recipe.name} was updated successfully!"
    else
      flash[:alert] = "Your update was NOT successfull!"
    end
    redirect_to recipe_path(@recipe)
  end

  def destroy
    if @recipe = Recipe.find_by_id(params[:id])

      if @recipe.destroy
        flash[:success] = "Recipe Deleted"
      else
        flash[:alert] = "Could not delete recipe!"
      end

      redirect_to :back
    else
      flash[:alert] = "Invalid recipe removal! - Unauthorized?"
      redirect_to :nack
    end
  end

  private

  def recipe_params

    params.require(:recipe).permit(
      :user_id,
      :name,
      :description,
      :instructions,
      :cook_time,
      :prep_time,
      { :recipe_ingredients_attributes => [
        :recipe_id,
        :ingredient_id,
        :unit_id,
        :quantity ] }
    )

  end

end
