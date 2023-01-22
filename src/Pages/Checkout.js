/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import barcode from '../imgs/barcode-product.png';
import master from '../imgs/mastercard-48.png';
import paypal from '../imgs/paypal-48.png';
import visa from '../imgs/visa-48.png';
import '../styles/checkout.css';

class Checkout extends React.Component {
  state = {
    listShoppingCard: [],
    name: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    cep: '',
    address: '',
    radio: undefined,
    inputInvalid: false,
  };

  componentDidMount() {
    this.getListItem();
  }

  getListItem = () => {
    const itemString = localStorage.getItem('listCart');
    if (itemString !== null) {
      const itemBreak = JSON.parse(itemString);
      const ids = itemBreak.map((item) => item.id);
      const arrayProductsNoRepeat = ids
        .filter((product, index, array) => array.indexOf(product) === index);
      const arrayFiltered = arrayProductsNoRepeat.map((id) => (
        itemBreak.filter((item) => item.id === id)
      ));
      this.setState({
        listShoppingCard: arrayFiltered,
      });
    }
  };

  finalizaForm = () => {
    const { history } = this.props;
    const { name, email, cpf, phoneNumber, cep, address, radio } = this.state;
    const min = 3;
    const minCep = 8;
    const minPhone = 11;
    const nameOk = name.length > min;
    const emailOk = email.length > min;
    const cpfOk = cpf.length === minPhone;
    const phoneNumberOk = phoneNumber.length === minPhone;
    const cepOk = cep.length === minCep;
    const addressOk = address.length > min;
    const arrayValida = [nameOk,
      emailOk, cpfOk, phoneNumberOk, cepOk, addressOk, radio];
    const validaBtn = arrayValida.every((ele) => ele);
    if (!validaBtn) {
      this.setState({ inputInvalid: true });
    } else {
      this.setState({ inputInvalid: false });
      localStorage.clear();
      history.push('/');
    }
  };

  attEstado = ({ target }) => {
    const { id, type, value } = target;
    if (type === 'radio') {
      this.setState({ radio: value });
    } else {
      this.setState({ [id]: value });
    }
  };

  render() {
    const { listShoppingCard, name, email, cpf, phoneNumber,
      cep, address, inputInvalid } = this.state;
    return (
      <div className="container_main_checkout">
        <div className="box_header_checkout">
          <div className="header_title_checkout">
            <h1>FRONT-END</h1>
            <h3>Online Store</h3>
          </div>
          <h3>Pagamento</h3>
        </div>
        <div className="box_checkout">
          <div className="box_content_checkout">
            {listShoppingCard.map((item, ind) => (
              <section className="item_cart_checkout" key={ ind }>
                <h3 data-testid="shopping-cart-product-name">{item[0].title}</h3>
                <img src={ item[0].thumbnail } alt={ item[0].title } />
                <h3>{ `R$ ${(item[0].price).toFixed(2)}` }</h3>
                <h3 data-testid="shopping-cart-product-quantity">
                  { `Quantidade ${item.length}`}
                </h3>
              </section>
            ))}
            { inputInvalid && <h4 data-testid="error-msg">Campos inválidos</h4> }
          </div>
          <form className="form_checkout">
            <fieldset className="form_personal">
              <legend>Informações da compra</legend>
              <div className="personal_inf">
                <label htmlFor="name" className="name">
                  Nome:
                  <input
                    id="name"
                    type="text"
                    value={ name }
                    data-testid="checkout-fullname"
                    onChange={ this.attEstado }
                    placeholder="Nome Completo"
                    required
                  />
                </label>
                <label htmlFor="email" className="email">
                  E-mail:
                  <input
                    id="email"
                    type="text"
                    value={ email }
                    data-testid="checkout-email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    onChange={ this.attEstado }
                    placeholder="exemplo@email.com"
                    required
                  />
                </label>
              </div>
              <div className="box_inf">
                <label htmlFor="cpf">
                  CPF:
                  <input
                    id="cpf"
                    type="text"
                    value={ cpf }
                    data-testid="checkout-cpf"
                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                    placeholder="###.###.###-##"
                    onChange={ this.attEstado }
                    required
                  />
                </label>
                <label htmlFor="phoneNumber">
                  Telefone:
                  <input
                    id="phoneNumber"
                    type="text"
                    value={ phoneNumber }
                    data-testid="checkout-phone"
                    onChange={ this.attEstado }
                    placeholder="## #### ####"
                    required
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className="form_end">
              <legend>Endereço</legend>
              <label htmlFor="address">
                Rua, estrada, avenida:
                <input
                  id="address"
                  type="text"
                  value={ address }
                  data-testid="checkout-address"
                  onChange={ this.attEstado }
                  required
                />
              </label>
              <label htmlFor="cep">
                CEP:
                <input
                  id="cep"
                  type="text"
                  value={ cep }
                  data-testid="checkout-cep"
                  onChange={ this.attEstado }
                  required
                />
              </label>
            </fieldset>
            <fieldset className="form_payment">
              <legend>Método de Pagamento:</legend>
              <label htmlFor="Ticket" className="payment">
                <input
                  id="Ticket"
                  name="radio"
                  type="radio"
                  value="Ticket"
                  data-testid="ticket-payment"
                  onChange={ this.attEstado }
                />
                <img src={ barcode } alt="Código de Barras" />
              </label>
              <label htmlFor="Visa" className="payment">
                <input
                  id="Visa"
                  name="radio"
                  type="radio"
                  value="Visa"
                  data-testid="visa-payment"
                  onChange={ this.attEstado }
                />
                <img src={ visa } alt="Visa" />
              </label>
              <label htmlFor="Master" className="payment">
                <input
                  id="Master"
                  name="radio"
                  type="radio"
                  value="Master"
                  data-testid="master-payment"
                  onChange={ this.attEstado }
                />
                <img src={ master } alt="Master" />
              </label>
              <label htmlFor="Elo" className="payment">
                <input
                  id="Elo"
                  name="radio"
                  type="radio"
                  value="Elo"
                  data-testid="elo-payment"
                  onChange={ this.attEstado }
                />
                <img src={ paypal } alt="PayPal" />
              </label>
            </fieldset>
            <button
              className="btnCheckout"
              type="button"
              data-testid="checkout-btn"
              onClick={ this.finalizaForm }
            >
              Finalizar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = { history: PropTypes.objectOf().isRequired };
export default Checkout;
