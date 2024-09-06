class User < ApplicationRecord
  validates :username, presence: true, length: { in: 10..50 }, uniqueness: true
  validates :password, presence: true, length: { in: 20..50 }

  validate :validate_password

  has_secure_password

  def validate_password
    strength = Zxcvbn.test(password)
    if strength['score'] < 2
      errors.add(:password, 'is too weak. Please make it stronger.')
    end
  end
end
