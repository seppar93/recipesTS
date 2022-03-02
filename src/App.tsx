import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<any> => {
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
    </div>
  );
}

export default App;
