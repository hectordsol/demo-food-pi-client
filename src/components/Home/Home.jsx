import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faFilter } from '@fortawesome/free-solid-svg-icons'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import NavBar  from '../Navbar/Navbar';
import Recipes from '../Recipes/Recipes';
import style from'./Home.module.css';
// import './Home.css';

import { 
  searchRecipes,
  getDietTypes,
  sortBy, 
  sortType, 
  changePage,
  loadingRecipes,
  filterBy } from '../../redux/actions';

function Home () {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let diets = useSelector((state) => state.diets);

  function onSubmit(e){ // Envía el estado para searchRecipes.
    e.preventDefault();
    if(search){//solo si search no está vacío
      dispatch(loadingRecipes(true));
      dispatch(searchRecipes(search));
      setSearch("");
      document.getElementById('option').selected='selected';//selecciono la opcion sin ordenar
      hideType();//oculto filtro asc y des
      dispatch(changePage(1));
    }// con else, si search esta vacío, puedo mandar un mensaje de alerta si quiero
  }  
  function onChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function handleBy(e) {
    e.preventDefault();
    if (e.target.value==="unsorted") hideType();// si selecciono la opcion sin ordenar
    else showType();//si elijo alguna de las opciones Order By
    dispatch(sortBy(e.target.value));//ejecuto las acciones sortBy y changePage a 1
    dispatch(changePage(1));
};
function showType() {
  document.getElementById('type').style.display = 'flex';
  document.getElementById('labelType').style.display = 'flex';
}
function hideType() {
  document.getElementById('type').style.display = 'none';
  document.getElementById('labelType').style.display = 'none';
}
function handleType(e){
    e.preventDefault();
    dispatch(sortType(e.target.value));//ejecuto las acciones sortType (Asc o Des) y changePage a 1
    dispatch(changePage(1));
};
const filterTypes = (e) => {
  e.preventDefault();
  dispatch(filterBy(e.target.value));
  dispatch(changePage(1));
};
useEffect(() => {
  // console.log("HOME")
  dispatch(getDietTypes());
  // return () => {console.log("HOME DESTROY")}
}, [dispatch]);

    return (
    <div className={style.container}>{/**console.log("HOME render")*/}
       <NavBar className={style.nav}/>
       <div className={style.searchContainer}>
            
            <div className={style.titleContainer}>
                  <div className={style.nada}></div>
                  <div className={style.title} data-text="Henry Food">Henry Food</div>
                  <NavLink className={style.iconCreate} to="/create" >
                    <FontAwesomeIcon icon={faUtensils} /> 
                    <label className={style.labelCreate}> Create Recipe</label>
                  </NavLink>
            </div>
              <form className={style.formSubmit} onSubmit={onSubmit}> 
                <input autoComplete="off"
                      placeholder="Whats do you want to cook?" 
                      type='text'
                      className={style.inputSearch}
                      onChange={onChange}
                      value={search}/>
                <button type="submit" className={style.buttonSearch}><BsSearch /></button>  
              </form>
                <div className={style.selectOptions}> 
                    <label className={style.labelBy}> Order By: </label>
                    <select id='by' className={style.by} onChange={(e)=>handleBy(e)}>
                        <option id='option' value='unsorted'>unsorted</option>
                        <option value='title'>Name</option>
                        <option value='healthScore'>Score</option>
                    </select> 
                    <label id='labelType' className={style.labelType}> Order Type: </label>
                    <select id="type" className={style.type} onChange={(e)=> handleType(e)}>
                        <option value="asc">Asc</option>
                        <option value="des">Des</option>
                    </select>
                    <div className={style.filter}>
                        <div className={style.formFilters}>
                        <FontAwesomeIcon className={style.iconFilter} icon={faFilter} /> 
                            {
                            <select onChange={filterTypes} className={style.selectFilter}>
                            <option value="all"> Without filter</option>
                            {diets?.map((d) => (
                              <option key={d.name} value={d.name}>
                                {" "}
                                {d.name[0].toUpperCase() + d.name.slice(1)}
                              </option>
                            ))}
                            </select>
                            }
                        </div>
                      </div>{/* filter diets */}      
                  </div>{/* selects */}

          </div>{/* search Container*/}
          <div className={style.recipes}>
            <Recipes/>
          </div> {/* recipes */}
      </div>
    );
  }
export default Home;
