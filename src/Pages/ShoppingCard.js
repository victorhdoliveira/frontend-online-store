import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shopping_card.css';
import plus from '../imgs/plus-cart.png';
import minus from '../imgs/minus-cart.png';
import del from '../imgs/del-cart.png';

class ShoppingCard extends React.Component {
  constructor() {
    super();
    this.state = {
      listShoppingCard: [],
    };
  }

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

  removeItem = ({ target: { name } }) => {
    const { listShoppingCard } = this.state;
    const id = name;
    const allItems = listShoppingCard;
    const newList = allItems.map((list) => list.filter((item) => item.id !== id));
    const tiraArrayVazio = newList.filter((array) => array.length > 0);
    localStorage.setItem('listCart', JSON.stringify(tiraArrayVazio));
    this.setState({
      listShoppingCard: tiraArrayVazio,
    });
  };

  mudaQuantItem = ({ target: { name, className } }) => {
    console.log(className);
    const { listShoppingCard } = this.state;
    console.log(listShoppingCard);
    const id = name;
    console.log(id);
    listShoppingCard.forEach((arrItem, ind, arr) => {
      if (arrItem[0].id === id) {
        if (className === 'sum' && arrItem[0].available_quantity > arrItem.length) {
          arrItem.push(arrItem[0]);
          this.setState({ listShoppingCard: arr });
        } else if (className === 'sub' && arrItem.length > 1) {
          arrItem.shift(arrItem[0]);
          this.setState({ listShoppingCard: arr });
        }
      }
    });
  };

  render() {
    const { listShoppingCard } = this.state;
    return (
      <div className="container_main_cart">
        <div className="box_header_cart">
          <div className="header_title_cart">
            <h1>FRONT-END</h1>
            <h3>Online Store</h3>
          </div>
          <h3>Carrinho de Compras</h3>
        </div>
        <div className="box_cart">
          <div className="box_content_cart">
            { listShoppingCard.length > 0 ? listShoppingCard.map((item, ind) => (
              <section
                className="item_cart"
                key={ ind }
              >
                <h3 data-testid="shopping-cart-product-name">{item[0].title}</h3>
                <img src={ item[0].thumbnail } alt={ item[0].title } />
                <h3>
                  R$
                  { (item[0].price).toFixed(2) }
                </h3>
                <h3 data-testid="shopping-cart-product-quantity">
                  { `Quantidade ${item.length}`}
                </h3>
                <div className="buttons_cart">
                  <button
                    name={ item[0].id }
                    type="button"
                    id="addButton"
                    value="sum"
                    onClick={ this.mudaQuantItem }
                    data-testid="product-increase-quantity"
                  >
                    <img
                      src={ plus }
                      name={ item[0].id }
                      alt="increase item"
                      className="sum"
                    />
                  </button>
                  <button
                    type="button"
                    name={ item[0].id }
                    id="decButton"
                    value="sub"
                    onClick={ this.mudaQuantItem }
                    data-testid="product-decrease-quantity"
                  >
                    <img
                      src={ minus }
                      name={ item[0].id }
                      alt="decrease item"
                      className="sub"
                    />
                  </button>
                  <button
                    type="button"
                    data-testid="remove-product"
                    id="removeButton"
                    onClick={ this.removeItem }
                    name={ item[0].id }
                  >
                    <img
                      src={ del }
                      alt="remove item"
                      name={ item[0].id }
                    />
                  </button>
                </div>
              </section>
            )) : (
              <h3
                className="message_cart"
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </h3>)}
          </div>
          <div className="box_checkout_cart">
            { listShoppingCard.length > 0 && (
              <Link to="/checkout">
                <button
                  type="button"
                  data-testid="checkout-products"
                >
                  Finalizar compra
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ShoppingCard;
