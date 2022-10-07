import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      list: [],
    };
  }

  async componentDidMount() {
    const categoriesArray = await getCategories();
    this.setState({ categories: categoriesArray });
  }

  render() {
    const { list, categories } = this.state;
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
        <ul>
          { categories.map((categorie) => (
            <li key={ categories.id }>
              <button type="button" data-testid="category">
                { categorie.name }
              </button>
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
