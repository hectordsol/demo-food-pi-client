import axios from 'axios';
//const ROOT_old = 'https://food-pi-part06.herokuapp.com';
const ROOT ='https://demo-pi-food-production.up.railway.app';

export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_DIETTYPES = 'GET_DIETTYPES';
export const SORT_TYPE = 'SORT_TYPE';
export const SORT_BY = 'SORT_BY';
export const FILTER_BY = 'FILTER_BY';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const LOADING_RECIPES = 'LOADING_RECIPES';

export function loadingRecipes(payload) {
    return { type: LOADING_RECIPES, payload: payload };
  }
export function changePage(payload) {
    return { type: CHANGE_PAGE, payload: payload };
  }
export function searchRecipes(title) {
    return async (dispatch) =>{
    try{
        const recipes = await axios.get(`${ROOT}/api/recipes?name=${title}`);
        return dispatch({ type: SEARCH_RECIPES, payload: recipes.data , loading: false, submit: title});
    } catch(error){
        console.log(error);
        }
    }
};
export function getRecipeDetail(id) {
  return async (dispatch) => {
    try{
        const recipeDetail = await axios.get(`${ROOT}/api/recipes/${id}`);
        return dispatch({type: GET_RECIPE_DETAIL, payload: recipeDetail.data.data });
        }
    catch(error){
        console.log(error.response)
        return dispatch({type: GET_RECIPE_DETAIL, payload: {} });
    }
  }
};
export const clearDetail = () => {
    return {
      type: GET_RECIPE_DETAIL,
      payload: [],
    };
};
export function getDietTypes() {
    return async function (dispatch) {
        axios.get(`${ROOT}/api/diettypes`)
        .then(dietTypes => {
            dispatch({
                type: GET_DIETTYPES,
                payload: dietTypes.data 
            })
        })
    }
};
export function sortType(sortType) { //ascending or descending
    return {
        type: SORT_TYPE,
        payload: sortType // asc o desc
    };
};
export function sortBy(payload) { //title - healthScore - unsorted
    return {
        type: SORT_BY,
        payload: payload 
    }
};
export function filterBy(typeDiet) {
    return {
        type: FILTER_BY,
        payload: typeDiet // vegan or vegetarian
    }
};
export function createRecipe (payload) { //Post a new recipe
    return async (dispatch) => {
        try{
    const response = await axios.post(`${ROOT}/api/create`, payload);
            return   dispatch({ type: CREATE_RECIPE, payload: response})
    }   
    catch(error) {console.log(error)}
    };
};
