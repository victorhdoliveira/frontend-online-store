/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getListItem, getProductByRealId } from '../services/api';
import '../styles/product.css';
import star from '../imgs/star_1.png';
import star2 from '../imgs/star_2.png';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      email: '',
      rating: 0,
      textareaInpt: '',
      error: false,
      review: [],
      valid: false,
    };
  }

  componentDidMount() {
    this.getDataFromProduct();
    this.getReviews();
  }

  saveReview = () => {
    const { match: { params } } = this.props;
    const { review } = this.state;
    localStorage.setItem(params.id, JSON.stringify(review));
  };

  getReviews = () => {
    const { match: { params } } = this.props;
    const valueReview = JSON.parse(localStorage.getItem(params.id));
    if (valueReview !== null) {
      this.setState({
        review: valueReview,
      });
    }
  };

  // peguei esse regex no stackoverflow
  validator = () => {
    const { email, rating } = this.state;
    const emailValidator = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    const valor = 0;
    const ratingValidator = rating > valor;
    return emailValidator && ratingValidator;
  };

  clickButton = () => {
    const { email, rating, textareaInpt, valid, review } = this.state;
    if (valid) {
      const dadosReview = { emailR: email, textareaInptR: textareaInpt, ratingR: rating };
      review.push(dadosReview);
      this.saveReview();
      this.setState({
        email: '',
        textareaInpt: '',
        valid: false,
      });
    } else {
      this.setState({ error: true });
    }
  };

  changeValid = () => {
    if (this.validator()) {
      this.setState({
        valid: true,
      });
    } else {
      this.setState({
        valid: false,
      });
    }
  };

  handleChangeInpt = (event) => {
    const { value, name } = event.target;
    const FIVE = '5';
    if (name === 'rating') {
      const img = document.querySelectorAll('.star');
      for (let i = 0; i < value; i += 1) { img[i].src = star2; }
      for (let j = +value; j < FIVE; j += 1) { img[j].src = star; }
    }
    this.setState({
      [name]: value,
      error: false,
    }, () => this.changeValid());
  };

  getDataFromProduct = async () => {
    const { match: { params } } = this.props;
    const data = await getProductByRealId(params.id);
    this.setState({ data });
  };

  addCarrinho = async () => {
    const { data } = this.state;
    const productsLocalStorage = JSON.parse(localStorage.getItem('listCart'));
    if (productsLocalStorage === null) {
      localStorage.setItem('listCart', JSON.stringify([data]));
    } else {
      localStorage.setItem('listCart', JSON
        .stringify([...productsLocalStorage, data]));
    }
  };

  render() {
    const { data, email, textareaInpt, error, review } = this.state;
    const { pictures } = data;
    const url = !pictures ? '' : pictures[0].url;
    return (
      <div className="container_main_product">
        <div className="box_header_product">
          <div className="header_title_product">
            <h1>FRONT-END</h1>
            <h3>Online Store</h3>
          </div>
          <h3>Detalhes</h3>
          <div className="header_product">
            <Link to="/shopping-card" data-testid="shopping-cart-button">
              <p data-testid="shopping-cart-size" id="qtdItems">{ getListItem() }</p>
            </Link>
          </div>
        </div>
        <div className="box_product">
          <div className="box_content_product">
            <h2 data-testid="product-detail-name">{data.title}</h2>
            <img
              src={ url }
              data-testid="product-detail-image"
              alt={ data.title }
              className="imgProduct"
            />
            <h3 data-testid="product-detail-price">
              {` Preço: R$ ${Number(data.price).toFixed(2)} `}
            </h3>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              className="btn_add_product"
              onClick={ this.addCarrinho }
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div className="box_content_product">
            <h2>Avaliações</h2>
            <input
              data-testid="product-detail-email"
              type="text"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChangeInpt }
            />
            <div>
              <label htmlFor="rating1">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  id="rating1"
                  onChange={ this.handleChangeInpt }
                  data-testid="1-rating"
                />
                <img src={ star } alt="1" className="star" />
              </label>
              <label htmlFor="rating2">
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  id="rating2"
                  onChange={ this.handleChangeInpt }
                  data-testid="2-rating"
                />
                <img src={ star } alt="2" className="star" />
              </label>
              <label htmlFor="rating3">
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  id="rating3"
                  onChange={ this.handleChangeInpt }
                  data-testid="3-rating"
                />
                <img src={ star } alt="3" className="star" />
              </label>
              <label htmlFor="rating4">
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  id="rating4"
                  onChange={ this.handleChangeInpt }
                  data-testid="4-rating"
                />
                <img src={ star } alt="4" className="star" />
              </label>
              <label htmlFor="rating5">
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  id="rating5"
                  onChange={ this.handleChangeInpt }
                  data-testid="5-rating"
                />
                <img src={ star } alt="5" className="star" />
              </label>
            </div>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Mensagem detalhada (opcional)"
              name="textareaInpt"
              rows="6"
              value={ textareaInpt }
              onChange={ this.handleChangeInpt }
            />
            <button
              type="button"
              className="btn_review"
              data-testid="submit-review-btn"
              onClick={ this.clickButton }
            >
              Avaliar
            </button>
            {error && <h3 data-testid="error-msg">Campos inválidos</h3>}
            <div className="box_reviews">
              {review.map((valor, index) => (
                <div key={ index }>
                  <p data-testid="review-card-email">{valor.emailR}</p>
                  <p data-testid="review-card-rating">{`Nota: ${valor.ratingR}`}</p>
                  <p data-testid="review-card-evaluation">{valor.textareaInptR}</p>
                  <hr />
                </div>))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Product;
