class UsersController < ApplicationController
  def index
    @users = []
    User.all.each do |user|
      @users.push(show_user_json(user))
    end

    respond_to do |format|
      format.json { render json: @users.to_json }
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
        format.json { render json: show_user_json(@user) }
      end
    end
  end

  def top

    @users = []
    User.get_top_users.each do |user|
      @users.push(show_user_json(user))
    end

    respond_to do |format|
      format.json { render json: @users.to_json }
    end
  end

  def top_cooks

    @users = []
    User.get_top_users_who_cook.each do |user|
      @users.push(show_user_json(user))
    end

    respond_to do |format|
      format.json { render json: @users.to_json }
    end
  end

  def best_cooks

    @users = []
    User.get_best_cooks.each do |user|
      @users.push(show_user_json(user))
    end

    respond_to do |format|
      format.json { render json: @users.to_json }
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
      :state,
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
    json_response["profile"]["tags"] = user.profile.tags.as_json
    json_response['profile']['taggings'] = user.profile.taggings.as_json
    json_response["received_subscription_requests"] = user.received_subscription_requests.as_json

    photo_json = {}
    photo_json["url"] = {}
    photo_json["url"]["large"] = user.profile.avatar.url(:large).gsub(/\?.*/,"")
    photo_json["url"]["medium"] = user.profile.avatar.url(:medium).gsub(/\?.*/,"")
    photo_json["url"]["original"] = user.profile.avatar.url(:original).gsub(/\?.*/,"")
    photo_json["url"]["thumb"] = user.profile.avatar.url(:thumb).gsub(/\?.*/,"")
    json_response["photo"] = photo_json

    json_response["recipes_made"] = []
    json_response["recipes_saved"] = []
    json_response["recipes"] = []

    user.recipes_made.each do |recipe_made|
      json_response["recipes_made"].push(recipe_made.as_json)
    end

    user.recipes_saved.each do |recipe_saved|
      json_response["recipes_saved"].push(recipe_saved.as_json)
    end

    user.recipes.each do |recipe|
      json_response["recipes"].push(recipe.as_json)
    end

    json_response["ratings"] =[]

    user.ratings.each do |rating|
      json_response["ratings"].push(rating.as_json)
    end

    return json_response.as_json
  end
end
