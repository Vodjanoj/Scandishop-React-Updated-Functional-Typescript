import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const GRAPH_URL = "http://localhost:4000/";

export const client = new ApolloClient({
  uri: GRAPH_URL,
  cache: new InMemoryCache(),
});

export async function getCategories() {
  const query = gql`
    query {
      categories {
        name
      }
    }
  `;
  const {
    data: { categories },
  } = await client.query({ query });

  return categories;
}

export async function getCurrencies() {
  const query = gql`
    query {
      currencies {
        label
        symbol
      }
    }
  `;
  const {
    data: { currencies },
  } = await client.query({ query });
  return currencies;
}

export async function getProductsById(id) {
  const query = gql`
    query ProductQuery($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;
  const variables = { id };
  const {
    data: { product },
  } = await client.query({ query, variables });
  return product;
}

export async function getProductsAttributesById(id) {
  const query = gql`
    query ProductAttributesQuery($id: String!) {
      product(id: $id) {
        id
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  `;
  const variables = { id };
  const {
    data: {
      product: { attributes },
    },
  } = await client.query({ query, variables, fetchPolicy: "network-only" });

  return attributes;
}

export async function getProductsByCategory(categoryType) {
  const query = gql`
    query ProductsByCategoryQuery($categoryType: String!) {
      category(input: { title: $categoryType }) {
        name
        products {
          id
          name
          brand
          gallery
          inStock
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;
  const variables = { categoryType };
  const {
    data: {
      category: { products },
    },
  } = await client.query({ query, variables });

  return products;
}
