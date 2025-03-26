import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Card, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset link!");
      }
      setEmail(values.email);
      setEmailSent(true);
      message.success("Verification code sent to your email!");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          confirmationCode: values.confirmationCode,
          newPassword: values.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password!");
      }
      message.success("Password reset successful! Please login.");
      navigate("/login"); // Redirect to login after password reset
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-md">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center text-blue-600 m-0">
            {emailSent ? "Reset Password" : "Forgot Password"}
          </Title>

          {!emailSent ? (
            <Form name="forgot-password" layout="vertical" onFinish={handleResetPassword}>
              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" className="py-2 px-3" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Reset Link
                </Button>
              </Form.Item>
              <p className="text-center text-gray-600">
                Remember your password? {" "}
                <button onClick={() => navigate("/")} className="text-blue-500 hover:underline">
                  Login
                </button>
              </p>
            </Form>
          ) : (
            <Form name="confirm-reset" layout="vertical" onFinish={handleConfirmReset}>
              <Form.Item
                name="confirmationCode"
                rules={[{ required: true, message: "Enter the verification code!" }]}
              >
                <Input placeholder="Verification Code" className="py-2 px-3" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[{ required: true, message: "Enter a new password!" }]}
              >
                <Input.Password placeholder="New Password" className="py-2 px-3" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default ForgotPassword;
