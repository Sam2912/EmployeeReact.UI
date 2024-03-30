import { useAddEmployeeMutation } from "../gql/apolloGenerated";
import EmployeeForm, { EmployeeData } from "./EmployeeForm";
import { v4 } from "uuid";

interface EmployeeCreatorProps{}

const EmployeeCreator: React.FC<EmployeeCreatorProps> = () => {
  //const { loading, error, data } = useGetEmployeesQuery();
  const [addEmployeeMutation, { loading, error }] = useAddEmployeeMutation();

  if (error) {
    return <h1>Some Error</h1>;
  }
  const onFinish = (values: EmployeeData): void => {
    values.id = values.id ?? v4();
    addEmployeeMutation({
      variables: {
        create: {
          //partTimeEmployeeInput: values
          // {
          //   id: 7,
          //   name: "Seema",
          //   department: Department.It,
          //   hourlyRate: 7000,
          //   status: Status.Active,
          //   type: Type.PartTime,
          // },
        },
      },
      onCompleted: (data) => console.log(data),
      onError: (error) => console.log(error),
    });
  };

  return (
    <>
      <EmployeeForm onFinish={onFinish}></EmployeeForm>
    </>
  );
}

export default EmployeeCreator;
