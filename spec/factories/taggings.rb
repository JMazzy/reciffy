FactoryGirl.define do
  factory :tagging do
    sequence(:tag_id) { |n| n }
    sequence(:taggable_id) { |n| n }
    taggable_type "Recipe"
  end
end
