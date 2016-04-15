require 'rails_helper'

describe ProfilesController do
  before do
    DatabaseCleaner.clean
  end

  let(:user){ create(:user) }

  describe 'PUT #update' do
    context 'user signed in' do
      login_user

      before do
        user
        patch :update,
              user_id: user.id,
              profile: attributes_for(
              :profile,
              bio: 'I am a strange loop',
              tagline: 'I am a cool cat',
              first_name: 'Foo',
              last_name: 'Bar',
              city: 'Reno',
              state: 'NV')
      end

      it 'profile updated if user signed in' do
        user.reload
        expect(user.profile.bio).to eq('I am a strange loop')
      end
    end

    context 'user not signed in' do
      before do
        user
        patch :update,
              user_id: user.id,
              profile: attributes_for(
              :profile,
              bio: 'I am a strange loop',
              tagline: 'I am a cool cat',
              first_name: 'Foo',
              last_name: 'Bar',
              city: 'Reno',
              state: 'NV')
      end

      it 'profile not updated if user not signed in' do
        user.reload
        expect(user.profile.bio).to_not eq('I am a strange loop')
      end
    end
  end

end
