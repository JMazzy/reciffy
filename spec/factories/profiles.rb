FactoryGirl.define do
  factory :profile do
    bio "MyBio Text"
    tagline "MyTagline"
    first_name "FirstName"
    last_name "LastName"
    city "City"
    state "State"
    user_id 1
  end
end
