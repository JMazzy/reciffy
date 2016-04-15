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

    it "can't create duplicate records" do
      saved_recipe.save!
      second_saved_recipe = build(:saved_recipe, user_id: saved_recipe.user_id, recipe_id: saved_recipe.recipe_id)
      expect(second_saved_recipe).to_not be_valid
    end

    it 'is invalid without user' do
      nouser = build(:saved_recipe, user_id: nil)
      expect(nouser).to_not be_valid
    end

    it 'is invalid without recipe' do
      norecipe = build(:saved_recipe, recipe_id: nil)
      expect(norecipe).to_not be_valid
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