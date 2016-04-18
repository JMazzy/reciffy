source 'https://rubygems.org'

gem 'rails', '4.2.6'
gem 'pg', '~> 0.15'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'devise'
gem 'ember-rails'
gem 'ember-cli-rails'
gem 'faker'
gem 'figaro'
gem 'paperclip'
gem 'aws-sdk'
gem 'bcrypt', '~> 3.1.7'
gem 'bootstrap-sass', '~> 3.2.0'
gem 'autoprefixer-rails'
gem 'angularjs-rails'
gem 'angular_rails_csrf'

group :development, :test do
  gem 'jazz_hands', github: 'nixme/jazz_hands', branch: 'bring-your-own-debugger'
  gem 'pry-byebug'
  gem 'hirb'
  gem 'rspec-rails'
  gem 'guard-rspec'
  gem 'factory_girl_rails'
  gem 'database_cleaner'
  gem 'capybara'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'better_errors'
  gem 'binding_of_caller'
end

group :development do
  gem 'web-console', '~> 2.0'
  gem 'spring'
end

group :production do
  ruby '2.3.0'
end

gem 'rails_12factor', group: [:staging, :production]

source "https://rails-assets.org" do
  gem "rails-assets-angular-devise"
end
