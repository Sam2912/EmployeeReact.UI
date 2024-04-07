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
      <Route
        path="/"
        element={
          <ProtectedRoute
            allowedRoles={["Admin", "IT"]}
            element={<Landing />}
          />
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute
            element={
              <>
                <Outlet />
                {/* This is where nested components will be rendered */}
              </>
            }
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRoute
              allowedRoles={["Admin", "IT"]}
              element={<EmployeeList />}
            />
          }
        />
        <Route
          path="create"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
              element={<EmployeeCreator />}
            />
          }
        />
        <Route
          path=":id/update"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
              element={<EmployeeEditor />}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
