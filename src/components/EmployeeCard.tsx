import React from "react";
import { Card, Tag } from "antd";
import {
  Status,
  EmployeeTypeEnum,
  FullTimeEmployeeType,
  PartTimeEmployeeType,
} from "../gql/apolloGenerated"; // Assuming enums are defined in a separate file

interface EmployeeCardProps {
  employee: FullTimeEmployeeType | PartTimeEmployeeType;
  onClick?: (employeeId: string) => void; // Callback function to handle click
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(employee.id); // Pass the employee ID back on click
    }
  };

  return (
    <Card
      title={employee.name}
      className="w-full max-w-md mx-auto mb-4"
      bordered={false}
      onClick={handleCardClick} // Attach onClick handler to the card
    >
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      {employee.type === EmployeeTypeEnum.FullTime ? (
        <p>
          <strong>Salary:</strong> {(employee as FullTimeEmployeeType).salary}
        </p>
      ) : (
        <p>
          <strong>Hourly Rate:</strong>{" "}
          {(employee as PartTimeEmployeeType).hourlyRate}
        </p>
      )}
      <p>
        <strong>Status:</strong>{" "}
        <Tag color={employee.status === Status.Active ? "green" : "red"}>
          {employee.status}
        </Tag>
      </p>
      <p>
        <strong>Type:</strong>{" "}
        <Tag
          color={
            employee.type === EmployeeTypeEnum.FullTime ? "blue" : "orange"
          }
        >
          {employee.type}
        </Tag>
      </p>
    </Card>
  );
};

export default EmployeeCard;
