import  { Price }  from '../../gql/graphql'

export const filterPrices = (prices: Price[], currentSymbol: string) =>
  prices.filter((price) => price.currency.symbol === currentSymbol);
