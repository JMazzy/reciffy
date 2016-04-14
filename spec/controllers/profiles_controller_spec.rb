require 'rails_helper'

describe ProfilesController do
  let(:user){ create(:user) }
  let(:profile){ create(:profile, user: user) }

  describe 'PUT #update' do
    let(:put_update_profile) do
      put :update,
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

    context 'user signed in' do
      before do
        user
        profile
        create_session(user)
      end

      it 'profile updated if user signed in' do
        put_update_profile
        profile.reload
        expect(user.profile.bio).to eq('I am a strange loop')
      end
    end
  end

end