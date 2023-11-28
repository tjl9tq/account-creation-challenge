class ApiControllerTest < ActionDispatch::IntegrationTest
  test "password_strength" do
    post api_password_strength_path, params: { password: '123' }
    assert_response :success
    assert_equal response.body, "{\"score\":0}"
  end

  test "create_account fails with missing username" do
    post api_create_account_path, params: { password: '123' }
    assert_response :success
    assert_equal JSON.parse(response.body)['error'], "param is missing or the value is empty: username"
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { username: '123' }
    assert_response :success
    assert_equal JSON.parse(response.body)['error'], "param is missing or the value is empty: password"
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { username: '123456789', password: '1234567890123456789a' }
    assert_response :success
    assert_equal JSON.parse(response.body)['error'], "Invalid username"
  end

  test "create_account fails with invalid password" do
    post api_create_account_path, params: { username: '1234567890', password: '1234567890123456789' }
    assert_response :success
    assert_equal JSON.parse(response.body)['error'], "Invalid password"
  end

  test "create_account succeeds with valid username and password" do
    post api_create_account_path, params: { username: '1234567890', password: '1234567890123456789a' }
    assert_response :success
    assert_equal JSON.parse(response.body)['success'], true
  end
end
