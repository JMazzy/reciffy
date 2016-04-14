FactoryGirl.define do
  factory :user, aliases: [:taggable] do
    sequence(:email) { |n| "user#{n}@example.com" }
    password "password"
    profile
  end
end
