import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import graphqlSchema from '../constants';
import { TOKEN } from './constants/constant';

// Create an http link
const httpLink = createHttpLink({
  uri: graphqlSchema,
});

// Create a middleware link to set the token in the request headers
const authLink = setContext((_, { headers }) => {
  // Get the token from your authentication method (e.g., localStorage)
  const token = localStorage.getItem(TOKEN);
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Attach the token to the Authorization header
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate the authLink with the httpLink
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
