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

  accepts_nested_attributes_for :recipe_ingredients,
	  :allow_destroy => true,
    :reject_if     => :all_blank

  accepts_nested_attributes_for :photos, reject_if: :all_blank, allow_destroy: true

  validates :name, :description, :instructions, :prep_time, :cook_time, presence: true

  def self.get_tagged_recipes(tags)
    tagged_recipes = Recipe.select("recipes.name AS recipe_name, recipes.id AS recipe_id, tags.name")
      .joins("JOIN taggings AS ta ON recipes.id = ta.taggable_id and ta.taggable_type = 'Recipe'")
      .joins("JOIN tags ON ta.tag_id = tags.id").where("tags.name IN (?)", tags)
      .group("tags.name,recipes.id,recipes.name").order("tags.name")
    tagged_recipes.json
  end

  def self.get_top_recipes(n = 10)
    top_recipes = Recipe.includes(:ratings)
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

  def self.tags_personal_highest_rated(rater_id)
    top_ten = User.find(rater_id).ratings.joins("JOIN recipes ON (recipe_id = recipes.id)").order("ratings.rating DESC").where("ratings.rating > 3").limit(10)

    tags = top_ten.joins("JOIN taggings ON (taggable_id = recipes.id)").where("taggable_type = 'Recipe'").joins("JOIN tags on (tag_id = tags.id)").select("tags.*")

    recipes = tags.joins("JOIN recipes ON (recipe_id = recipes.id)").select("recipe_id").limit(10)

    recipes.map{ |s| s.id }.uniq
  end

  def self.get_subscribed_recipes(subscriber_id)
    subscribed_recipes = Recipe.all.joins('JOIN subscriptions ON (subscribed_id = user_id)').where("subscriber_id = #{subscriber_id}").order("recipes.created_at DESC").select("id").limit(10)

    subscribed_recipes.map{ |s| s.id }.uniq
  end

end
