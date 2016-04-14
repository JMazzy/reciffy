FactoryGirl.define do
  factory :comment do
    comment_description "This is my comment"
    user_id 1
    recipe_id 1
  end
end
