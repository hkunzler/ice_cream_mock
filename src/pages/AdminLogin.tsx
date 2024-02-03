import { Button, Card, Form, Input, Typography, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const { Title } = Typography;

const LoginContainer = styled(Card)`
  max-width: 300px;
  margin: 50px auto;
`;

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      message.error("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Title level={2}>Admin Login</Title>
      <Form
        name="admin_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder={"Email"} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
};

export default AdminLogin;
