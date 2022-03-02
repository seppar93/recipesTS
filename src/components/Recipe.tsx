import React from 'react'
import { IRecipe } from '../IRecipe'

type RecipeProp = {
    recipe: IRecipe
}
const Recipe = ({recipe}: RecipeProp) => {



  return (
    <div className='recipe'>Recipe
    <div className='title'>
        <img src={recipe.thumbnail || '#' } alt={recipe.title} />
        <p>{recipe.title} </p>
    </div>
    {
        recipe.ingredients && 
        <ul>
            {recipe.ingredients.split(',').map(ingredient => <li>{ingredient}</li>)}
        </ul>
    }
    <a href={recipe.href} target='_blank' rel="noreferrer"> view Recipe</a>
    
    </div>
  )
}

export default Recipe