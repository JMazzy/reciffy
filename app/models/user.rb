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

  after_create :create_profile

  # private
  #
  # def create_profile
  #   p self
  #self.create_profile
  #   Profile.create(user_id: self.id)
  #   # self.create_profile!
  #   # newProfile.save
  #   # p self.profile
  # end

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
end
