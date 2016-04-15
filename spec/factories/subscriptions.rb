FactoryGirl.define do
 
  factory :subscription do
    subscriber_id :user
    subscribed_id :user
  end
end
