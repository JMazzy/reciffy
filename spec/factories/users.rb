FactoryGirl.define do
  factory :user do
    sequence(:email){ |n| "foo#{n}@bar.com" }
    password 'testtest'
    profile
  end
end
