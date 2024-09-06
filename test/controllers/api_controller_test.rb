class ApiControllerTest < ActionDispatch::IntegrationTest
  # test "password_strength" do
  #   post api_password_strength_path, params: { password: '123' }
  #   assert_response :success
  #   assert_equal response.body, "{\"score\":0}"
  # end

  test "create_account fails with missing username" do
    post api_create_account_path, params: { password: '123' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors']['username'][0], "can't be blank"
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { username: '123' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors']['password'][0], "can't be blank"
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { username: '123456789', password: '1234567890123456789a' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors']['username'][0], "is too short (minimum is 10 characters)"
  end

  test "create_account fails with invalid password" do
    post api_create_account_path, params: { username: '1234567890', password: '1234567890123456789' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors']['password'][0], "is too short (minimum is 20 characters)"
  end

  test "create_account fails with weak password" do
    post api_create_account_path, params: { username: '1234567890', password: '12345678901234567891' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['errors']['password'][0], "is too weak. Please choose a stronger password that includes a mix of letters, numbers, and symbols."
  end

  test "create_account succeeds with valid username and password" do
    post api_create_account_path, params: { username: '1234567890', password: 'HereIsAValidPassword123456!' }
    assert_response :success
    assert_equal JSON.parse(response.body)['success'], true
  end
end
