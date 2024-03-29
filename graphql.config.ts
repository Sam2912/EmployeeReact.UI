import type { IGraphQLConfig } from "graphql-config";
import graphqlSchema from "./constants";

const config: IGraphQLConfig = {
  schema: graphqlSchema,
  documents: "src/**/*.gql",
};

export default config;
