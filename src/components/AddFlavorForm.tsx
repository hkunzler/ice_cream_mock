import { Button, Checkbox, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase";

const { Option } = Select;

const categoryOptions = ["CLASSIC", "LIMITED EDITION", "BOOZY DELIGHT"];

const AddFlavorForm = ({
  onFlavorAdd,
}: {
  onFlavorAdd: (flavor: any) => void;
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(firestore, "flavors"), {
        name: values.name,
        category: values.category,
        featured: values.featured || false,
        description: values.description || "",
      });
      const newFlavor = { id: docRef.id, ...values };
      onFlavorAdd(newFlavor);
      message.success("Flavor added successfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to add flavor");
      console.error("Error adding flavor: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label={"Flavor Name"}
        rules={[{ required: true, message: "Please enter the flavor name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category"
        label={"Category"}
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder={"Select a category"}>
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="description" label={"Description"}>
        <TextArea rows={4} placeholder={"Enter a description (optional)"} />
      </Form.Item>
      <Form.Item name="featured" valuePropName="checked">
        <Checkbox>{"Featured"}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Add Flavor
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddFlavorForm;
