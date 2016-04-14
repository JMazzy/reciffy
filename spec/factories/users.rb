FactoryGirl.define do
  factory :user do
    sequence(:email){ |n| "foo#{n}@bar.com" }
    password 'testtest'
    password_confirmation "password"
    confirmed_at Date.today
    profile
  end
end
