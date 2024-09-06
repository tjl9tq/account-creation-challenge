class LoginsController < ApplicationController
    def create
      if user = User.authenticate(params[:username], params[:password])
        session[:current_user_id] = user.id
      end
    end

    def destroy
        session.delete(:current_user_id)
        @_current_user = nil
        render json: {message: 'Succesfully logged out'}
      end

    def status
      render json: {logged_in: logged_in?, user: current_user }
    end
  end