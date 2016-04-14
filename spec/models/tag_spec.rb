require 'rails_helper'

describe Tag, type: :model do
  let(:tag) {build(:tag)}

  it "with a name is valid" do
    expect(tag).to be_valid
  end

  it "without a name is invalid" do
    noname = build(:tag, name: nil)
    expect(noname).to_not be_valid
  end

  it "with a duplicate name is invalid" do
    tag.save
    dupname = build(:tag, name: tag.name)
    expect(dupname).to_not be_valid
  end
end
