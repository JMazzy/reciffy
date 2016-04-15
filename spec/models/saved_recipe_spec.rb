require 'rails_helper'
describe SavedRecipe do
  before do
    DatabaseCleaner.clean
  end

  let(:saved_recipe){ build(:saved_recipe) }

  describe 'attributes' do
    it 'is valid with default attributes' do
      expect(saved_recipe).to be_valid
    end
  end

  describe 'associations' do
    it 'responds to user' do
      expect(saved_recipe).to respond_to(:user)
    end

    it 'responds to recipe' do
      expect(saved_recipe).to respond_to(:recipe)
    end
  end
end