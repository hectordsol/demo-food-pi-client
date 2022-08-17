import React from 'react';
import { Link } from "react-router-dom";
import style from "./Recipe.module.css";

function Recipe({ id, title, image, healthScore, diets}) {

    return (
      <div className={style.recipe}> 
        <Link to={`/home/${id}`} className={style.link}>
          <img src={image} alt="" width="120px" className={style.img} />
          <h3 className={style.title}>{title[0].toUpperCase() + title.slice(1)}</h3>
          {diets?.map((diet) => (
          <p className={style.types} key={diet}>
            {diet[0].toUpperCase() + diet.slice(1)}
          </p>
        ))}          
        </Link>
        <div className={style.score}>
        <div className={style.scoreText}>{healthScore}%</div>
        </div>
      </div>
      );
};
export default Recipe;
