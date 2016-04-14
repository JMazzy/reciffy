class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  has_many :recipes

  has_one :profile, dependent: :destroy
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings

  after_create :create_profile

  private

  def create_profile
    current_user.create_profile
  end
end
