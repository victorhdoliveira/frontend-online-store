import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      list: [],
      stateResearch: false,
      valueInput: '',
    };
  }

  async componentDidMount() {
    const categoriesArray = await getCategories();
    this.setState({ categories: categoriesArray });
  }

  addValueInput = async ({ target }) => {
    this.setState({ valueInput: target.value });
  };

  getProductsFromCategoryAndQueryAPI = async () => {
    const { valueInput } = this.state;
    const researchReturn = await getProductsFromCategoryAndQuery(valueInput, valueInput);
    if (researchReturn === undefined) {
      this.setState({ stateResearch: true });
    } else if (researchReturn.results.length > 0) {
      this.setState({
        list: researchReturn.results,
        stateResearch: false,
      });
    } else {
      this.setState({ stateResearch: true });
    }
  };

  render() {
    const { list, categories, valueInput, stateResearch } = this.state;
    return (
      <>
        <div>
          { list && (
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
        <div>
          <input
            type="text"
            data-testid="query-input"
            value={ valueInput }
            onChange={ this.addValueInput }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.getProductsFromCategoryAndQueryAPI }
          >
            Buscar
          </button>
          { stateResearch ? <p data-testid="product">Nenhum produto foi encontrado</p> : (
            <ul>
              { list.map((item) => (
                <li key={ item.id } data-testid="product">
                  { item.title }
                  <br />
                  { item.price }
                  <br />
                  <img src={ item.thumbnail } alt={ item.title } />
                  <br />
                </li>
              ))}
            </ul>)}
        </div>
      </>
    );
  }
}

export default HomePage;
