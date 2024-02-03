import { Button, Form, Input, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";

const FlavorForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: { name: string; description: string }) => {
    try {
      await addDoc(collection(firestore, "flavors"), {
        name: values.name,
        description: values.description,
      });
      message.success("Flavor added successfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to add flavor");
      console.error("Error adding flavor: ", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label={"Flavor Name"} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={"Description"}
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Flavor
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FlavorForm;
