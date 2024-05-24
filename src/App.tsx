import './App.css'

import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { Recipes } from './components/Recipes';
import { CreateRecipeForm } from './components/CreateRecipeForm';
import toast from 'react-hot-toast';

import { useRecipes } from './contexts/recipes.context';
import { useUsers } from './contexts/users.context';

const App = () => {

  const {selectedTab, setSelectedTab, handleCreateRecipeTabClick, handleSearchInputChange} = useRecipes();
  
  const {currentUser, logout, selectedBtn, setSelectedBtn } = useUsers();

  return (
    <>
      <div className='app-container'>
        {currentUser ? (
          <div className='logout-btn-div'>
            <h3>{`Welcome ${currentUser.username}!`}</h3>
            <button className='logout-btn' onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className='register-and-login-btns'>
            <button className='register-btn' onClick={() => setSelectedBtn('register')}>Register</button>
            <button className='login-btn' onClick={() => setSelectedBtn('login')}>Login</button>
          </div>
        )}
        <div className='header'>
          <img src='/hero-image.jpg' alt='Hero' />
          <div className='title'>Foodie App</div>
        </div>
        <div className='tabs'>
          <div className='left'>
            <h1 className={selectedTab === 'all' ? 'tab-active' : ''} onClick={() => setSelectedTab('all')}>All Recipes</h1>
            <h1 className={selectedTab === 'favorites' ? 'tab-active' : ''} 
              onClick={() => {
              if (!currentUser) {
                toast.error('Login to view your own favorites!');
                return;              
              }
              setSelectedTab('favorites')
            }}>Favorites</h1>
          </div>          
          <div className='right'>
            <button className={`create-recipe-btn ${selectedTab === 'createRecipe' ? 'tab-active' : ''}`} onClick={handleCreateRecipeTabClick}>
              {selectedTab === 'createRecipe' ? 'Back to Recipes' : 'Create Recipe'}
            </button>
          </div>
        </div>

        {selectedBtn === 'register' && <RegisterForm />}
        {selectedBtn === 'login' && <LoginForm />}

        {/* if search tab is selected */}
        {selectedTab === 'createRecipe' ? (          
          <CreateRecipeForm />
          ) : (
          <>
            <input className='search-box' type='search' placeholder='search recipes' 
              onChange={handleSearchInputChange} 
            />
            
            <Recipes />
          </>
        )}
      </div>
    </>
  );
};

export default App;
