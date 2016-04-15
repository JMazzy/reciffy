require 'rails_helper'

describe Subscription do


  let(:subscription){ build(:subscription) }

  describe 'create subscription' do   

    it "creates 1 subscription" do	
      new_subscription1 = build(:subscription)
      new_subscription2 = build(:subscription, subscriber_id: 2, subscribed_id: 1)
      new_subscription1.save!
      new_subscription2.save!
      expect(Subscription.count).to eq(2)
    end

  end

  
end