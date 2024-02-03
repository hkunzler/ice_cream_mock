import { Button, Form, Input, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase";

const AddAnnouncementForm: React.FC<{ onAnnouncementAdded: () => void }> = ({
  onAnnouncementAdded,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: { title: string; description: string }) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, "announcements"), {
        title: values.title,
        description: values.description,
      });
      message.success("Announcement added successfully");
      form.resetFields();
      onAnnouncementAdded();
    } catch (error) {
      message.error("Failed to add announcement");
      console.error("Error adding announcement: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        label={"Title"}
        rules={[
          {
            required: true,
            message: "Please input a title",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={"Description"}
        rules={[
          {
            required: true,
            message: "Please input a description",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Add Announcement
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAnnouncementForm;
