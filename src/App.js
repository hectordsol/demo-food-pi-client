import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import CreateRecipe from './components/Create/CreateRecipe';


function App() {
  return (
    <React.Fragment>
      <Switch>
      <Route path={'/'} exact component={LandingPage}/>
      <Route path={'/home/:id'} component={RecipeDetail}/>
      <Route path={'/home'} component={Home}/>
      <Route path={'/create'} component={CreateRecipe}/>
      </Switch>
    </React.Fragment>  
  );
}

export default App;