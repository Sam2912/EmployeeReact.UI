// AppLayout.tsx
import React, { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { EmployeeProvider } from "../context/EmployeeContext";
import { useAuth } from "../context/AuthContext";
import AppRoutes from "./AppRoutes";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname;
    let key = "";
    switch (path) {
      case "/landing": // Add case for landing page
        key = "1";
        break;
      case "/employees":
        key = "2";
        break;
      case "/employees/create":
        key = "3";
        break;
      default:
        key = "";
        break;
    }

    setSelectedKeys([key]);
  }, [location.pathname]);

  const menuItems: ItemType<MenuItemType>[] = [
    {
      key: "1", // Key for Landing page
      label: (
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink to="/employees" className="nav-link">
          Employee List
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink to="/employees/create" className="nav-link">
          Create Employee
        </NavLink>
      ),
    },
    {
      key: "4", // Key for Logout button
      label: isAuthenticated && (
        <Button onClick={logout} type="link" icon={<LogoutOutlined />}>
          Logout
        </Button>
      ),
      style: { marginLeft: "auto" },
    },
  ];

  return (
    <EmployeeProvider>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={menuItems}
          ></Menu>
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
