class TagsController < ApplicationController

  def index
    @tags = Tag.all.includes(:taggings)
    respond_to do |format|
      format.html
      format.json { render json: @tags.to_json(include: :taggings) }
    end
  end


  def show
    @tag = Tag.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @tag.to_json(include: :taggings) }
    end
  end


  def create
    respond_to do |format|
      if @tag = Tag.find_by_name( params[:name] )
        @tagging = @tag.taggings.create( tag_id: @tag.id, taggable_id: params[:taggable_id], taggable_type: params[:taggable_type])
        
        format.json { render json: { tag: @tag.as_json(include: :taggings), tagging: @tagging.as_json } }
      else
        @tag = Tag.new( name: params[:name] )
        if @tag.save
          @tagging = @tag.taggings.create( tag_id: @tag.id, taggable_id: params[:taggable_id], taggable_type: params[:taggable_type])

          format.json { render json: { tag: @tag.as_json(include: :taggings), tagging: @tagging.as_json } }

          flash[:success] = "Tag created!"
        else
          format.json { render json: @tag.errors, status: :unprocessable_entity }
          flash[:danger] = "Tag could not be created."
        end
      end

      format.html { render nothing: true }
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tagging = Tagging.find_by(tag_id: @tag.id, taggable_id: params[:taggable_id], taggable_type: params[:taggable_type])

    respond_to do |format|
      if @tagging.destroy
        format.html { render nothing: true }

        format.json { render json: { tag: @tag.as_json(include: :taggings), tagging: @tagging.as_json } }

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
