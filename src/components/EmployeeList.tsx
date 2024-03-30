import React from "react";
import { useGetEmployeesQuery } from "../gql/apolloGenerated";
import EmployeeCard from "./EmployeeCard";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const navigate = useNavigate();
  const { loading, error, data } = useGetEmployeesQuery({
    fetchPolicy:'cache-and-network'
  });

  const handleCardClick = (employeeId: string) => {
    navigate(`/employees/${employeeId}/update`);
  };

  if (error) {
    message.error("Error while fetching the data");
  }

  return (
    <>
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
