import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/',
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/graphql/queries.tsx'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    }
  },
  ignoreNoDocuments: true,
};

export default config;