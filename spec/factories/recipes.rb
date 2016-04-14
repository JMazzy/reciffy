FactoryGirl.define do
  factory :recipe do
    name "MyString"
    description "MyText"
    prep_time 1
    cook_time 1
    user_id 1
  end
end
