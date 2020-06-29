Rails.application.routes.draw do
  get 'welcome/index'
  get 'other/index'
  root 'welcome#index'
end
