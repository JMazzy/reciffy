class UnitsController < ApplicationController
  def index
    @units = Unit.all
    respond_to do |format|
      format.json { render json: @units.as_json }
    end
  end


  def show
    @unit = Unit.find(params[:id])
    respond_to do |format|
      format.json { render json: @unit.as_json }
    end
  end
end
