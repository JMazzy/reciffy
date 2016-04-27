class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :discard_flash, :unless => :devise_controller?
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    root_path + "#/recipes/all"
  end

  private

  def discard_flash
    flash.discard
  end
end
