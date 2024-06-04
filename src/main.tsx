import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { RecipesProvider } from './contexts/recipes.context.tsx'
import { UsersProvider } from './contexts/users.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
      <UsersProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </UsersProvider>
  </React.StrictMode>
)
