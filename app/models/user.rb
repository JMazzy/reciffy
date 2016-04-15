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
           :foreign_key => :subsriber_id,
           :class_name => "Subscription"

  has_many :subscriptions,
           :through => :initiated_subscribe_requests,
           :source => :subscription_receiver


  # When acting as the recipient of the subscription
  has_many :received_subscription_requests,
           :foreign_key => :subscribed_id,
           :class_name => "Subscription"

  has_many :users_subscribed_by,
           :through => :received_subscribe_requests,
           :source => :subscriberequestor


  has_many :made_recipes
  has_many :recipes_made, through: :made_recipes,
                          source: :recipe
                          
  has_many :saved_recipes
  has_many :recipes_saved, through: :saved_recipes,
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

  def get_user_subscriptions
    User.subscriptions.as_json
  end
end
