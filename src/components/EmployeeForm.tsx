import React from "react";
import { Form, Input, Button, Select, InputNumber, FormInstance } from "antd";
import {
  Department,
  Status,
  EmployeeTypeEnum,
  FullTimeEmployeeType,
  PartTimeEmployeeType,
} from "../gql/apolloGenerated"; // Assuming enums are defined in a separate file

interface EmployeeFormProps {
  initialValues?: FullTimeEmployeeType | PartTimeEmployeeType;
  onFinish: (
    form: FormInstance<FullTimeEmployeeType | PartTimeEmployeeType>,
    values: FullTimeEmployeeType | PartTimeEmployeeType
  ) => void;
  onDelete?: (id: string) => void; // onDelete callback with employee ID
}

interface EmployeeTypeOptions {
  [key: string]: string;
}

const employeeTypeOptions: EmployeeTypeOptions = {
  [EmployeeTypeEnum.FullTime]: "Full Time",
  [EmployeeTypeEnum.PartTime]: "Part Time",
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onFinish,
  initialValues,
  onDelete,
}) => {
  const [form] = Form.useForm<FullTimeEmployeeType | PartTimeEmployeeType>();

  const onFinishFailed = (errorInfo: any) => {
    //console.log("Failed:", errorInfo);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(form, values);
      })
      .catch((errorInfo) => {
        //console.log("Validation failed:", errorInfo);
      });
  };

  const handleEmployeeTypeChange = (value: EmployeeTypeEnum) => {
    form.setFieldsValue({ hourlyRate: undefined, salary: undefined }); // Reset the fields when the type changes
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(initialValues?.id); // Pass the employee ID to onDelete callback
    }
  };

  return (
    <Form
      form={form}
      name="employee_form"
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <Form.Item name="id" hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label="Employee Type"
        name="type"
        initialValue={EmployeeTypeEnum.FullTime}
        rules={[
          { required: true, message: "Please select the employee type!" },
        ]}
        className="mb-4"
      >
        <Select
          onChange={handleEmployeeTypeChange}
          className="w-full"
          disabled={!!initialValues?.id}
        >
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
        <Button type="primary" onClick={handleSubmit}>
          Save
        </Button>
        {onDelete && (
          <Button type="primary" danger onClick={handleDelete} className="ml-4">
            Delete
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
