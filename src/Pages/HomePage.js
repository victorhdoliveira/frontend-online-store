import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        { list.length === 0 && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>) }
        <Link to="/shopping-card" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
      </div>
    );
  }
}

export default HomePage;
