require 'rails_helper'

describe Subscription do

  let(:user1){ build(:user) }
  let(:user2){ build(:user) }
  let(:user3){ build(:user) }
  let(:user4){ build(:user) }

  describe 'Check new subscriptions' do   

    it "to create 2-way subsccription beteween 2 users " do
      user1.save
      user2.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user2.id, subscribed_id: user1.id)
      new_subscription1.save
      new_subscription2.save
      expect(Subscription.count).to eq(2)
    end

    it " - for multiple subscriptions for 1 user " do	

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

  describe 'Gets correct subscription count for different users' do   

    it "for multiple subscriptions for 1 user " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user3.id, subscribed_id: user1.id)
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      expect(user1.subscriptions.count).to eq(2)
      expect(user3.subscriptions.count).to eq(1)
      expect(user2.subscriptions.count).to eq(0)
    end

  end

  describe 'Gets initiated subscription count for different users' do   

    it "for count of multiple initiated subscriptions for 1 user " do	
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
      expect(user1.initiated_subscribe_requests.count).to eq(3)
    end


    it "for 0 count of multiple initiated subscriptions when user is only subscribed to" do	
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
      expect(user2.initiated_subscribe_requests.count).to eq(0)
      expect(user3.initiated_subscribe_requests.count).to eq(0)
    end

    it "for count of multiple initiated subscriptions for different users " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user4.id, subscribed_id: user3.id)
      new_subscription4 = build(:subscription, subscriber_id: user4.id, subscribed_id: user1.id)
      new_subscription5 = build(:subscription, subscriber_id: user3.id, subscribed_id: user1.id)
      new_subscription6 = build(:subscription, subscriber_id: user3.id, subscribed_id: user2.id)
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      new_subscription4.save
      new_subscription5.save
      new_subscription6.save
      expect(user1.initiated_subscribe_requests.count).to eq(2)
      expect(user3.initiated_subscribe_requests.count).to eq(2)
      expect(user4.initiated_subscribe_requests.count).to eq(2)
    end

  end

  describe 'Gets subscribed_recieved count for different users' do   

    it "for count of multiple received subscriptions for 1 user " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user4.id)
      new_subscription2 = build(:subscription, subscriber_id: user2.id, subscribed_id: user4.id)
      new_subscription3 = build(:subscription, subscriber_id: user3.id, subscribed_id: user4.id)
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      expect(user4.received_subscription_requests.count).to eq(3)
    end


    it "for 0 count of received subscriptions when user has never received requests" do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription1.save!
      new_subscription2.save!
      expect(user1.received_subscription_requests.count).to eq(0)
    end

    it "for count of multiple receieved subscriptions for different users " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user4.id, subscribed_id: user3.id)
      new_subscription4 = build(:subscription, subscriber_id: user4.id, subscribed_id: user1.id)
      new_subscription5 = build(:subscription, subscriber_id: user3.id, subscribed_id: user1.id)
      new_subscription6 = build(:subscription, subscriber_id: user3.id, subscribed_id: user2.id)
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      new_subscription4.save
      new_subscription5.save
      new_subscription6.save
      expect(user1.received_subscription_requests.count).to eq(2)
      expect(user2.received_subscription_requests.count).to eq(2)
      expect(user3.received_subscription_requests.count).to eq(2)
    end

  end

  describe 'Does not allow duplicate subscription' do   

    it "fails to add a duplicated initiated request " do	
      user1.save
      user2.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription1.save
      expect(user1.initiated_subscribe_requests.count).to eq(1)
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription1.save
      expect(user1.initiated_subscribe_requests.count).to eq(1)
    end

  end

  describe 'Allows deletion of an existing subscription' do   

    it "destroys the subscription " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user4.id, subscribed_id: user3.id)
      new_subscription4 = build(:subscription, subscriber_id: user4.id, subscribed_id: user1.id)
      new_subscription5 = build(:subscription, subscriber_id: user3.id, subscribed_id: user1.id)
      new_subscription6 = build(:subscription, subscriber_id: user3.id, subscribed_id: user2.id)
      
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      new_subscription4.save
      new_subscription5.save
      new_subscription6.save
      
      new_subscription1.destroy

      expect(user1.subscriptions.count).to eq(1)
      expect(user4.subscriptions.count).to eq(2)
      expect(user3.subscriptions.count).to eq(2)
    end

    it "cannit destroy a non-existing subscription " do	
      user1.save
      user2.save
      user3.save
      user4.save
      new_subscription1 = build(:subscription, subscriber_id: user1.id, subscribed_id: user2.id)
      new_subscription2 = build(:subscription, subscriber_id: user1.id, subscribed_id: user3.id)
      new_subscription3 = build(:subscription, subscriber_id: user4.id, subscribed_id: user3.id)
      new_subscription4 = build(:subscription, subscriber_id: user4.id, subscribed_id: user1.id)
      new_subscription5 = build(:subscription, subscriber_id: user3.id, subscribed_id: user1.id)
      new_subscription6 = build(:subscription, subscriber_id: user3.id, subscribed_id: user2.id)
      
      new_subscription1.save
      new_subscription2.save
      new_subscription3.save
      new_subscription4.save
      new_subscription5.save
      new_subscription6.save
      
      new_subscription1.destroy
      new_subscription1.destroy
      
      expect(user1.subscriptions.count).to eq(1)
      expect(user4.subscriptions.count).to eq(2)
      expect(user3.subscriptions.count).to eq(2)
    end
  end  

end