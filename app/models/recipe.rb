class Recipe < ActiveRecord::Base

  belongs_to :user
  has_one :profile, through: :user
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  has_many :units, through: :recipe_ingredients

  has_many :photos, dependent: :destroy
  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :comments, dependent: :destroy
  has_many :made_recipes, dependent: :destroy
  has_many :saved_recipes, dependent: :destroy

  has_many :ratings, dependent: :destroy
  has_many :users_rated, through: :ratings,
                         source: :users

  has_many  :forked_recipes, class_name: "Recipe", foreign_key: "original_id"
  belongs_to :original_recipe, class_name: "Recipe"

  accepts_nested_attributes_for :recipe_ingredients,
	  :allow_destroy => true,
    :reject_if     => :all_blank

  accepts_nested_attributes_for :photos, reject_if: :all_blank, allow_destroy: true

  validates :name, :description, :instructions, :prep_time, :cook_time, presence: true

  def self.get_tagged_recipes(tags)
    tagged_recipes = Recipe.select("recipes.*")
      .joins("JOIN taggings AS ta ON recipes.id = ta.taggable_id and ta.taggable_type = 'Recipe'")
      .joins("JOIN tags ON ta.tag_id = tags.id").where("tags.name IN (?)", tags)
    tagged_recipes
  end

  def self.get_top_recipes(n = 10)
    top_recipes = Recipe.includes(:ratings, :made_recipes)
    .group("recipes.id")
    .average("COALESCE(ratings.rating, 0)")
    .sort_by { |id, avg_rating| -avg_rating }

    top_recipe_list = []

    top_recipes.each_with_index do |val, index|
      top_recipe_list.push(Recipe.find_by_id(val[0]))
      break if index >= n
    end

    return top_recipe_list
  end


  def self.get_trending_recipes(user,n = 10)
    puts "Finds all user tags and gets recipes for that tag"
    puts "Recipes include average highest ratings for ratings in past 7 days"
    
    # What happens when no tags are created for the user?
    #   >> user all tags?

    tags = user.profile.get_user_tags
    recipes = Recipe.get_tagged_recipes(tags)
      .includes(:ratings, :made_recipes, :forked_recipes)
      .where(
        "ratings.created_at >= :start OR made_recipes.created_at >= :start OR recipes.created_at >= :start", 
         :start => 1.week.ago.to_date)
      .group("recipes.id")
      .order('recipes.id asc').count('recipes.id')
    
    #puts "XXXXXXXXXXX"
    #puts "#{recipes}"
    trending_recipe_list = []

    recipes.each_with_index do |val, index|
      trending_recipe_list.push(Recipe.find_by_id(val[0]))
      break if index >= n
    end

    puts "Got here #{trending_recipe_list}"

    return trending_recipe_list
  end

end
