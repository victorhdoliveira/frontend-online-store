import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories, getListItem, getProductById, getProductsFromCategoryAndQuery,
} from '../services/api';
import searchIcon from '../imgs/search.png';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      productsFromCategory: [],
      stateCategory: false,
      list: [],
      stateResearch: false,
      valueInput: '',
      stateCart: true,
    };
  }

  async componentDidMount() {
    const categoriesArray = await getCategories();
    this.setState({ categories: categoriesArray });
    console.log(getListItem());
  }

  addValueInput = async ({ target }) => {
    this.setState({ valueInput: target.value });
  };

  getProductsFromCategoryAndQueryAPI = async () => {
    const { valueInput } = this.state;
    const researchReturn = await getProductsFromCategoryAndQuery(valueInput, valueInput);
    if ((researchReturn === undefined) || (researchReturn.results.length === 0)) {
      this.setState({
        stateCategory: '',
        stateResearch: true });
    } else {
      this.setState({
        stateCategory: '',
        list: researchReturn.results,
        stateResearch: false,
      });
    }
  };

  getProductsFromCategoryAP = async (id) => {
    const { stateCategory } = this.state;
    const productsFromCategory = await getProductById(id);
    this.setState({
      stateResearch: '',
      valueInput: '',
      productsFromCategory: productsFromCategory.results,
      stateCategory: !stateCategory,
    });
  };

  addProductShoppingCard = (product) => {
    this.setState({ stateCart: false });
    const productsLocalStorage = JSON.parse(localStorage.getItem('listCart'));
    if (productsLocalStorage === null) {
      localStorage.setItem('listCart', JSON.stringify([product]));
    } else {
      localStorage.setItem('listCart', JSON
        .stringify([...productsLocalStorage, product]));
    }
    this.setState({ stateCart: true });
    getListItem();
  };

  render() {
    const { list, categories, valueInput, stateResearch,
      productsFromCategory, stateCategory, stateCart } = this.state;
    return (
      <div className="container_main">
        <div className="box_header">
          <div className="header_title">
            <h1>FRONT-END</h1>
            <h3>Online Store</h3>
          </div>
          { list && (
            <p data-testid="home-initial-message">.</p>) }
          <div className="header_search">
            <input
              type="text"
              data-testid="query-input"
              value={ valueInput }
              onChange={ this.addValueInput }
              placeholder="Digite sua pesquisa"
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.getProductsFromCategoryAndQueryAPI }
            >
              <img src={ searchIcon } alt="pesquisa" />
            </button>
          </div>
          <div className="header_cart">
            <Link to="/shopping-card" data-testid="shopping-cart-button">
              { stateCart
            && (
              <p
                data-testid="shopping-cart-size"
                id="qtdItems"
              >
                { getListItem() }
              </p>)}
            </Link>
          </div>
        </div>
        <div className="box_content">
          <div className="categories">
            <h3>Categorias</h3>
            <ul>
              { categories.map((categorie) => (
                <li key={ categorie.id }>
                  <button
                    type="button"
                    data-testid="category"
                    onClick={ () => this.getProductsFromCategoryAP(categorie.id) }
                  >
                    { categorie.name }
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="content">
            { stateResearch
              ? (<h3 data-testid="product">Nenhum produto foi encontrado</h3>) : (
                !stateCategory && !stateResearch && (
                  <div className="items">
                    {/* <ul> */}
                    { list.map((item) => (
                      <section key={ item.id } data-testid="product" className="item">
                        <Link
                          to={ `/product/${item.id}` }
                          data-testid="product-detail-link"
                        >
                          { item.title }
                          { item.price }
                        </Link>
                        <img src={ item.thumbnail } alt={ item.title } />
                        {item.shipping.free_shipping && <img
                          data-testid="free-shipping"
                          src="https://img.irroba.com.br/fluzaoco/catalog/frete1.png"
                          alt="imagem frete gratis"
                        />}
                        <button
                          id={ item.id }
                          type="button"
                          data-testid="product-add-to-cart"
                          onClick={ () => this.addProductShoppingCard(item) }
                        >
                          Adicionar no carrinho
                        </button>
                      </section>))}
                    {/* </ul> */}
                  </div>
                ))}
            { !stateResearch && (
              <div className="items">
                {/* <ul> */}
                {stateCategory && productsFromCategory
                  .map((product) => (
                    <section key={ product.id } data-testid="product" className="item">
                      <Link
                        to={ `/product/${product.id}` }
                        data-testid="product-detail-link"
                      >
                        {product.title}
                        {product.price}
                      </Link>
                      <img src={ product.thumbnail } alt={ product.title } />
                      {product.shipping.free_shipping && <img
                        data-testid="free-shipping"
                        src="https://img.irroba.com.br/fluzaoco/catalog/frete1.png"
                        alt="imagem frete gratis"
                      />}
                      <button
                        id={ product.id }
                        type="button"
                        data-testid="product-add-to-cart"
                        onClick={ () => this.addProductShoppingCard(product) }
                      >
                        Adicionar no carrinho
                      </button>
                    </section>))}
                {/* </ul> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
