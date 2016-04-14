class CommentsController < ApplicationController
  before_action :set_current_recipe

  def index
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.recipe_id = @recipe.id
    @comment.user_id = current_user.id
    if @comment.save
      flash[:success] = 'Comment created'
      redirect_to recipe_path(@recipe)
    else
      flash[:error] = 'Comment failed to create'
      redirect_to request_referrer
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      flash[:success] = 'Comment deleted'
      redirect_to recipe_path(@recipe)
    else
      flash[:error] = 'Comment failed to delete'
      redirect_to recipe_path(@recipe)
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:comment_description)
  end

  def set_current_recipe
    @recipe = Recipe.find(params[:recipe_id])
  end
end
