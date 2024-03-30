import React from "react";
import { FormInstance } from "antd/es/form";
import {
  FullTimeEmployeeType,
  PartTimeEmployeeType,
  Type,
  useAddEmployeeMutation,
  AddEmployeeMutationFn,
  FullTimeEmployeeInput,
  EmployeeTypeEnum,
  PartTimeEmployeeInput,
} from "../gql/apolloGenerated";
import EmployeeForm from "./EmployeeForm";
import { v4 } from "uuid";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface EmployeeCreatorProps {}

const EmployeeCreator: React.FC<EmployeeCreatorProps> = () => {
  const navigate = useNavigate();
  const [addEmployeeMutation, { data, loading, error }] =
    useAddEmployeeMutation();

  const handleCompleted =
    (form: FormInstance<FullTimeEmployeeType | PartTimeEmployeeType>) =>
    (data: AddEmployeeMutationFn["addEmployee"]): void => {
      message.success("Employee saved successfully!");
      form.resetFields();
      console.log(data);
      navigate(`/`);
    };

  const handleError =
    (form: FormInstance<FullTimeEmployeeType | PartTimeEmployeeType>) =>
    (
      error: any // You can use a more specific type for error handling
    ): void => {
      // Display GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errorMessages = error.graphQLErrors.map(
          (graphQLError: any) => graphQLError.message
        );
        message.error(`GraphQL Error: ${errorMessages.join(", ")}`);
      } else {
        message.error("An error occurred while saving the employee.");
      }
    };

  const onFinish = (
    form: FormInstance<FullTimeEmployeeType | PartTimeEmployeeType>,
    values: FullTimeEmployeeType | PartTimeEmployeeType
  ): void => {
    values.id = values.id ?? v4();
    switch (values.type) {
      case EmployeeTypeEnum.FullTime:
        addEmployeeMutation({
          variables: {
            create: {
              fullTimeEmployeeInput: {
                id: values.id,
                name: values.name,
                type: Type.FullTime,
                department: values.department,
                status: values.status,
                salary: (values as FullTimeEmployeeType).salary,
              } as FullTimeEmployeeInput,
            },
          },
          onCompleted: handleCompleted(form),
          onError: handleError(form),
        });
        break;
      case EmployeeTypeEnum.PartTime:
        addEmployeeMutation({
          variables: {
            create: {
              partTimeEmployeeInput: {
                id: values.id,
                name: values.name,
                type: Type.PartTime,
                department: values.department,
                status: values.status,
                hourlyRate: (values as PartTimeEmployeeType).hourlyRate,
              } as PartTimeEmployeeInput,
            },
          },
          onCompleted: handleCompleted(form),
          onError: handleError(form),
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <EmployeeForm onFinish={onFinish}></EmployeeForm>
    </>
  );
};

export default EmployeeCreator;
