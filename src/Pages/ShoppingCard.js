import React from 'react';

class ShoppingCard extends React.Component {
  constructor() {
    super();
    this.state = {
      listShoppingCard: [],
      ready: false,
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
      const seiLaPorra = arrayProductsNoRepeat.map((id) => (
        itemBreak.filter((item) => item.id === id)
      ));
      this.setState({
        listShoppingCard: seiLaPorra,
        ready: true,
      });
    }
  };

  render() {
    const { listShoppingCard, ready } = this.state;
    return (
      <div>
        { ready ? listShoppingCard.map((item, ind) => (
          <section
            key={ ind }
          >
            <p data-testid="shopping-cart-product-name">{item[0].title}</p>
            <img src={ item[0].thumbnail } alt={ item[0].title } />
            <p>{item[0].price}</p>
            <p data-testid="shopping-cart-product-quantity">
              { `Quantidade ${item.length}`}
            </p>
          </section>
        )) : (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>)}
      </div>

    );
  }
}
export default ShoppingCard;
