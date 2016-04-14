require 'rails_helper'

describe TagsController, type: :controller do
  login_user

  before do
    DatabaseCleaner.clean
  end

  let(:tag) { create :tag }

  describe "#index" do
    it "gets all the tags" do
      other_tag = create :tag

      get :index

      expect(assigns(:tag)).to match_array [tag, other_tag]
    end

    it "renders the index template" do
      get :index

      expect(response).to render_template :index
    end

  end

  describe "#show" do

  end

  describe "#create" do

  end

  describe "#destroy" do

  end
end
