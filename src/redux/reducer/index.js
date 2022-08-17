import { 
    SEARCH_RECIPES, 
    GET_RECIPE_DETAIL, 
    GET_DIETTYPES, 
    SORT_TYPE, 
    SORT_BY, 
    FILTER_BY, 
    CREATE_RECIPE, 
    CHANGE_PAGE,
    LOADING_RECIPES, } 
from "../actions";

//const axios = require('axios');

function Sort(arr,by,type){//by=name,healthScore, type=asc,des
    if(type==="asc"){ return SortAsc(arr,by)}
    else 
       if(type==="des"){ return SortDes(arr,by) }
}
function SortAsc(arr, orderBy) {//orderBy=name,healthScore
    return arr.sort(function (a, b) {
        if (orderBy==="title")
            {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            }
        else
            {
                if (a[orderBy] > b[orderBy]) return 1; 
                if (a[orderBy] < b[orderBy]) return -1;
                return 0;
             }
    });
};
function SortDes(arr, orderBy) {//orderBy=name,healthScore
    return arr.sort(function (a, b) {
        if (orderBy==="title")
        {
            if (a.title.toLowerCase() < b.title.toLowerCase()) 
            { return 1;  }
            if (a.title.toLowerCase() > b.title.toLowerCase()) 
            { return -1;  }
            return 0;
        }
    else
        {
        if (a[orderBy] < b[orderBy]) { return 1;  }
        if (a[orderBy] > b[orderBy]) { return -1;}
        return 0;
        }
    });
};

// REDUCER -----------------------------------------------------------------------------------
const initialState = {
    recipes: [],
    recipesToShow: [],
    currentPage:1,
    recipesForPage:9,
    recipeDetail: {},
    diets: [],
    sortBy: 'unsorted',
    sortType: 'asc',
    loading: false,
    submit:'',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case SEARCH_RECIPES: 
        return {
            ...state,
            recipes: action.payload,
            recipesToShow: action.payload,
            loading: action.loading,
            submit: action.submit,
        };
    case  CREATE_RECIPE: {
            return {
                ...state,
            }
        }
    case GET_RECIPE_DETAIL: 
            return {
                ...state,
                recipeDetail: action.payload,
            };
    case  GET_DIETTYPES: 
            return {
                ...state,
                diets: action.payload,
            };
    case SORT_TYPE:  //Asc, desc
        var recipesSortedType = [...state.recipesToShow];
            recipesSortedType = Sort(recipesSortedType, state.sortBy, action.payload);
            return {
                ...state,
                recipesToShow: recipesSortedType,
                sortType: action.payload
            };          
    case SORT_BY:  //title or healtScore
        const recipes = [ ...state.recipes];
        const sortedBy = action.payload === "unsorted" 
            ? recipes
            :Sort(recipes, action.payload, state.sortType);
            return {
                ...state,
                recipesToShow: sortedBy,
                sortBy: action.payload
            };
    case  FILTER_BY : {
        const withoutFilter = state.recipes;
        const filtered =
          action.payload === "all"
            ? withoutFilter
            : withoutFilter.filter((recipe) => recipe.diets.includes(action.payload));
        return {
          ...state,
          recipesToShow: filtered,
        };  
    };
    case CHANGE_PAGE: 
        return {
            ...state,
            currentPage: action.payload,
        };    
    case LOADING_RECIPES: 
        return {
            ...state,
            loading: action.payload,
        };
     default: return {...state};
    }
}