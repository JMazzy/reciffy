require 'rails_helper'

describe TaggingsController, type: :controller do
  before do
    DatabaseCleaner.clean
  end

  let(:tagging) { create :tagging }

  context "user logged in" do

    login_user

    describe "#create" do
      xit "creates a tagging" do
        expect{ post :create, tagging: attributes_for(:tagging) }.to change{ Tag.count }.by(1)
      end
    end
  end

  context "user not logged in" do

    describe "#create" do
      xit "does NOT create a tagging" do
        expect{ post :create, tagging: attributes_for(:tagging) }.to change{ Tag.count }.by(0)
      end
    end
  end
end
