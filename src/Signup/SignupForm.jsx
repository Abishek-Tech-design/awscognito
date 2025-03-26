
import { useState } from "react";
import { Form, Input, Button, message, Typography, Card, Space } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("payload", values);
    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed!");
      }

      const data = await response.json();
      
      // Store token in localStorage for future requests
      localStorage.setItem("token", data.access_token);
      
      message.success("Signup Successful!");
      form.resetFields();
      
      // Optionally redirect to login or dashboard
      // window.location.href = "/dashboard";
      
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Validator to check password match
  const validatePasswordMatch = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match!"));
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-md">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center text-blue-600 m-0">
            Create Account
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
                { min: 3, message: "Username must be at least 3 characters!" },
                { 
                  pattern: /^[a-zA-Z0-9]+$/, 
                  message: "Username must be alphanumeric!" 
                }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 8, message: "Password must be at least 8 characters!" }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                validatePasswordMatch,
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-600 h-10 text-base"
                size="large"
              >
                Sign Up
              </Button>
            </Form.Item>
                        
            <div className="text-center text-gray-500">
              Already have an account? <a href="/" className="text-blue-600">Log in</a>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default SignupForm;



// import { useState } from "react";
// import { Form, Input, Button, Typography } from "antd";
// import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const SignupForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();

//   const onFinish = async (values) => {
//     console.log("payload", values);
//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || "Signup failed!");
//       }

//       const data = await response.json();
//       localStorage.setItem("token", data.access_token);

//       message.success("Signup Successful!");
//       form.resetFields();
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
//       <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white border border-gray-300">
//         <Title level={2} className="text-center text-gray-900 mb-4">
//           Create Account
//         </Title>
//         <Text className="block text-center text-gray-600 mb-6">
//           Sign up to access exclusive features
//         </Text>

//         <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
//           <Form.Item name="username" rules={[{ required: true, message: "Enter your username" }]}> 
//             <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Username" className="border-gray-300" />
//           </Form.Item>

//           <Form.Item name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}> 
//             <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email" className="border-gray-300" />
//           </Form.Item>

//           <Form.Item name="password" rules={[{ required: true, min: 8, message: "At least 8 characters" }]}> 
//             <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Password" className="border-gray-300" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 rounded-lg">
//               Sign Up
//             </Button>
//           </Form.Item>

//           <div className="text-center text-gray-500">
//             Already have an account? <a href="/" className="text-blue-600 font-medium hover:underline">Log in</a>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
