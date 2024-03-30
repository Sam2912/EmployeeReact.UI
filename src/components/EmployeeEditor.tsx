import React from "react";
import { useParams } from "react-router-dom";

function EmployeeEditor() {
  const { id } = useParams();

  // Now 'id' contains the employee ID from the URL
  // You can use this ID to fetch the employee data or perform other operations

  return (
    <div>
      <h2>Edit Employee {id}</h2>
      {/* Render your form or other components here */}
    </div>
  );
}

export default EmployeeEditor;
