import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeList from "./EmployeeList";
import EmployeeCreator from "./EmployeeCreator";
import EmployeeEditor from "./EmployeeEditor";
import LoginForm from "./LoginForm";
import Landing from "./Landing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<ProtectedRoute element={<Landing />} />} />
      {/* <Route
        path="/employees"
        element={<ProtectedRoute element={<EmployeeList />} />}
      />
      <Route
        path="/employees/create"
        element={<ProtectedRoute element={<EmployeeCreator />} />}
      />
      <Route
        path="/employees/:id/update"
        element={<ProtectedRoute element={<EmployeeEditor />} />}
      /> */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute
            element={
              <>
                <Outlet />{" "}
                {/* This is where nested components will be rendered */}
              </>
            }
          />
        }
      >
        <Route index element={<EmployeeList />} />
        <Route path="create" element={<EmployeeCreator />} />
        <Route path=":id/update" element={<EmployeeEditor />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
