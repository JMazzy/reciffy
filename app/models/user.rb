class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :recipes
  has_many :comments

  has_one :profile, dependent: :destroy

  # When acting as the initiator of the subsription
  has_many :initiated_subscribe_requests,
           :foreign_key => :subscriber_id,
           :class_name => "Subscription"

  has_many :subscriptions,
           :through => :initiated_subscribe_requests,
           :source => :subscription_receiver


  # When acting as the recipient of the subscription
  has_many :received_subscription_requests,
           :foreign_key => :subscribed_id,
           :class_name => "Subscription"

  has_many :users_subscribed_by,
           :through => :received_subscription_requests,
           :source => :subscribe_requestor


  has_many :made_recipes
  has_many :recipes_made, through: :made_recipes,
                          source: :recipe

  has_many :saved_recipes
  has_many :recipes_saved, through: :saved_recipes,
                           source: :recipe

  has_many :ratings
  has_many :rated_recipes, through: :ratings,
                           source: :recipe

  after_create :create_new_profile

  private

  def create_new_profile
    new_profile = self.build_profile
    new_profile.first_name = "First Name"
    new_profile.last_name = "Last Name"
    new_profile.bio = "Short Bio"
    new_profile.tagline = "Me in 1 sentence"
    new_profile.city = "City"
    new_profile.state = "State"
    new_profile.avatar = File.new("#{Rails.root}/public/images/avatar.jpeg")
    new_profile.save
  end

  def get_all_user_subscriptions
    self.subscriptions.as_json
  end

  def get_user_initiated_subscribe_requests
    self.initiated_subscribe_requests.as_json
  end

  def get_user_received_subscribe_requests
    self.received_subscription_requests.as_json
  end

  def get_user_subscription_count
    self.subscriptions.count
  end

  def get_user_made_recipes
    self.made_recipes.as_json
  end

  def get_user_made_recipes
    self.made_recipes.as_json
  end

  def get_user_made_recipes_count
    self.made_recipes.count.as_json
  end

  def self.get_tagged_users(tags)
    tagged_users = User.select("p.first_name, p.last_name, users.id AS user_id, tags.name")
      .joins("JOIN taggings AS ta ON users.id = ta.taggable_id and ta.taggable_type = 'User'")
      .joins("JOIN profiles AS p ON users.id = p.user_id")
      .joins("JOIN tags ON ta.tag_id = tags.id").where("tags.name IN (?)", tags)
      .group("tags.name,users.id,p.first_name,p.last_name")
      .order("tags.name")
    tagged_users.as_json
  end

  def self.get_top_users(n = 10)
    top_users = Subscription.select("subscribed_id")
                .group("subscribed_id")
                .order("count_subscribed_id DESC")
                .count("subscribed_id")

    top_users_list = []

    top_users.each_with_index do |val, index|
      top_users_list.push(User.find_by_id(val[0]))
      break if index >= n
    end

    return top_users_list
  end 

  def self.get_top_users_who_cook(n = 10)
    users = MadeRecipe.select("user_id")
            .group("user_id")
            .order("count_user_id DESC")
            .count("user_id")

    users_list = []

    users.each_with_index do |val, index|
      users_list.push(User.find_by_id(val[0]))
      break if index >= n
    end

    return users_list
  end 


  def self.get_best_cooks(n = 10)
    users = Recipe.select("user_id")
            .joins("JOIN ratings AS r ON r.recipe_id = recipes.id")
            .group("recipes.user_id")
            .order("average_coalesce_r_rating_0 DESC")
            .average("COALESCE(r.rating, 0)")
    users_list = []

    users.each_with_index do |val, index|
      users_list.push(User.find_by_id(val[0]))
      break if index >= n
    end

    return users_list
  end 

end
