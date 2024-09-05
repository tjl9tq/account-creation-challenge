class User < ApplicationRecord
  validates :username, presence: true, length: { in: 10..50 }, uniqueness: true
  validates :password, presence: true, length: { in: 20..50 }

  has_secure_password

  def self.validate_username
  end

  def self.validate_password
  end
end
