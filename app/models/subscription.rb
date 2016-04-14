class Subscription < ActiveRecord::Base
  belongs_to :subscription_requestor, 
             :foreign_key => :subscriber_id,
             :class_name => "User"

  belongs_to :subscription_receiver,  
             :foreign_key => :subscribed_id,
             :class_name => "User"

  validates :subscriber_id, 
            :uniqueness => { :scope => :subscribed_id }

end
