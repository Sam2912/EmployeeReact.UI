import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import { FormInstance, message } from "antd";
import {
  EmployeeTypeEnum,
  FullTimeEmployeeInput,
  FullTimeEmployeeType,
  PartTimeEmployeeInput,
  PartTimeEmployeeType,
  Type,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../gql/apolloGenerated";
import EmployeeForm from "./EmployeeForm";

function EmployeeEditor() {
  // const { id } = useParams();
  const { selectedEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  const [updateEmployeeMutation, { data, loading, error }] =
    useUpdateEmployeeMutation();
  const [
    deleteEmployeeMutation,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useDeleteEmployeeMutation();
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
    switch (values.type) {
      case EmployeeTypeEnum.FullTime:
        updateEmployeeMutation({
          variables: {
            update: {
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
        updateEmployeeMutation({
          variables: {
            update: {
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

  const onDeleteHandler = (id: string): void => {
    deleteEmployeeMutation({
      variables: {
        delete: {
          employeeId: id,
        },
      },
      onCompleted: () => {
        message.success("Employee deleted successfully!");
        navigate(`/`);
      },
    });
  };

  return (
    <>
      {selectedEmployee && (
        <EmployeeForm
          initialValues={selectedEmployee}
          onFinish={onFinish}
          onDelete={onDeleteHandler}
        ></EmployeeForm>
      )}
    </>
  );
}

export default EmployeeEditor;
