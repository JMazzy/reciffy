FactoryGirl.define do
  factory :tag do
    sequence(:name){ |n| "TaggyTag#{n}" }
  end
end
