import React from "react";
import { FormInstance } from "antd/es/form";
import {
  FullTimeEmployeeInput,
  PartTimeEmployeeInput,
  Type,
  useAddEmployeeMutation,
  AddEmployeeMutationFn,
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
    (form: FormInstance<FullTimeEmployeeInput | PartTimeEmployeeInput>) =>
    (data: AddEmployeeMutationFn["addEmployee"]): void => {
      message.success("Employee saved successfully!");
      form.resetFields();
      console.log(data);
      navigate(`/`);
    };

  const handleError =
    (form: FormInstance<FullTimeEmployeeInput | PartTimeEmployeeInput>) =>
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
    form: FormInstance<FullTimeEmployeeInput | PartTimeEmployeeInput>,
    values: FullTimeEmployeeInput | PartTimeEmployeeInput
  ): void => {
    values.id = values.id ?? v4();
    switch (values.type) {
      case Type.FullTime:
        addEmployeeMutation({
          variables: {
            create: {
              fullTimeEmployeeInput: values,
            },
          },
          onCompleted: handleCompleted(form),
          onError: handleError(form),
        });
        break;
      case Type.PartTime:
        addEmployeeMutation({
          variables: {
            create: {
              partTimeEmployeeInput: values,
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
