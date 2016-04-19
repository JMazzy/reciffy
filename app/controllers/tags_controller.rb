class TagsController < ApplicationController

  def index
    @tags = Tag.all
    respond_to do |format|
      format.html
      format.json { render json: @tags.to_json }
    end
  end


  def show
    @tag = Tag.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @tag.to_json }
    end
  end


  def create
    if @tag = Tag.find_by_name( params[:tag][:name] )
      render nothing: true
    else
      @tag = Tag.new( tag_params )

      respond_to do |format|
        if @tag.save
          format.html { render nothing: true }
          format.json { render json: @tag.to_json }
          flash[:success] = "Tag created!"
        else
          format.html { render nothing: true }
          format.json { render json: @tag.errors, status: :unprocessable_entity }
          flash[:danger] = "Tag could not be created."
        end
      end
    end

    @tag.taggings.create( tag_id: @tag.id, taggable_id: params[:taggable_id], taggable_type: params[:taggable_type])
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tagging = Tagging.find_by(tag_id: @tag.id, taggable_id: params[:taggable_id], taggable_type: params[:taggable_type])
    respond_to do |format|
      if @tagging.destroy
        format.html { render nothing: true }
        format.json { render json: @tag.to_json }
        flash[:success] = "Tag destroyed!"
      else
        format.html { render nothing: true }
        format.json { render json: @tag.errors, status: :unprocessable_entity }
        flash[:danger] = "Tag could not be destroyed."
      end
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
