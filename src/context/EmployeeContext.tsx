import React, { createContext, useState, useContext, ReactNode } from "react";
import { FullTimeEmployeeType, PartTimeEmployeeType } from "../gql/apolloGenerated";

// Define the type for the context value
interface EmployeeContextType {
  selectedEmployee: FullTimeEmployeeType | PartTimeEmployeeType | null;
  selectEmployee: (employee: FullTimeEmployeeType | PartTimeEmployeeType) => void;
}

// Create the context
const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

// Custom hook to access the context
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within an EmployeeProvider");
  }
  return context;
};

// Define the EmployeeProvider component
interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<FullTimeEmployeeType | PartTimeEmployeeType | null>(null);

  const selectEmployee = (employee: FullTimeEmployeeType | PartTimeEmployeeType) => {
    setSelectedEmployee(employee);
  };

  return (
    <EmployeeContext.Provider value={{ selectedEmployee, selectEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
