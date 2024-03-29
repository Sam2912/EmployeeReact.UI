import "./App.css";
import { Button } from "antd";
import {
  Department,
  Status,
  Type,
  useAddEmployeeMutation,
  useGetEmployeesQuery,
} from "./gql/apolloGenerated";

function App() {
  //const { loading, error, data } = useGetEmployeesQuery();
  const [addEmployeeMutation, {  loading, error }] =
    useAddEmployeeMutation();

  function save() {
    addEmployeeMutation({
      variables: {
        create: {
          partTimeEmployeeInput: {
            id: 7,
            name: "Seema",
            department: Department.It,
            hourlyRate: 7000,
            status: Status.Active,
            type: Type.PartTime,
          },
        },
      },
      onCompleted:(data)=> console.log(data),
      onError:(error)=>console.log(error)
    });
  }
  if (error) {
    return <h1>Some Error</h1>;
  }

  return (
    <>
      {loading ? (
        <h1>loading....</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold underline bg-red-700 text-blue-600">
            Hello world!
          </h1>
          <Button type="primary" onClick={save}>
            Button
          </Button>{" "}
        </>
      )}
    </>
  );
}

export default App;
