require 'rails_helper'

describe Profile do
  before do
    DatabaseCleaner.clean
  end

  let(:profile){ create(:profile) }

  describe 'attributes' do

    it 'is valid with default attributes' do
      expect(profile).to be_valid
    end

    it 'is valid with null attributes' do
      new_profile = build(:profile, bio: nil, tagline: nil, first_name: nil, last_name: nil, city: nil, state: nil)
      expect(new_profile).to be_valid
    end

    it "can't create two profiles for one user" do
      second_profile = build(:profile, user_id: profile.user_id)
      expect(second_profile).to_not be_valid
    end
  end

  describe 'associations' do
    it 'responds to user' do
      expect(profile).to respond_to(:user)
    end
  end
end
