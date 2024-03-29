import { gql, useQuery } from "@apollo/client";
import "./App.css";
import { Button } from "antd";

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      __typename
      ...EmployeeDetails
    }
  }

  fragment EmployeeDetails on Employee {
    ... on IEmployee {
      id
      name
      department
      status
    }
    ... on FullTimeEmployeeType {
      id
      name
      department
      status
      salary
      type
    }
    ... on PartTimeEmployeeType {
      id
      name
      department
      status
      hourlyRate
      type
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  console.log(data);

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-red-700 text-blue-600">
        Hello world!
      </h1>
      <Button type="primary">Button</Button>
    </>
  );
}

export default App;
