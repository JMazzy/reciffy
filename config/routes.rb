Rails.application.routes.draw do
  devise_for :users

  resources :recipes

  resources :users do
    resource :profile, only: [:new, :create, :show, :edit, :update]
  end

  resources :tags, only: [:index, :show, :create, :destroy]

  resources :static_pages, only: [:index]
  resources :photos

  root to: "static_pages#index"
end
