class TaggingsController < ApplicationController

  def index
    @taggings = Tagging.all.where(taggable_type: "Recipe")
    respond_to do |format|
      format.html { render nothing: true }
      format.json { render json: @taggings.to_json( include: :tag )}
    end
  end

  def create
    @tagging = Tagging.new( tagging_params )
    respond_to do |format|
      if @tagging.save
        format.html { render nothing: true }
        format.json { render json: @tagging.to_json }
        flash[:success] = "#{params[:taggable_type.capitalize]} tagged!"
      else
        format.html { render nothing: true }
        format.json { render json: @tagging.errors, status: :unprocessable_entity }
        flash[:danger] = "Sorry, your tagging didn't get through"
      end
    end
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    respond_to do |format|
      if @tagging.destroy
        format.html { render nothing: true }
        format.json { render json: @tagging.to_json }
        flash[:success] = "#{params[:taggable_type].capitalize} untagged!"
      else
        format.html { render nothing: true }
        format.json { render json: @tagging.errors, status: :unprocessable_entity }
        flash[:danger] = "Tagging could not be destroyed."
      end
    end
  end

  private

  def tagging_params
    params.require(:tagging).permit(:tag_id, :taggable_id, :taggable_type)
  end

end
