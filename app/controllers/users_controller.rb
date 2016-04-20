class UsersController < ApplicationController
  def index
    @users = []
    User.all.each do |user|
      @users.push(show_user_json(user))
    end

    respond_to do |format|
      format.json { render json: @users }
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.json { render json: show_user_json(@user) }
    end
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.json { render json: @user.to_json( include: [
          :recipes,
          profile: { include: :tags } ] ) }
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

  def show_user_json(user)
    options ||= {}
    json_response = {}
    user_json = user.as_json

    user_json.each do |key, value|
      json_response[key] = value
    end

    json_response["profile"] = user.profile.as_json

    photo_json = {}
    photo_json["url"] = {}
    photo_json["url"]["large"] = user.profile.avatar.url(:large).gsub(/\?.*/,"")
    photo_json["url"]["medium"] = user.profile.avatar.url(:medium).gsub(/\?.*/,"")
    photo_json["url"]["original"] = user.profile.avatar.url(:original).gsub(/\?.*/,"")
    photo_json["url"]["thumb"] = user.profile.avatar.url(:thumb).gsub(/\?.*/,"")
    json_response["photo"] = photo_json

    json_response["made_recipes"] = []

    user.made_recipes.each do |made_recipe|
      json_response["made_recipes"].push(made_recipe.as_json)
    end

    json_response["ratings"] =[]

    user.ratings.each do |rating|
      json_response["ratings"].push(rating.as_json)
    end

    return json_response.as_json
  end
end
