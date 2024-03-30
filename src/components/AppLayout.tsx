import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import EmployeeCreator from "./EmployeeCreator";
import EmployeeEditor from "./EmployeeEditor";
import { EmployeeProvider } from "../context/EmployeeContext";

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname;
    const key = path === "/" ? "1" : path === "/employees/create" ? "2" : "";
    setSelectedKeys([key]);
  }, [location.pathname]);

  return (
    <EmployeeProvider>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
            <Menu.Item key="1">
              <NavLink to="/" className="nav-link">
                Employee List
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/employees/create" className="nav-link">
                Create Employee
              </NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{ padding: "0 50px", flex: "1 0 auto", marginBottom: "60px" }}
        >
          <div
            className="site-layout-content"
            style={{ minHeight: "calc(100vh - 160px)" }}
          >
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/employees/create" element={<EmployeeCreator />} />
              <Route
                path="/employees/:id/update"
                element={<EmployeeEditor />}
              />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            marginTop: "auto",
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#001529", // Dark background color
            color: "white", // Text color
            padding: "8px 16px", // Adjust padding here
            fontSize: "14px", // Adjust font size here
          }}
        >
          Employee Management System
        </Footer>
      </Layout>
    </EmployeeProvider>
  );
};

export default AppLayout;
