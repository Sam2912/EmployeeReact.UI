import { ApolloError } from "@apollo/client";
import { message } from "antd";
import React, { createContext, useCallback, useContext, useState } from "react";

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

// Define the shape of the global error context
interface GlobalErrorHandlerContextType {
  globalError: string | null;
  handleError: (error: Error) => void;
  clearGlobalError: () => void;
}

const GlobalErrorHandlerContext =
  createContext<GlobalErrorHandlerContextType | null>(null);

export const useGlobalErrorHandler = () => {
  const context = useContext(GlobalErrorHandlerContext);
  if (!context) {
    throw new Error(
      "useGlobalErrorHandler must be used within a GlobalErrorHandlerProvider"
    );
  }
  return context;
};

export const GlobalErrorHandlerProvider: React.FC<GlobalErrorHandlerProps> = ({
  children,
}) => {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleError = useCallback((error: Error) => {
    const genericError = "An error occurred while processing your request.";

    if (error instanceof ApolloError) {
      if (
        error.networkError?.result?.errors[0]?.extensions?.code ===
        "ACCESS_DENIED"
      ) {
        const accessDenied =
          "Access Denied: You don't have permission to access this data.";
        message.error(accessDenied);
        setGlobalError(accessDenied);
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errorMessages = error.graphQLErrors.map(
          (graphQLError: any) => graphQLError.message
        );
        message.error(`GraphQL Error: ${errorMessages.join(", ")}`);
      } else if (error.networkError) {
        const networkError = "Network error occurred. Please try again.";
        message.error(networkError);
        setGlobalError(networkError);
      } else {
        message.error(genericError);
        setGlobalError(genericError);
      }
    } else {
      message.error(genericError);
      // Handle other errors as needed
      setGlobalError(genericError);
    }
  }, []);

  const clearGlobalError = () => {
    setGlobalError(null); // Clear the global error state
  };

  return (
    <GlobalErrorHandlerContext.Provider
      value={{ globalError, handleError, clearGlobalError }}
    >
      {children}
    </GlobalErrorHandlerContext.Provider>
  );
};
