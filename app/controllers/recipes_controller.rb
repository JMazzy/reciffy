class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
    @user_recipes = current_user.recipes
    respond_to do |format|
      format.html
      format.json { render json: @recipes.as_json }
    end
  end

  def new
    @recipe  = current_user.recipes.build
    @recipe.recipe_ingredients.build
    @tag = @recipe.tags.build
  end

  def create

    @recipe = current_user.recipes.build(recipe_params)

    if @recipe.save

      if !!params[:recipe] && !!params[:recipe][:tag]
        tag = Tag.find_or_create_by( name: params[:recipe][:tag][:name].downcase)
        @recipe.taggings.create( tag_id: tag.id )
      end

      if params[:recipe][:photo]
        photo_uploads = params[:recipe][:photo][:photos]
        if photo_uploads && photo_uploads.length > 0
          photo_uploads.each do |photo|
            @recipe.photos.create(photo: photo)
          end
        end
      end


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
    @rating = Rating.find_by(user_id: current_user.id, recipe_id: params[:id]) || Rating.new

    respond_to do |format|

      format.html
      format.json { render json: @recipe.as_json }

    end
  end

  def edit
    @recipe  = Recipe.includes(:recipe_ingredients).find(params[:id])
    @tag = @recipe.tags.build
  end

  def update
    @recipe  = Recipe.find(params[:id])

    if !!params[:recipe] && !!params[:recipe][:tag]
      tag = Tag.find_or_create_by( name: params[:recipe][:tag][:name].downcase)
      @recipe.taggings.build( tag_id: tag.id )
    end

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
      :recipe_ingredients_attributes => [
        :recipe_id,
        :ingredient_id,
        :unit_id,
        :quantity ],
      :photo_attributes => [:photo],
      :tag_attributes => [:name]
    )

  end

end
