import type { CodegenConfig } from "@graphql-codegen/cli";
import graphqlSchema from "./constants";

const config: CodegenConfig = {
  overwrite: true,
  schema: graphqlSchema,
  documents: "src/**/*.gql",
  generates: {
    "./src/gql/apolloGenerated.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    }
  },
};

export default config;
