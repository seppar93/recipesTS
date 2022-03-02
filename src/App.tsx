import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
 
  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setrecipeSearch] = useState('');

  const searchForRecipes = async(query:string): Promise<any> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  }

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch)
      const response = await searchForRecipes(query);
      setRecipesFound(response)
    })()

  })
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
