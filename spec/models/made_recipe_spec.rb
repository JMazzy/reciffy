require 'rails_helper'

describe MadeRecipe do

  let(:user1){ build(:user) }
  let(:user2){ build(:user) }

  let(:recipe1){ build(:recipe) }
  let(:recipe2){ build(:recipe) }
  let(:recipe3){ build(:recipe) }
  let(:recipe4){ build(:recipe) }

  describe 'Mark recipe as made' do   

    it " allows to mark a recipe as made by 1 user " do
      user1.save
      user2.save
      recipe3 = create(:recipe, user_id: user2.id)
      made_recipe = build(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe.save
      expect(MadeRecipe.count).to eq(1)
    end

    it " allows to mark multiple recipes as made by 1 user " do
      user1.save
      user2.save
      recipe3 = create(:recipe, user_id: user2.id)
      recipe4 = create(:recipe, user_id: user2.id)
      made_recipe1 = build(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe1.save
      made_recipe2 = build(:made_recipe, user_id: user1.id, recipe_id: recipe4.id)
      made_recipe2.save
      expect(MadeRecipe.count).to eq(2)
    end

    it " allows to mark multiple recipes as made by multiple users " do
      user1.save
      user2.save
      recipe1 = create(:recipe, user_id: user1.id)
      recipe2 = create(:recipe, user_id: user1.id)
      recipe3 = create(:recipe, user_id: user2.id)
      recipe4 = create(:recipe, user_id: user2.id)
      made_recipe1 = build(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe1.save
      made_recipe2 = build(:made_recipe, user_id: user1.id, recipe_id: recipe4.id)
      made_recipe2.save
      made_recipe3 = build(:made_recipe, user_id: user2.id, recipe_id: recipe1.id)
      made_recipe3.save
      made_recipe4 = build(:made_recipe, user_id: user2.id, recipe_id: recipe2.id)
      made_recipe4.save
      expect(MadeRecipe.count).to eq(4)
    end

  end

  describe 'Does not allow duplicate made recipe' do   

    it " does not allow the user to mark same recipe as made more than once" do
      user1.save
      user2.save
      recipe3 = create(:recipe, user_id: user2.id)
      made_recipe1 = build(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe1.save
      expect(MadeRecipe.count).to eq(1)
      made_recipe2 = build(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe2.save
      expect(MadeRecipe.count).to eq(1)
    end

  end

  describe 'Does allows the remove of made recipe' do   
    it " allows removal of 1 made recipe by 1 user  " do
      user1.save
      user2.save
      recipe3 = create(:recipe, user_id: user2.id)
      made_recipe1 = create(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      expect(MadeRecipe.count).to eq(1)
      made_recipe1.destroy
      expect(MadeRecipe.count).to eq(0)
    end

    it " allows removal of multiple made recipes by 1 user  " do
      user1.save
      user2.save
      recipe1 = create(:recipe, user_id: user1.id)
      recipe2 = create(:recipe, user_id: user1.id)
      recipe3 = create(:recipe, user_id: user2.id)
      recipe4 = create(:recipe, user_id: user2.id)
      made_recipe1 = create(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe2 = create(:made_recipe, user_id: user1.id, recipe_id: recipe4.id)
      expect(MadeRecipe.count).to eq(2)
      made_recipe1.destroy
      made_recipe2.destroy
      expect(MadeRecipe.count).to eq(0)
    end

    it " allows removal of made recipes by more than 1 user  " do
      user1.save
      user2.save
      recipe1 = create(:recipe, user_id: user1.id)
      recipe2 = create(:recipe, user_id: user1.id)
      recipe3 = create(:recipe, user_id: user2.id)
      recipe4 = create(:recipe, user_id: user2.id)
      made_recipe1 = create(:made_recipe, user_id: user1.id, recipe_id: recipe3.id)
      made_recipe2 = create(:made_recipe, user_id: user1.id, recipe_id: recipe4.id)
      made_recipe3 = create(:made_recipe, user_id: user2.id, recipe_id: recipe1.id)
      made_recipe4 = create(:made_recipe, user_id: user2.id, recipe_id: recipe2.id)
      made_recipe4.save
      expect(MadeRecipe.count).to eq(4)
    end


    it " cannot remove a non-existing made-recipe" do
      user1.save
      recipe1 = create(:recipe, user_id: user1.id)
      recipe2 = create(:recipe, user_id: user1.id)
      made_recipe1 = create(:made_recipe, user_id: user1.id, recipe_id: recipe1.id)
      made_recipe2 = create(:made_recipe, user_id: user1.id, recipe_id: recipe2.id)
      expect(MadeRecipe.count).to eq(2)
      made_recipe1.destroy
      expect(MadeRecipe.count).to eq(1)
      made_recipe1.destroy
      expect(MadeRecipe.count).to eq(1)
    end

     # it " cannot remove a made-recipe of another user" do
     #  user1.save
     #  user2.save
     #  recipe1 = create(:recipe, user_id: user1.id)
     #  recipe2 = create(:recipe, user_id: user2.id)
     #  made_recipe1 = create(:made_recipe, user_id: user1.id, recipe_id: recipe2.id)
     #  made_recipe2 = create(:made_recipe, user_id: user2.id, recipe_id: recipe1.id)
     #  expect(MadeRecipe.count).to eq(2)
     #  made_recipe1.destroy
     #  expect(MadeRecipe.count).to eq(1)
     #  made_recipe1.destroy
     #  expect(MadeRecipe.count).to eq(1)
    # end
  end
  
end