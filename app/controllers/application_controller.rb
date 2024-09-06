class ApplicationController < ActionController::Base
  before_action :require_login, only: [:render_signup]
  helper_method :current_user, :logged_in?

  def render_signup
    react
  end

  def render_create_account
    react
  end

  private

  def react
    render layout: 'application', template: 'vite/index'
  end

  def current_user
    @_current_user ||= session[:current_user_id] &&
      User.find_by(id: session[:current_user_id])
  end

  def logged_in?
    !!session[:current_user_id]
  end

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to createAccount_url
    end
  end
end
