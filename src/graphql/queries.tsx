import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
 import { graphql } from "../gql";
 

const GRAPH_URL = "https://serv1-lich.onrender.com";

export const client = new ApolloClient({
  uri: GRAPH_URL,
  cache: new InMemoryCache(),
});

export async function getCategories() {
  const query = graphql(`
   query AllCategoriesQuery {
      categories {
        name
      }
    }
  `);
  const {
    data: { categories },
  } = await client.query({ query });

  return categories;
}

export async function getCurrencies() {
  const query = graphql(`
    query AllCurrenciesQuery {
      currencies {
        label
        symbol
      }
    }
  `);
  const {
    data: { currencies },
  } = await client.query({ query });
  return currencies;
}

export async function getProductDetailsById(id: string) {
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

export async function getProductsAttributesById(id:string) {
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

export async function getProductsByCategory(categoryType:string) {
  const query = graphql(`
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
  `);
  const variables = { categoryType };
  const { data }  = await client.query({ query, variables });
  return data.category?.products || [] ;
}
