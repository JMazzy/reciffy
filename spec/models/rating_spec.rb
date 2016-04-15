require 'rails_helper'

describe Rating do
  before do
    DatabaseCleaner.clean
  end

  let(:rating){ build(:rating) }

  describe 'attributes' do
    it 'is valid with default attributes' do
      expect(rating).to be_valid
    end

    it "can't create duplicate records" do
      rating.save!
      second_rating = build(:rating, user_id: rating.user_id, recipe_id: rating.recipe_id)
      expect(second_rating).to_not be_valid
    end

    it 'is invalid without user' do
      nouser = build(:rating, user_id: nil)
      expect(nouser).to_not be_valid
    end

    it 'is invalid without recipe' do
      norecipe = build(:rating, recipe_id: nil)
      expect(norecipe).to_not be_valid
    end

    it 'is invalid without rating' do
      norating = build(:rating, rating: nil)
      expect(norating).to_not be_valid
    end
  end

  describe 'associations' do
    it 'responds to user' do
      expect(rating).to respond_to(:user)
    end

    it 'responds to recipe' do
      expect(rating).to respond_to(:recipe)
    end
  end
end
