require 'rails_helper'

describe MadeRecipe, type: :model do
  let(:made_recipe){ build(:made_recipe) }

  describe 'attributes' do
    it "is created when valid" do
      expect(made_recipe).to be_valid
    end

    it "is not created without user" do
      nouser = build(:made_recipe, user_id: nil)
      expect(nouser).to_not be_valid
    end

    it 'is not created without recipe' do
      norecipe = build(:made_recipe, recipe_id: nil)
      expect(norecipe).to_not be_valid
    end

    it "is invalid when a duplicate" do
      made_recipe.save!
      second_made_recipe = build(:made_recipe, user_id: made_recipe.user_id, recipe_id: made_recipe.recipe_id)
      expect(second_made_recipe).to_not be_valid
    end
  end

  describe 'associations' do
    it 'responds to recipe' do
      expect(made_recipe).to respond_to(:recipe)
    end

    it 'responds to user' do
      expect(made_recipe).to respond_to(:user)
    end
  end
end
