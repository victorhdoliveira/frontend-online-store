import React from 'react';
import { getProductByRealId } from '../services/api';

class ShoppingCard extends React.Component {
  constructor() {
    super();
    this.state = {
      listShoppingCard: [],
      produtosTest: [],
      ready: false,
    };
  }

  componentDidMount() {
    this.getListItem();
  }

  quant = (id) => {
    const { produtosTest } = this.state;
    const quant = produtosTest.filter((item) => item.id === id);
    return quant.length;
  };

  filtraList = (itemBreak) => {
    const arr = [...new Set(itemBreak)];
    const produtos = arr.map((item) => getProductByRealId(item));
    Promise.all(produtos).then((values) => this.setState({
      listShoppingCard: values,
      ready: true,
    }));
  };

  getListItem = () => {
    const itemString = localStorage.getItem('listCart');
    const itemBreak = itemString.split(' # ');
    const produtos = itemBreak.map((item) => getProductByRealId(item));
    Promise.all(produtos).then((values) => this.setState({
      produtosTest: values,
    }, this.filtraList(itemBreak)));
  };

  render() {
    const { produtosTest, listShoppingCard, ready } = this.state;
    return (
      <>
        <div>
          { produtosTest.length === 0 && (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>) }
        </div>
        <div>
          { ready && listShoppingCard.map((item, ind) => (
            <section
              key={ ind }
            >
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{item.price}</p>
              <p data-testid="shopping-cart-product-quantity">
                { `Quantidade ${this.quant(item.id)}`}
              </p>
            </section>
          ))}
        </div>
      </>
    );
  }
}

export default ShoppingCard;
