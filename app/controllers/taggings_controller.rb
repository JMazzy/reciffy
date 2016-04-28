class TaggingsController < ApplicationController
  before_action :require_taggable_current_user, except: [:index]

  def index
    @taggings = Tagging.all.where(taggable_type: "Recipe").includes(:tag)
    respond_to do |format|
      format.html { render nothing: true }
      format.json { render json: @taggings.to_json( include: :tag )}
    end
  end

  def create
    @tagging = Tagging.new( tagging_params )
    set_parent
    p 'Taggable created by:'
    p @parent.user
    p 'Current user:'
    p current_user
    respond_to do |format|
      if @parent.user == current_user
        if @tagging.save
          format.html { render nothing: true }
          format.json { render json: @tagging.to_json }
          flash[:success] = "#{params[:taggable_type.capitalize]} tagged!"
        else
          format.html { render nothing: true }
          format.json { render json: @tagging.errors, status: :unprocessable_entity }
          flash[:danger] = "Sorry, your tagging didn't get through"
        end
      else
        flash.now[:error] = "Can't create tags for other users!"
      end
    end
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    set_parent
    p 'Taggable created by:'
    p @parent.user
    p 'Current user:'
    p current_user
    respond_to do |format|
      if @parent.user == current_user
        if @tagging.destroy
          format.html { render nothing: true }
          format.json { render json: @tagging.to_json }
          flash[:success] = "#{params[:taggable_type].capitalize} untagged!"
        else
          format.html { render nothing: true }
          format.json { render json: @tagging.errors, status: :unprocessable_entity }
          flash[:danger] = "Tagging could not be destroyed."
        end
      else
        flash.now[:error] = "Can't delete other users' tags!"
      end
    end
  end

  private

  def tagging_params
    params.require(:tagging).permit(:tag_id, :taggable_id, :taggable_type)
  end

  def extract_taggable
    @tagging.taggable_type.constantize
  end

  def require_taggable_current_user
    @tagging = Tagging.find(params[:id])
    set_parent
    p 'Taggable created by:'
    p @parent.user
    p 'Current user:'
    p current_user
    unless @parent.user == current_user
      flash.now[:error] = "Can't delete other users' tags!"
    end
  end

  def set_parent
    @parent = extract_taggable.find(params[:taggable_id])
  end
end
