/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type Attribute = {
  __typename?: "Attribute";
  displayValue?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  value?: Maybe<Scalars["String"]["output"]>;
};

export type AttributeSet = {
  __typename?: "AttributeSet";
  id: Scalars["String"]["output"];
  items?: Maybe<Array<Maybe<Attribute>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Category = {
  __typename?: "Category";
  name?: Maybe<Scalars["String"]["output"]>;
  products: Array<Maybe<Product>>;
};

export type CategoryInput = {
  title: Scalars["String"]["input"];
};

export type Currency = {
  __typename?: "Currency";
  label: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
};

export type Price = {
  length: number;
  __typename?: "Price";
  amount: Scalars["Float"]["output"];
  currency: Currency;
};

export type Product = {
  __typename?: "Product";
  attributes?: Maybe<Array<Maybe<AttributeSet>>>;
  brand: Scalars["String"]["output"];
  category: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  gallery?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  id: Scalars["String"]["output"];
  inStock?: Maybe<Scalars["Boolean"]["output"]>;
  name: Scalars["String"]["output"];
  prices: Array<Price>;
};

export type Query = {
  __typename?: "Query";
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  currencies?: Maybe<Array<Maybe<Currency>>>;
  product?: Maybe<Product>;
};

export type QueryCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type QueryProductArgs = {
  id: Scalars["String"]["input"];
};

export type AllCategoriesQueryQueryVariables = Exact<{ [key: string]: never }>;

export type AllCategoriesQueryQuery = {
  __typename?: "Query";
  categories?: Array<{
    __typename?: "Category";
    name?: string | null;
  } | null> | null;
};

export type AllCurrenciesQueryQueryVariables = Exact<{ [key: string]: never }>;

export type AllCurrenciesQueryQuery = {
  __typename?: "Query";
  currencies?: Array<{
    __typename?: "Currency";
    label: string;
    symbol: string;
  } | null> | null;
};

export type ProductQueryQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type ProductQueryQuery = {
  __typename?: "Query";
  product?: {
    __typename?: "Product";
    id: string;
    name: string;
    inStock?: boolean | null;
    gallery?: Array<string | null> | null;
    description: string;
    category: string;
    brand: string;
    prices: Array<{
      __typename?: "Price";
      amount: number;
      currency: { __typename?: "Currency"; label: string; symbol: string };
    }>;
  } | null;
};

export type ProductAttributesQueryQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type ProductAttributesQueryQuery = {
  __typename?: "Query";
  product?: {
    __typename?: "Product";
    id: string;
    attributes?: Array<{
      __typename?: "AttributeSet";
      id: string;
      name?: string | null;
      type?: string | null;
      items?: Array<{
        __typename?: "Attribute";
        displayValue?: string | null;
        value?: string | null;
        id: string;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type ProductsByCategoryQueryQueryVariables = Exact<{
  categoryType: Scalars["String"]["input"];
}>;

export type ProductsByCategoryQueryQuery = {
  __typename?: "Query";
  category?: {
    __typename?: "Category";
    name?: string | null;
    products: Array<{
      __typename?: "Product";
      id: string;
      name: string;
      brand: string;
      gallery?: Array<string | null> | null;
      inStock?: boolean | null;
      prices: Array<{
        __typename?: "Price";
        amount: number;
        currency: { __typename?: "Currency"; label: string; symbol: string };
      }>;
    } | null>;
  } | null;
};

export const AllCategoriesQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllCategoriesQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllCategoriesQueryQuery,
  AllCategoriesQueryQueryVariables
>;
export const AllCurrenciesQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllCurrenciesQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currencies" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "symbol" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllCurrenciesQueryQuery,
  AllCurrenciesQueryQueryVariables
>;
export const ProductQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProductQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "inStock" } },
                { kind: "Field", name: { kind: "Name", value: "gallery" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "prices" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currency" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "symbol" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "brand" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductQueryQuery, ProductQueryQueryVariables>;
export const ProductAttributesQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProductAttributesQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attributes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "items" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "displayValue" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProductAttributesQueryQuery,
  ProductAttributesQueryQueryVariables
>;
export const ProductsByCategoryQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProductsByCategoryQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "categoryType" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "title" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "categoryType" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "products" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "brand" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gallery" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "inStock" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prices" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "currency" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "symbol" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "amount" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProductsByCategoryQueryQuery,
  ProductsByCategoryQueryQueryVariables
>;
