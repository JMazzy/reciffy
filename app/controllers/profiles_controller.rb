class ProfilesController < ApplicationController

  def new
    @profile = Profile.new
  end

  def create
    @profile = Profile.new(profile_params)
    @profile.user_id = current_user.id
    if @profile.save
      flash[:success] = 'Profile created'
      redirect_to profile_path(@profile)
    else
      flash.now[:error] = 'Profile failed to create'
      render 'new'
    end
  end

  def show
    @profile = Profile.find( params[:user_id] )
    respond_to do |format|
      format.html
      format.json { render json: @profile.as_json(include: :tags) }
    end
  end

  def edit
    @profile = current_user.profile
    @tag = current_user.profile.tags.build
  end

  def update
    @profile = current_user.profile
    p params

    if !!params[:profile] && !!params[:profile][:tag]
      tag = Tag.find_or_create_by( name: params[:profile][:tag][:name].downcase)
      @profile.taggings.build( tag_id: tag.id )
    end

    if params[:profile][:avatar]
      p 'decoding image'
      decode_image
    end

    respond_to do |format|
      if @profile.update( profile_params )
        format.json { render json: @profile.as_json }
      else
        format.json { render json: @profile.as_json }
      end
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
                                      :avatar)
  end

  def decode_image
    # decode base64 string
    Rails.logger.info 'decoding now'
    decoded_data = Base64.decode64(params[:profile][:avatar]) # json parameter set in directive scope
    # create 'file' understandable by Paperclip
    data = StringIO.new(decoded_data)
    data.class_eval do
      attr_accessor :content_type, :original_filename
    end

    # set file properties
    data.content_type = 'image/jpeg' # params[:imageContent] # json parameter set in directive scope
    data.original_filename = 'avatar.jpeg' # params[:imagePath] # json parameter set in directive scope

    params[:profile][:avatar] = data
    p data
  end
end
