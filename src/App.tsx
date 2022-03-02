import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';
import { IRecipe } from './IRecipe';

function App() {

  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<IRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  }

  useEffect(() => {
    (async () => {

      const query = encodeURIComponent(recipeSearch)
      if (query) {
        const response = await searchForRecipes(query);
        setRecipesFound(response)
      }
    })()
  }, [recipeSearch])

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value)

  }

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className='searchForm' onSubmit={event => search(event)}>
        <input id='searchText' type="text" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for  {recipeSearch} ...</p>}
      <div className='recipe-container'>
        {recipesFound.length && 
        recipesFound.map(recipe => 
          (<Recipe key={recipe.href} recipe={recipe}></Recipe>)
          ) 
        }
      </div>
    </div>
  );
}

export default App;
