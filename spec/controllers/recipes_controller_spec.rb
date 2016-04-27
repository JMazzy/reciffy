require 'rails_helper'

describe RecipesController, type: :controller do
  let(:recipe){ create :recipe }

  context 'user logged in' do
    login_user

    describe '#index' do
      it 'gets all recipes' do
        other_recipe = create :recipe
        get :index
        expect(assigns(:recipes)).to match_array [recipe, other_recipe]
      end

      it 'renders index template' do
        get :index
        expect(response).to render_template :index
      end
    end

    describe '#show' do
      it 'gets one recipe' do
        get :index
        get :show, id: recipe.id
        expect(assigns(:recipe)).to match recipe
      end

      it 'renders show template' do
        get :show, id: recipe.id
        expect(response).to render_template :show
      end
    end

    describe '#new' do
      it 'renders new template' do
        get :new
        expect(response).to render_template(:new)
      end
    end

    describe '#create' do
      it 'creates a recipe' do
        expect{ post :create, recipe: { name: 'Recipe', description: 'A new recipe', 
                   prep_time: 5,
                   cook_time: 5,
                   original_id: 1,
                   instructions: 'This is how you cook it' } }.to change{ Recipe.count }.by(1)
      end
    end
  end

  context 'user not logged in' do
    describe '#new' do
      it 'does not render new template' do
        get :new
        expect(response).not_to render_template(:new)
      end
    end

    describe '#create' do
      it 'does not create a recipe' do
        expect{ post :create, recipe: { name: 'Recipe', description: 'A new recipe', 
                   prep_time: 5,
                   cook_time: 5,
                   original_id: 1,
                   instructions: 'This is how you cook it' } }.to change{ Recipe.count }.by(0)
      end
    end
  end
end