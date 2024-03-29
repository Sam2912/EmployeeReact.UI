import "./App.css";
import { Button } from "antd";
import { useGetEmployeesQuery } from "./gql/apolloGenerated";

function App() {
  const { loading, error, data } = useGetEmployeesQuery();
  console.log(data?.employees);

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
          <Button type="primary">Button</Button>{" "}
        </>
      )}
    </>
  );
}

export default App;
