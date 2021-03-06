class Subscription < ActiveRecord::Base

  belongs_to :subscription_requestor,
             :foreign_key => :subscriber_id,
             :class_name => "User"

  has_one :profile, through: :subscription_receiver

  belongs_to :subscription_receiver,
             :foreign_key => :subscribed_id,
             :class_name => "User"


  has_many :recipes_by_receivers,       through: :subscription_receiver, source: :recipes
  has_many :made_recipes_by_receivers,  through: :subscription_receiver, source: :made_recipes
  has_many :subscriptions_by_receivers, through: :subscription_receiver, source: :initiated_subscribe_requests

  validates :subscriber_id,
            :uniqueness => { :scope => :subscribed_id }

  validate :subscription_users_exist

  def subscription_users_exist
    return false if (User.find(self.subscribed_id).nil? ||
                     User.find(self.subscriber_id).nil?)
  end
  
end
