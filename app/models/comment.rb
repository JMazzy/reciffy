class Comment < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :author, class_name: 'User'
end
