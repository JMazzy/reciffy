Rails.application.routes.draw do
  devise_for :users

  resources :recipes do
    resources :comments
  end

  resources :users do
    resource :profile, only: [:new, :create, :show, :edit, :update]
    resources :saved_recipes, only: [:create, :destroy]
    resources :made_recipes, only: [:create, :destroy]
  end

  resources :tags, only: [:index, :show, :create, :destroy]

  resources :static_pages, only: [:index]
  resources :photos
  resources :subscriptions
  

  root to: "static_pages#index"
end
