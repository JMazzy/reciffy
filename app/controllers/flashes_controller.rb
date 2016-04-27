class FlashesController < ApplicationController

  def index

    @flash = flash.map do |k,v|
      if k == 'notice'
        key = 'success'
      elsif k == 'alert'
        key = 'danger'
      else
        key = k
      end

      { key: key, message: v }
    end

    respond_to do |format|
      format.json { render json: @flash.to_json }
    end

    flash.discard
    flash.clear
    flash.each do |k,v|
      flash.delete(k)
    end

  end

end
