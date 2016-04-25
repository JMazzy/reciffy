class Comment < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :author, foreign_key: :user_id, class_name: 'User'
  has_one :profile, through: :author, source: :profile
end
