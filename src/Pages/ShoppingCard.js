import React from 'react';

class ShoppingCard extends React.Component {
  constructor() {
    super();
    this.state = {
      listShoppingCard: [],
    };
  }

  render() {
    const { listShoppingCard } = this.state;
    return (
      <div>
        { listShoppingCard.length === 0 && (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>) }
      </div>
    );
  }
}

export default ShoppingCard;
