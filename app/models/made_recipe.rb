class MadeRecipe < ActiveRecord::Base
	belongs_to :user
	belongs_to :recipe
    has_one :profile, through: :user
    has_one :original_user, through: :recipe, source: :user 
    has_one :original_user_profile, through: :recipe, source: :profile

    has_many :subscriptions, through: :user
    has_many :recipes_by_original_user, through: :user, source: :recipes

	validates :user_id, 
	          :uniqueness => { :scope => :recipe_id }

	validates :recipe_id, uniqueness: { scope: :user_id }
	validates :recipe_id, :user_id, presence: true

	validate :recipe_user_exist

	def self.get_most_made_recipes
	  most_made_recipes = MadeRecipe.select("r.name, r.id, COUNT(*) AS made_totals")
	    .joins("JOIN recipes AS r ON made_recipes.recipe_id = r.id")
	    .order("made_totals DESC").group("r.id, r.name")
	  most_made_recipes.as_json  
	end

	def self.get_top_users_who_made_recipes
	  top_users = MadeRecipe.select("u.email, u.id, p.last_name, p.first_name, COUNT(*) AS recipe_count")
	    .joins("JOIN users AS u ON made_recipes.user_id = u.id")
	    .joins("JOIN profiles AS p ON p.user_id = u.id")
	    .order("recipe_count DESC").group("u.id, u.email, p.last_name, p.first_name")
	    top_users.as_json
	end 

	def self.get_users_whose_recipes_are_made_most
	  cooks = MadeRecipe.select("u.email, u.id, COUNT(*) AS made_totals")
	    .joins("JOIN recipes AS r ON made_recipes.recipe_id = r.id")
	    .joins("JOIN users AS u ON r.user_id = u.id")
	    .order("made_totals DESC").group("u.id, u.email")
	  cooks.as_json  
    end 

  def recipe_user_exist
    return false if (User.find(self.user_id).nil? ||
                     Recipe.find(self.recipe_id).nil?)
  end
end
