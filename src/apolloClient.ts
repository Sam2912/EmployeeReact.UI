import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5018/graphql",
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
