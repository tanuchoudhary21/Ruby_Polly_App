Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # resources :polls, only: [:index], param: :slug
  resources :polls, except: %i[new edit], param: :slug
  resources :users, only: %i[create index]
  resource :sessions, only: [:create, :destroy]
  resources :votes, only: :create

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
