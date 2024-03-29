import { ApolloClient, InMemoryCache } from "@apollo/client";
import graphqlSchema from '../constants';

const client = new ApolloClient({
  uri: graphqlSchema,
  cache: new InMemoryCache({
    possibleTypes: {
      Employee: [
        "IEmployee",
        "FullTimeEmployeeType",
        "PartTimeEmployeeType",
      ],
    },
  }),
});

export default client;
