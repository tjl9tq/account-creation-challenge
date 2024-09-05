class Api::UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found'}, status: :not_found
    end

    def new
        @user = User.new
    end

    def create_account
        @user = User.new(user_params)
        if @user.save
            render json: { message: 'User created succesfully', user: @user }, status: :created
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
         
end