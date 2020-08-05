Rails.application.routes.draw do

  resources :places
  resources :users
  resources :users, only: [:index, :show] do
    resources :places, only: [:create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
