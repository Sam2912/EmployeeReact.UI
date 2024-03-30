import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { Department, Status, EmployeeTypeEnum } from "../gql/apolloGenerated"; // Assuming enums are defined in a separate file

export interface EmployeeData {
  id?: string; // Optional since it might not be present in the form
  name: string;
  department: Department;
  hourlyRate?: number; // Optional for PartTime employees
  salary?: number; // Optional for FullTime employees
  status: Status;
  type: EmployeeTypeEnum;
}

interface EmployeeFormProps {
  onFinish: (values: EmployeeData) => void;
}

interface EmployeeTypeOptions {
  [key: string]: string;
}

export const employeeTypeOptions: EmployeeTypeOptions = {
  [EmployeeTypeEnum.FullTime]: "Full Time",
  [EmployeeTypeEnum.PartTime]: "Part Time",
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm<EmployeeData>();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
         onFinish(values);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleEmployeeTypeChange = (value: EmployeeTypeEnum) => {
    form.setFieldsValue({ hourlyRate: undefined, salary: undefined }); // Reset the fields when the type changes
  };

  return (
    <Form
      form={form}
      name="employee_form"
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <Form.Item
        label="Employee Type"
        name="type"
        initialValue={EmployeeTypeEnum.FullTime}
        rules={[
          { required: true, message: "Please select the employee type!" },
        ]}
        className="mb-4"
      >
        <Select onChange={handleEmployeeTypeChange} className="w-full">
          {Object.keys(employeeTypeOptions).map((key) => (
            <Select.Option key={key} value={key}>
              {employeeTypeOptions[key]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter the employee name!" }]}
        className="mb-4"
      >
        <Input className="w-full" />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[
          { required: true, message: "Please select the employee department!" },
        ]}
        className="mb-4"
      >
        <Select className="w-full">
          {Object.values(Department).map((dept) => (
            <Select.Option key={dept} value={dept}>
              {dept}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type
        }
        className="mb-4"
      >
        {({ getFieldValue }) =>
          getFieldValue("type") === EmployeeTypeEnum.FullTime ? (
            <Form.Item
              label="Salary"
              name="salary"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 0,
                  message: "Please enter a valid salary!",
                },
              ]}
              className="mb-4"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          ) : (
            <Form.Item
              label="Hourly Rate"
              name="hourlyRate"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 0,
                  message: "Please enter a valid hourly rate!",
                },
              ]}
              className="mb-4"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          )
        }
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          { required: true, message: "Please select the employee status!" },
        ]}
        className="mb-4"
      >
        <Select className="w-full">
          {Object.values(Status).map((sts) => (
            <Select.Option key={sts} value={sts}>
              {sts}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item className="mt-6">
        <Button type="primary" onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
