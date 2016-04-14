require 'rails_helper'

describe Recipe do
  let(:recipe){ build(:recipe) }

  describe 'attributes' do
    it 'is valid with default attributes' do
      expect(recipe).to be_valid
    end

    it 'is invalid without name' do
      new_recipe = build(:recipe, name: nil)
      expect(new_recipe).not_to be_valid
    end

    it 'is invalid without description' do
      new_recipe = build(:recipe, description: nil)
      expect(new_recipe).not_to be_valid
    end

    it 'is invalid without instructions' do
      new_recipe = build(:recipe, instructions: nil)
      expect(new_recipe).not_to be_valid
    end

    it 'is invalid without prep_time' do
      new_recipe = build(:recipe, prep_time: nil)
      expect(new_recipe).not_to be_valid
    end

    it 'is invalid without cook_time' do
      new_recipe = build(:recipe, cook_time: nil)
      expect(new_recipe).not_to be_valid
    end
  end

  describe 'associations' do
    it 'responds to user' do
      expect(recipe).to respond_to(:user)
    end

    it 'responds to recipeingredients' do
      expect(recipe).to respond_to(:recipeingredients)
    end

    it 'responds to photos' do
      expect(recipe).to respond_to(:photos)
    end

    it 'responds to taggings' do
      expect(recipe).to respond_to(:taggings)
    end

    it 'responds to tags' do
      expect(recipe).to respond_to(:tags)
    end

    it 'responds to comments' do
      expect(recipe).to respond_to(:comments)
    end
  end
end
