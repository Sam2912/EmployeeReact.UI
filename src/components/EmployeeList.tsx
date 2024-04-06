import React from "react";
import { useGetEmployeesQuery } from "../gql/apolloGenerated";
import EmployeeCard from "./EmployeeCard";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useGlobalErrorHandler } from "../context/GlobalErrorHandlerContext";

function EmployeeList() {
  const navigate = useNavigate();
  const { selectEmployee } = useEmployeeContext(); // Access the selectEmployee function from context
  const { globalError, handleError } = useGlobalErrorHandler();

  const { loading, error, data } = useGetEmployeesQuery({
    fetchPolicy: "cache-and-network",
  });

  const handleCardClick = (employeeId: string) => {
    const selectedEmployee = data?.employees?.find(
      (employee) => employee && employee.id === employeeId
    );
    if (selectedEmployee) {
      selectEmployee(selectedEmployee);
      navigate(`/employees/${employeeId}/update`);
    } else {
      // Handle case where employee is not found
      message.error("Employee not found");
    }
  };

  // Handle error only once when it occurs
  React.useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

  return (
    <>
      {globalError && <p>{globalError}</p>}
      {loading ? (
        <h1>loading...</h1>
      ) : (
        data?.employees?.map(
          (employee, index) =>
            employee != null && (
              <EmployeeCard
                key={index}
                employee={employee}
                onClick={() => handleCardClick(employee.id)}
              />
            )
        )
      )}
    </>
  );
}

export default EmployeeList;
