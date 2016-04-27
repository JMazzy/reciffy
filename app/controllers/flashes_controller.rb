class FlashesController < ApplicationController

  def index
    @flashes = flash

    respond_to do |format|
      format.json { render json: @flashes }
    end

    flash.discard
  end

end
