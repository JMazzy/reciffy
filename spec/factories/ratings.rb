FactoryGirl.define do
  factory :rating do
    rating 3
    sequence(:user_id){ |n| n }
    recipe_id 1
  end
end
