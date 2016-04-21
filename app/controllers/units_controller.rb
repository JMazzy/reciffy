class UnitsController < ApplicationController
  def index
    @units = Unit.all
    respond_to do |format|
      format.json { render json: @units.to_json }
    end
  end


  def show
    @unit = Unit.find(params[:id])
    respond_to do |format|
      format.json { render json: @unit.to_json }
    end
  end
end
