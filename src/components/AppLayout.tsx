import React, { useState, useEffect } from "react";
import { Button, Layout, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { EmployeeProvider } from "../context/EmployeeContext";
import { useAuth } from "../context/AuthContext";
import AppRoutes from "./AppRoutes";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname;
    const key = path === "/" ? "1" : path === "/employees/create" ? "2" : "";
    //setSelectedKeys([key]);
  }, [location.pathname]);

  return (
    <EmployeeProvider>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
            <Menu.Item key="1">
              <NavLink to="/employees" className="nav-link">
                Employee List
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/employees/create" className="nav-link">
                Create Employee
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3" style={{ marginLeft: "auto" }}> 
              <Button onClick={logout} type="link" icon={<LogoutOutlined />}>
                Logout
              </Button>
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
            <AppRoutes />
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
