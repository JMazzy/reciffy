FactoryGirl.define do
  factory :rating do
    rating 3
    #sequence(:user_id){ |n| n }
    user
    recipe
  end
end
