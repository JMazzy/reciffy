FactoryGirl.define do
  factory :made_recipe do
    user_id 1
    sequence(:recipe_id){ |n| n }
  end
end
