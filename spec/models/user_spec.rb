require 'rails_helper'

describe User do
  let(:user){ build(:user) }

  describe 'attributes' do
    it 'is valid with default attributes' do
      expect(user).to be_valid
    end

    it "doesn't allow identical emails" do
      user = build(:user, email: 'bar@foo.com')
      user.save
      expect{ create(:user, email: 'bar@foo.com') }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  describe 'associations' do
    it 'responds to ratings' do
      expect(user).to respond_to(:ratings)
    end

    it 'responds to rated_recipes' do
      expect(user).to respond_to(:rated_recipes)
    end

    it 'responds to recipes' do
      expect(user).to respond_to(:recipes)
    end

    it 'responds to comments' do
      expect(user).to respond_to(:comments)
    end

    it 'responds to profile' do
      expect(user).to respond_to(:profile)
    end

    it 'responds to subscriptions' do
      expect(user).to respond_to(:subscriptions)
    end

    it 'responds to users_subscribed_by' do
      expect(user).to respond_to(:users_subscribed_by)
    end

    it 'responds to made_recipes' do
      expect(user).to respond_to(:made_recipes)
    end

    it 'responds to recipes_made' do
      expect(user).to respond_to(:recipes_made)
    end

    it 'responds to saved_recipes' do
      expect(user).to respond_to(:saved_recipes)
    end

    it 'responds to recipes_saved' do
      expect(user).to respond_to(:recipes_saved)
    end
  end
end