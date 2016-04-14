class ProfilesController < ApplicationController

  def new
    @profile = Profile.new
  end

  def create
    @profile = Profile.new(profile_params)
    @profile.user_id = current_user.id
    if @profile.save
      flash[:success] = 'Profile created'
      redirect_to user_profile_path(@profile)
    else
      flash.now[:error] = 'Profile failed to create'
      render 'new'
    end
  end

  def show
    @profile = Profile.find(params[:user_id])
  end

  def edit
    @profile = Profile.find(params[:user_id])
  end 

  def update
    @profile = Profile.find(params[:user_id])
    if @profile.update(profile_params)
      flash[:success] = 'Profile updated'
      redirect_to user_profile_path(@profile)
    else
      flash.now[:error] = 'Profile failed to update'
      render 'edit'
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:bio, :tagline, :first_name, :last_name, :city, :state)
  end
end
