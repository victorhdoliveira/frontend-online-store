import React, { Component } from 'react';
import './App.css';
import { getCategories } from './services/api';

class App extends Component {
  componentDidMount() {
    getCategories();
  }

  render() {
    return (
      <h1>Trybe</h1>
    );
  }
}

export default App;
