require 'rails_helper'

describe Tagging, type: :model do
  let(:tagging) { build(:tagging) }

  it "valid with correct attributes" do
    expect(tagging).to be_valid
  end

  it "invalid if missing tag_id" do
    no_tag_id = build(:tagging, tag_id: nil)
    expect(no_tag_id).to_not be_valid
  end

  it "invalid if missing taggable_id" do
    no_taggable_id = build(:tagging, taggable_id: nil)
    expect(no_taggable_id).to_not be_valid
  end

  it "invalid if missing taggable_type" do
    no_taggable_type = build(:tagging, taggable_type: nil)
    expect(no_taggable_type).to_not be_valid
  end
end
