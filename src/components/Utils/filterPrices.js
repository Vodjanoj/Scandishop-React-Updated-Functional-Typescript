export const filterPrices = (prices, currentSymbol) =>
  prices.filter((price) => price.currency.symbol === currentSymbol);
