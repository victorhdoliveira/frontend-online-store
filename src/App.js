import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Checkout from './Pages/Checkout';
import HomePage from './Pages/HomePage';
import Product from './Pages/Product';
import ShoppingCard from './Pages/ShoppingCard';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/shopping-card" component={ ShoppingCard } />
        <Route path="/product/:id" component={ Product } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </HashRouter>
  );
}

export default App;
