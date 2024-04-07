// Landing.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Landing: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate

  const handleViewEmployeesClick = () => {
    navigate('/employees'); // Navigate to the /employees route
  };

  const handleAddEmployeeClick = () => {
    navigate('/employees/create'); // Navigate to the /employees/create route
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Employee Management System</h1>
        <p className="text-gray-700 mb-8">
          Welcome to our employee management system. Here, you can manage your employees efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Employee List</h2>
            <p className="mb-4">
              View the list of all employees in your organization.
            </p>
            <button
              className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
              onClick={handleViewEmployeesClick} // Call handleViewEmployeesClick on button click
            >
              View Employees
            </button>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Add New Employee</h2>
            <p className="mb-4">
              Add a new employee to your organization's database.
            </p>
            <button
              className="bg-white text-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-lg transition duration-300"
              onClick={handleAddEmployeeClick} // Call handleAddEmployeeClick on button click
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
