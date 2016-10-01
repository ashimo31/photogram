Rails.application.routes.draw do

  root 'posts#index'

  get 'notifications/:id/link_through', to: 'notifications#link_through', as: :link_through

  get 'notifications', to: 'notifications#index'

  get 'profiles/show'

  get ':user_name', to: 'profiles#show', as: :profile

  get ':user_name/edit', to: 'profiles#edit', as: :edit_profile

  patch ':user_name/edit', to: 'profiles#update', as: :update_profile

  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }

  resources :posts do
    resources :comments
      get 'like'
    end
end
