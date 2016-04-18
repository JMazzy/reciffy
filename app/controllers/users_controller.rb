class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.json { render json: @user.as_json( include: :profile ) }
    end
  end
end
