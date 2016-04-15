require 'rails_helper'

describe TagsController, type: :controller do
  
  let(:tag) { create :tag }

  context "user logged in" do

    login_user

    describe "#index" do
      it "gets all the tags" do
        other_tag = create :tag

        get :index

        expect(assigns(:tags)).to match_array [tag, other_tag]
      end

      it "renders the index template" do
        get :index

        expect(response).to render_template :index
      end

    end

    describe "#show" do
      it "gets one tag" do
        get :show, id: tag.id
        expect(assigns(:tag)).to match tag
      end

      it "renders the show template" do
        get :show, id: tag.id
        expect(response).to render_template :show
      end
    end

    describe "#create" do
      it "creates a tag" do
        expect{ post :create, tag: { name: "RecipeTag" } }.to change{ Tag.count }.by(1)
      end
    end
  end

  context "user not logged in" do

    describe "#index" do
      it "does NOT get all the tags" do
        other_tag = create :tag

        get :index

        expect(assigns(:tags)).not_to match_array [tag, other_tag]
      end

      it "does NOT render the index template" do
        get :index

        expect(response).not_to render_template :index
      end
    end

    describe "#show" do
      it "does NOT get tag" do
        get :show, id: tag.id
        expect(assigns(:tag)).not_to match tag
      end

      it "does NOT show the show template" do
        get :show, id: tag.id
        expect(response).not_to render_template :show
      end
    end

    describe "#create" do
      it "does NOT create a tag" do
        expect{ post :create, tag: { name: "RecipeTag" } }.to change{ Tag.count }.by(0)
      end
    end
  end
end
