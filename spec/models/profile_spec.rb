require 'rails_helper'

describe Profile do
  let(:user){ build(:user, id: 1) }
  let(:profile){ build(:profile) }

  it 'is valid with default attributes' do
    expect(profile).to be_valid
  end

  it 'is valid with null attributes' do
    new_profile = build(:profile, bio: null, tagline: null, first_name: null, last_name: null, city: null, state: null)
    expect(new_profile).to be_valid
  end
end