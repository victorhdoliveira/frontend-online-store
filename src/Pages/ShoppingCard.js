import React from 'react';

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

  quant = (id) => {
    const { listShoppingCard } = this.state;
    const quant = listShoppingCard.filter((item) => item.id === id);
    return quant.length;
  };

  getListItem = () => {
    const itemString = localStorage.getItem('listCart');
    const itemObjeto = JSON.parse(itemString);
    this.setState((prev) => ({
      listShoppingCard: [...prev.listShoppingCard, itemObjeto],
    }));
  };

  render() {
    const { listShoppingCard } = this.state;
    return (
      <>
        <div>
          { listShoppingCard.length === 0 && (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>) }
        </div>
        <div>
          {listShoppingCard.map((item, ind) => (
            <section
              key={ ind }
              data-testid="shopping-cart-product-name"
            >
              <p>{item.title}</p>
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
