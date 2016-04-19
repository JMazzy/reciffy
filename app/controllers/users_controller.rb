class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.json { render json: @users.to_json( include: :profile )}
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.json { render json: @user.to_json( include: [:profile, :recipes] ) }
    end
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.json { render json: @user.to_json(include: [:profile, :recipes] ) }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(profile: [
      :first_name,
      :last_name,
      :tagline,
      :bio,
      :city,
      :state
      ])
  end
end
