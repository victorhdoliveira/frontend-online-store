import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ShoppingCard from './Pages/ShoppingCard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/shopping-card" component={ ShoppingCard } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
