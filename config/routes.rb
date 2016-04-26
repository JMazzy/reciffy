Rails.application.routes.draw do
  devise_for :users

  scope :api do
    scope :v1 do
      resources :recipes do
        resources :comments
      end
      get '/top_recipes', to: 'recipes#top'
      get '/trending_recipes', to: 'recipes#trending'

      get '/top_users', to: 'users#top'
      get '/top_cooks', to: 'users#top_cooks'

      get '/best_cooks', to: 'users#best_cooks'

      resources :users
      resources :profiles, only: [:new, :create, :show, :edit, :update]

      resources :tags, only: [:index, :show, :create, :destroy]
      resources :taggings, only: [:index, :create, :destroy]

      resources :photos
      resources :subscriptions
      resources :saved_recipes, only: [:index, :create, :destroy]
      resources :ratings, only: [:index, :create, :update]
      resources :made_recipes, only: [:create, :index, :destroy]
      resources :recipe_ingredients
      resources :ingredients, only: [:index, :show]
      resources :units, only: [:index, :show]
      resources :recommendations, only: [:index]
      resources :recent_recipes, only: [:index]
    end
  end

  resources :static_pages, only: [:index]
  root to: "static_pages#index"
end
