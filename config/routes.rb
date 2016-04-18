Rails.application.routes.draw do
  devise_for :users

  Rails.application.routes.draw do
    mount_ember_app :frontend, to: "/", controller: "static_pages"
  end

  resources :recipes do
    resources :comments
    resources :ratings, only: [:create, :update]
  end

  resources :users do
    resource :profile, only: [:new, :create, :show, :edit, :update]
    resources :saved_recipes, only: [:create, :destroy]
  end
  resources :made_recipes, only: [:create, :index, :destroy]
  resources :tags, only: [:index, :show, :create]
  resources :taggings, only: [:create, :destroy]

  resources :static_pages, only: [:index]
  resources :photos
  resources :subscriptions
  resources :recipe_ingredients
  resources :ingredients, only: [:index, :show]
  resources :units, only: [:index, :show]

  root to: "static_pages#index"
end
