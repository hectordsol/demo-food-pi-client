import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import loader from "../../Images/cooking0.gif";
import notFound from "../../Images/pagina-error-404-no-encontrada-donut_114341-54.jpg";

import Recipe from '../Recipe/Recipe';
import Pagination from "../pagination/Pagination";
import style from './Recipes.module.css';

export default function Recipes() {
  const recipes = useSelector((state) => state.recipesToShow);
  const loading = useSelector((state) => state.loading);
  const submit = useSelector((state) => state.submit);
// ------------ PAGINATION --------------
  const currentPage    = useSelector(state => state.currentPage);
  const recipesForPage = useSelector(state => state.recipesForPage);
  const end = currentPage * recipesForPage;
  const start = end - recipesForPage;
  const currentRecipes = recipes?.slice(start, end);
  
  useEffect(() => {
  }, [recipes]);
return (
        <div className={style.container}>
          {loading ? (
          <img src={loader} alt="Loading..." className={style.loader} />
        ): typeof currentRecipes[0] === "object" ? (
          <div className={style.cards}>
           {currentRecipes &&
            currentRecipes.map((rec) => 
                  <Recipe 
                  key={rec.id}
                  id={rec.id}
                  title={rec.title} 
                  image={rec.image}
                  healthScore={rec.healthScore}
                  diets={rec.diets}
                  />
                  )
              }
             </div>
             ):(
              submit!==""?<div className={style.notFound}>
                            <img
                              src={notFound}
                              alt="Recipe Not Found"
                              width="800px"
                              height="400px"
                            />
                          </div>
                          :null
            )}
           <Pagination
            className={style.pagination}
            recipes={recipes}
          />
        </div>
      );
}; 
