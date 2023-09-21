/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n   query AllCategoriesQuery {\n      categories {\n        name\n      }\n    }\n  ": types.AllCategoriesQueryDocument,
    "\n    query AllCurrenciesQuery {\n      currencies {\n        label\n        symbol\n      }\n    }\n  ": types.AllCurrenciesQueryDocument,
    "\n    query ProductQuery($id: String!) {\n      product(id: $id) {\n        id\n        name\n        inStock\n        gallery\n        description\n        category\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  ": types.ProductQueryDocument,
    "\n    query ProductAttributesQuery($id: String!) {\n      product(id: $id) {\n        id\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n      }\n    }\n  ": types.ProductAttributesQueryDocument,
    "\n    query ProductsByCategoryQuery($categoryType: String!) {\n      category(input: { title: $categoryType }) {\n        name\n        products {\n          id\n          name\n          brand\n          gallery\n          inStock\n          prices {\n            currency {\n              label\n              symbol\n            }\n            amount\n          }\n        }\n      }\n    }\n  ": types.ProductsByCategoryQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   query AllCategoriesQuery {\n      categories {\n        name\n      }\n    }\n  "): (typeof documents)["\n   query AllCategoriesQuery {\n      categories {\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AllCurrenciesQuery {\n      currencies {\n        label\n        symbol\n      }\n    }\n  "): (typeof documents)["\n    query AllCurrenciesQuery {\n      currencies {\n        label\n        symbol\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProductQuery($id: String!) {\n      product(id: $id) {\n        id\n        name\n        inStock\n        gallery\n        description\n        category\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  "): (typeof documents)["\n    query ProductQuery($id: String!) {\n      product(id: $id) {\n        id\n        name\n        inStock\n        gallery\n        description\n        category\n        prices {\n          currency {\n            label\n            symbol\n          }\n          amount\n        }\n        brand\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProductAttributesQuery($id: String!) {\n      product(id: $id) {\n        id\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query ProductAttributesQuery($id: String!) {\n      product(id: $id) {\n        id\n        attributes {\n          id\n          name\n          type\n          items {\n            displayValue\n            value\n            id\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProductsByCategoryQuery($categoryType: String!) {\n      category(input: { title: $categoryType }) {\n        name\n        products {\n          id\n          name\n          brand\n          gallery\n          inStock\n          prices {\n            currency {\n              label\n              symbol\n            }\n            amount\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query ProductsByCategoryQuery($categoryType: String!) {\n      category(input: { title: $categoryType }) {\n        name\n        products {\n          id\n          name\n          brand\n          gallery\n          inStock\n          prices {\n            currency {\n              label\n              symbol\n            }\n            amount\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;