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

end
