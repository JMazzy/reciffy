require 'rails_helper'

describe User do
  let(:user){ build(:user) }

  it 'is valid with default attributes' do
    expect(user).to be_valid
  end

  it "doesn't allow identical emails" do
    user = build(:user, email: 'bar@foo.com')
    user.save
    expect{ create(:user, email: 'bar@foo.com') }.to raise_error(ActiveRecord::RecordInvalid)
  end
end