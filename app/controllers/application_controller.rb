class ApplicationController < ActionController::Base
  def render_react
    react
  end

  private

  def react
    render layout: 'application', template: 'vite/index'
  end
end
