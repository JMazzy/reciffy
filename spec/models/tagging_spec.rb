require 'rails_helper'

describe Tagging, type: :model do
  let(:tagging) { build(:tagging) }

  it "valid with correct attributes" do
    expect(tag).to be_valid
  end
  it "invalid if missing tag_id"
  it "invalid if missing taggable_id"
  it "invalid if missing taggable_type"
end
