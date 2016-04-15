module SubscriptionsHelper

  def get_subscription(requestor,receiver)
    subscription = requestor.initiated_subscribe_requests.where("subscription_receiver_id = #{subscribed.id}")
    subscription[0]
  end  

  def get_all_subscriptions(requestor)
    subscriptions = requestor.initiated_subscribe_requests
  end  

end
