require 'rails_helper'

describe SubscriptionsController do

  let(:user1){ create(:user) }
  let(:user2){ create(:user) }

  context 'user logged in' do
    login_user
    
    before do
      user1
      user2
    end

    # describe '#create' do
    #   it 'creates a recipe' do
    #     expect{ post :create, subscription: { subscriber_id: user1.id, subscribed_id: user2.id } }.to change{ Subscription.count }.by(1)
    #   end
    # end
  end

end
