class User < ApplicationRecord
  validates :username, presence: true, length: { in: 10..50 }, uniqueness: true
  validates :password, presence: true, length: { in: 20..50 }

  validate :validate_password
  validate :validate_username

  has_secure_password

  def validate_username
    return if username.blank?

    username.length >= 10 && username.length <= 50
  end

  def validate_password
    return if password.blank?
    strength = Zxcvbn.test(password)
    if strength['score'] <= 2
      errors.add(:password, 'is too weak. Please choose a stronger password that includes a mix of letters, numbers, and symbols.')
    end

    password.length >= 20 && password.length <= 50
  end
end
