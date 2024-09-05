Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root
  get '/create-account', to: 'application#render_react', as: :createAccount
  get '/signup/*all', to: 'application#render_react', as: :signup

  namespace :api do

    post 'create-account', to: 'users#create_account'

    resources :users, only: [:index, :show, :update]
  end
end
 