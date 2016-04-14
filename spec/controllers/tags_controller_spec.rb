require 'rails_helper'

describe TagsController, type: :controller do
  before do
    DatabaseCleaner.clean
  end

  login_user

  let(:tag) { create :tag }

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

  describe "#destroy" do
    it "destroys a tag" do
      expect{ delete :destroy, id: tag.id, method: :delete }.to change{ Tag.count }.by(-1)
    end
  end
end
