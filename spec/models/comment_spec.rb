require 'rails_helper'

describe Comment do
  let(:comment){ build(:comment) }
  describe 'attributes' do
    it 'is valid with default attributes' do
      expect(comment).to be_valid
    end

    it 'is invalid without comment text' do
      new_comment = build(:comment, comment_description: nil)
      expect{ new_comment.save! }.to raise_error(ActiveRecord::StatementInvalid)
    end
  end

  describe 'associations' do
    it 'responds to author' do
      expect(comment).to respond_to(:author)
    end

    it 'responds to recipe' do
      expect(comment).to respond_to(:recipe)
    end
  end
end