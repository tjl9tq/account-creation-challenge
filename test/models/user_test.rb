require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without username" do
    user = User.new(password: '123')
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(username: '123')
    assert_not user.save
  end

  test "should save user" do
    user = User.new(username: '12345678910', password: 'HereisaValidPassword123456')
    assert user.save
  end

  test "should not save user if password is too weak" do
    user = User.new(username: '12345678910', password: '12345678901234567890a')
  end

  test "should validate username" do
    user = User.new(password: 'HereisaValidPassword123456')
    user.username = '123456789'
    assert_not user.validate_username(), "< 10"

    user.username = '1234567890'
    assert user.validate_username(), ">= 10"

    user.username = '12345678901234567890123456789012345678901234567890'
    assert user.validate_username(), "<= 50"

    user.username = '123456789012345678901234567890123456789012345678901'
    assert_not user.validate_username(), "> 50"
  end

  test "should validate password" do
    user = User.new(password: 'HereisaValidPassword123456')

    user.password = '123456789012345678a'
    assert_not user.validate_password(), "< 20"

    user.password = '1234567890123456789a'
    assert user.validate_password(), ">= 20"

    user.password = '1234567890123456789012345678901234567890123456789a'
    assert user.validate_password(), "<= 50"

    user.password = '123456789012345678901234567890123456789012345678901a'
    assert_not user.validate_password(), "> 50"
  end
end
