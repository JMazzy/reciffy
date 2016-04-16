FactoryGirl.define do
  factory :saved_recipe do
    sequence(:user_id){ |n| n }
    sequence(:recipe_id){ |n| n }
  end
end
