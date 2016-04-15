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
    @profile = Profile.find( params[:user_id] )
  end

  def edit
    @profile = current_user.profile
    @tag = current_user.profile.tags.build
  end

  def update
    @profile = current_user.profile

    if !!params[:profile] && !!params[:profile][:tag]
      tag = Tag.find_or_create_by( name: params[:profile][:tag][:name].downcase)
      @profile.taggings.build( tag_id: tag.id )
    end

    if @profile.update( profile_params )
      flash[:success] = 'Profile updated'
      redirect_to user_profile_path(@profile)
    else
      flash.now[:error] = 'Profile failed to update'
      render 'edit'
    end
  end

  private

  def profile_params
    params.require(:profile).permit(  :bio,
                                      :tagline,
                                      :first_name,
                                      :last_name,
                                      :city,
                                      :state,
                                      :avatar )
  end
end
