
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const onFinish = async (values) => {
    console.log("payload", values);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          email: values.email,
          password: values.password
        }),
      });

      




      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Invalid credentials!");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token); // Store token in local storage
      message.success("Login Successful!");
      navigate("/quizdashboard"); // Redirect to dashboard after login
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup"); // Navigate to Signup page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              className="py-2 px-3"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="py-2 px-3"
            />
          </Form.Item>
 
          <Form.Item>
            <div className="flex justify-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <a href="/forgot-password" className="text-blue-500">Forgot password?</a>
            </div>
          </Form.Item> 
          {/* <Form.Item>
  <div className="flex justify-between">
    <Checkbox defaultChecked>Remember me</Checkbox>
    <a onClick={() => navigate("/forgot-password")} className="text-blue-500 cursor-pointer">
      Forgot password?
    </a>
  </div>
</Form.Item> */}




          

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={handleSignup}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;




