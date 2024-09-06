Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root
  get '/create-account', to: 'application#render_create_account', as: :createAccount
  get '/signup/status', to: 'logins#status'
  delete '/signup/logout', to: 'logins#destroy'
  get '/signup/*all', to: 'application#render_signup', as: :signup

  namespace :api do
    post 'create-account', to: 'users#create_account'
    post 'password-strength', to: 'users#password_strength'
    resources :users, only: [:index, :show, :update]
    get '/status', to: 'logins#status'
  end
end