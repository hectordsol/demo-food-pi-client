import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetail, clearDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar/Navbar";
import style from "./RecipeDetail.module.css";
 
export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { image, title, dishTypes, diets, summary, healthScore, instructions } =
    useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);

  return (
    <div>
       <NavBar/> 
      <div className={style.content}>
          <div className={style.scores}>
              <span id="healthScore">
                Health Level:{" "}
                <progress
                  id="healthScore"
                  max="100"
                  value={healthScore}
                  className={style.score}
                />{" "}
                {healthScore}/100
              </span>
          </div>
          {/**score */}
        <h3 className={style.title}>{title}</h3>
        <img
          src={image}
          alt="Img Not Available"
          width="500px"
          className={style.img}
        />
        <div className={style.summary}>
          <span className={style.subtitle}>
            Summary:
          </span>
          <p>{summary && summary.replace(/<[^>]+>/g, "")}</p>
        </div>{/**summary */}

        <div className={style.subtitle}>
        Dish Type:
        </div>
        <div className={style.dietTypes}>
            {dishTypes?.map((dish) => (
              <p key={dish} className={style.types}>{dish}</p>
            ))}
        </div>
        {/**dish types */}

        <div className={style.subtitle}>
            Diet Type:
        </div>
        <div className={style.dietTypes}>
            {diets?.map((diet) => (
              <p key={diet} className={style.types}>{diet}</p>
            ))}
        </div>
        {/**diet types */}

        <div className={style.instructions}>
          <span className={style.subtitle}>
            Instrucctions:
          </span>{/**Si es Array viene de la API sino de la DB */}
                {Array.isArray(instructions) 
                  ? <ol className={style.steps}>
                    {instructions.map(e => {return(<li key={e.number}>{e.step}</li>)})} 
                    </ol>
                  : <span><br/>
                    {instructions}
                    </span>
                }
        </div>
        {/**instructions */}
      </div>{/**content */}
    </div>
  );
}
