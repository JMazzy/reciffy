class Recipe < ActiveRecord::Base
  has_many :photos, dependent: :destroy

end
