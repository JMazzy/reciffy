require 'rails_helper'

describe TaggingsController, type: :controller do

  let(:recipe) { create :recipe }
  let(:tag) { create :tag }

  context "user logged in" do

    login_user

    before do
      recipe
      tag
    end

    describe "#create" do
      it "creates a tagging" do
        expect{ post :create, tagging: {tag_id: tag.id, taggable_id: recipe.id, taggable_type: recipe.class } }.to change{ Tagging.count }.by(1)
      end
    end
  end

  context "user not logged in" do

    describe "#create" do
      it "does NOT create a tagging" do
        expect{ post :create, tagging: { tag_id: tag.id, taggable_id: recipe.id, taggable_type: recipe.class } }.to change{ Tagging.count }.by(0)
      end
    end
  end
end
