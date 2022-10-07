import React from 'react';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        { list.length === 0 && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.

          </p>) }
      </div>
    );
  }
}

export default HomePage;
