FactoryGirl.define do
  factory :profile do
    bio "MyBio Text"
    tagline "MyTagline"
    first_name "FirstName"
    last_name "LastName"
    city "City"
    state "State"
    sequence(:user_id){ |n| n } 
  end
end
