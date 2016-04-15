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
    @tag = Tag.new( tag_params )
    respond_to do |format|
      if @tag.save
        format.html { render nothing: true }
        format.json { render json: @tag.to_json }
      else
        format.html { render nothing: true }
        format.json { render json: @tag.errors, status: :unprocessable_entity }
      end
    end
  end


  def destroy
    @tag = Tag.find(params[:id])
    respond_to do |format|
      if @tag.destroy
        format.html { render nothing: true }
        format.json { render json: @tag.to_json }
      else
        format.html { render nothing: true }
        format.json { render json: @tag.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
