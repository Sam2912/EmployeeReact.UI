import { Form, Input, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
import { useGenerateJwtTokenLazyQuery } from "../gql/apolloGenerated";
import React from "react";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  
  const [generateJwtToken, { loading, error, data }] =
    useGenerateJwtTokenLazyQuery();

  const handleFinish = (values: any): void => {
    form
      .validateFields()
      .then(() => {
        generateJwtToken({
          variables: { username: values.username, password: values.password },
        });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  // Redirect to the landing page upon successful login
  React.useEffect(() => {
  if (data) {
      if (data.generateJwtToken?.success) {
        login(data.generateJwtToken.token);
        message.success("Login successful!");
        // Navigate to the landing page upon successful login
        navigate("/");
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    }
  }, [data, navigate]);

  if (loading) <h1>loading...</h1>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <Form
          form={form}
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
