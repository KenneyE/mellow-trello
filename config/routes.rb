Trellino::Application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit] do
      resources :lists, only: [:index, :show, :create, :update, :destroy]
    end
    resources :lists, only: [:show, :update, :destroy] do
      resources :cards, only: [:create, :index]
    end
    resources :cards, only: [:show, :update, :destroy] do
      resources :todo_items, only: [:create, :index]
    end
    resources :todo_items, only: [:show, :update, :destroy]
    resources :card_assignments, only: :destroy
  end

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
end
