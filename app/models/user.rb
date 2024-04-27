class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :requests  
  has_many :executed_requests, foreign_key: 'executor_id', class_name: 'Request'
  has_one :profile, dependent: :destroy

  enum role: { user: 0, volunteer: 1 }
end
