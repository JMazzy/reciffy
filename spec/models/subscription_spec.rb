require 'rails_helper'

describe Subscription do

  let(:user1){ build(:user) }
  let(:user2){ build(:user) }
  let(:user3){ build(:user) }
  let(:user4){ build(:user) }

  describe 'new subscriptions' do

    it "to create 2-way subsccription beteween 2 users " do
      user1.save!
      user2.save!
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user2.id, subscribed_id: user1.id)
      new_subscription1.save!
      new_subscription2.save!
      expect(Subscription.count).to eq(2)
    end

    it "for multiple subscriptions for 1 user " do
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user1.id, subscribed_id: user4.id)
      new_subscription1.save!
      new_subscription2.save!
      new_subscription3.save!
      expect(Subscription.count).to eq(3)
    end

  end

  describe 'gets correct subscription from user1 to user2 and reverse' do

    xit "for multiple subscriptions for 1 user " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user1.id, subscribed_id: user4.id)
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      expect(Subscription.get_subscription(user1.id,user2.id).count).to eq(1)
      expect(Subscription.get_subscription(user1.id,user3.id).count).to eq(1)
      expect(Subscription.get_subscription(user1.id,user4.id).count).to eq(1)
    end

  end


end
