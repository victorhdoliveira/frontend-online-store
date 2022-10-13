export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await request.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query) {
    const request = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
    const json = await request.json();
    return json;
  }
}

export async function getProductById(categoryId) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const json = await request.json();
  return json;
}

export async function getProductByRealId(id) {
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await request.json();
  return data;
}

export function getListItem() {
  const itemString = localStorage.getItem('listCart');
  if (itemString !== null) {
    const itemBreak = JSON.parse(itemString);
    const ids = itemBreak.map((item) => item.id);
    const arrayProductsNoRepeat = ids
      .filter((product, index, array) => array.indexOf(product) === index);
    const arrayFiltered = arrayProductsNoRepeat.map((id) => (
      itemBreak.filter((item) => item.id === id)
    ));
    const qtItem = arrayFiltered.reduce((acc, curr) => {
      acc += curr.length;
      return acc;
    }, 0);
    localStorage.setItem('itemC', qtItem);
    return qtItem;
  }
  return 0;
}
