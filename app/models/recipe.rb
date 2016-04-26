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
  has_many :commenters, through: :comments,
                        source: :author,
                        foreign_key: :user_id,
                        class_name: "User"
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

  after_create :create_activity

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

    tags = user.profile.get_user_tags

    recipes = Recipe.get_tagged_recipes(tags)
      .includes(:ratings, :made_recipes, :forked_recipes)
      .where(
        "ratings.created_at >= :start OR made_recipes.created_at >= :start OR recipes.created_at >= :start",
         :start => 1.week.ago.to_date)
      .group("recipes.id")
      .order('recipes.id asc').count('recipes.id')

    trending_recipe_list = []

    recipes.each_with_index do |val, index|
      trending_recipe_list.push(Recipe.find_by_id(val[0]))
      break if index >= n
    end

    return trending_recipe_list
  end

  def self.all_with_all_includes
    Recipe.all.includes(
      :recipe_ingredients,
      :ingredients,
      :units,
      :comments,
      :tags,
      :user,
      :profile,
      :photos,
      :ratings )
  end

  def self.get_recent_recipes(n=10)
    recipe_list = Recipe.all_with_all_includes
    recipe_list.order(created_at: :desc).limit(n)
  end

  def self.personal_top_ten(rater_id)
    # Top Ten personally highest rated recipes with rating > 3
    User.find(rater_id).ratings.joins("JOIN recipes ON (recipe_id = recipes.id)").order("ratings.rating DESC").where("ratings.rating > 3").select("recipes.*").limit(10)
  end

  def self.top_tag_ids(user_id)
    top_ten = Recipe.personal_top_ten(user_id)

    # All tags associated with those recipes
    top_ten.joins("JOIN taggings ON (taggable_id = recipes.id)").where("taggable_type = 'Recipe'").joins("JOIN tags on (tag_id = tags.id)").select("tags.*")
  end

  def self.rec_by_tag_recipe_ids(user_id)
    tags = Recipe.top_tag_ids(user_id)

    # All other recipes associated with those tags
    recipes = tags.joins("JOIN recipes ON (recipe_id = recipes.id)").select("recipe_id").limit(10)

    recipes.map{ |s| s.id }.uniq
  end

  def self.rec_by_sub_recipe_ids(subscriber_id)
    subscribed_recipes = Recipe.all.joins('JOIN subscriptions ON (subscribed_id = user_id)').where("subscriber_id = #{subscriber_id}").order("recipes.created_at DESC").select("id").limit(10)

    subscribed_recipes.map{ |s| s.id }.uniq
  end

  def self.recommendations(user_id)
    by_tag = Recipe.rec_by_tag_recipe_ids(user_id)
    by_sub = Recipe.rec_by_sub_recipe_ids(user_id)

    Recipe.all_with_all_includes
    .where("id IN (#{(by_tag + by_sub).uniq.shuffle.join(',')})")
  end

  private

    def create_activity
      Activity.create(
      user_id: self.user_id,
      event: "Added a Recipe",
      activable_id: self.id,
      activable_type: "#{self.class}",
      created_at: self.created_at,
      updated_at: self.updated_at
      )
    end

end
