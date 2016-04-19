Rails.application.routes.draw do
  devise_for :users

  scope :api do
    scope :v1 do
      resources :recipes do
        resources :comments
      end

      resources :users do
        resource :profile, only: [:new, :create, :show, :edit, :update]
      end

      resources :tags, only: [:index, :show, :create, :destroy]
      resources :taggings, only: [:create, :destroy]

      resources :photos
      resources :subscriptions
      resources :saved_recipes, only: [:index, :create, :destroy]
      resources :ratings, only: [:index, :create, :update]
      resources :made_recipes, only: [:create, :index, :destroy]
      resources :recipe_ingredients
      resources :ingredients, only: [:index, :show]
      resources :units, only: [:index, :show]
    end
  end

  resources :static_pages, only: [:index]
  root to: "static_pages#index"
end
