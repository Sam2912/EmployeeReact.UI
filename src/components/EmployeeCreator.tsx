import form, { FormInstance } from "antd/es/form";
import {
  FullTimeEmployeeInput,
  PartTimeEmployeeInput,
  Type,
  useAddEmployeeMutation,
} from "../gql/apolloGenerated";
import EmployeeForm from "./EmployeeForm";
import { v4 } from "uuid";
import { message } from "antd";

interface EmployeeCreatorProps {}

const EmployeeCreator: React.FC<EmployeeCreatorProps> = () => {
  //const { loading, error, data } = useGetEmployeesQuery();
  const [addEmployeeMutation, { loading, error }] = useAddEmployeeMutation();

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
          onCompleted: (data) => {
            message.success("Employee saved successfully!");
            form.resetFields();
          },
          onError: (error) => {
            // Display GraphQL errors
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              const errorMessages = error.graphQLErrors.map(
                (graphQLError) => graphQLError.message
              );
              message.error(`GraphQL Error: ${errorMessages.join(", ")}`);
            } else {
              message.error("An error occurred while saving the employee.");
            }
          },
        });
        break;
      case Type.PartTime:
        addEmployeeMutation({
          variables: {
            create: {
              partTimeEmployeeInput: values,
            },
          },
          onCompleted: (data) => {
            message.success("Employee saved successfully!");
            form.resetFields();
          },
          onError: (error) => {
            // Display GraphQL errors
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              const errorMessages = error.graphQLErrors.map(
                (graphQLError) => graphQLError.message
              );
              message.error(`GraphQL Error: ${errorMessages.join(", ")}`);
            } else {
              message.error("An error occurred while saving the employee.");
            }
          },
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
