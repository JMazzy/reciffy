Rails.application.routes.draw do
  devise_for :users

  resources :users do
    resource :profile, only: [:new, :create, :show, :edit, :update]
  end

  resources :static_pages, only: [:index]

  root to: "static_pages#index"
end
