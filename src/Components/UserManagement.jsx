// import React, { useState, useEffect } from "react";
// import { Table, Card, Button, Popconfirm, message } from "antd";
// import axios from "axios";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/usermanagement"); // Fetch from FastAPI backend
//       setUsers(response.data);
//     } catch (error) {
//       message.error("Failed to fetch users");
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/users/${id}`);
//       message.success("User deleted successfully");
//       fetchUsers();
//     } catch (error) {
//       message.error("Failed to delete user");
//     }
//   };

//   const columns = [
//     { title: "S. No", dataIndex: "sno", key: "sno", render: (_, __, index) => index + 1 },
//     { title: "Username", dataIndex: "username", key: "username" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <div className="flex space-x-2">
//           <Button type="primary" onClick={() => message.info("Edit feature coming soon!")}>Edit</Button>
//           <Popconfirm
//             title="Are you sure to delete this user?"
//             onConfirm={() => deleteUser(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="danger">Delete</Button>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center p-4">
//       <Card title="User Management" bordered={false} className="w-full max-w-3xl shadow-lg">
//         <Table dataSource={user} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
//       </Card>
//     </div>
//   );
// };

// export default UserManagement;







import React, { useState, useEffect } from "react";
import { Table, Card, Button, Popconfirm, message } from "antd";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/usermanagement");
      setUsers(response.data.rows);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const columns = [
    { title: "S. No", dataIndex: "id", key: "sno", render: (_, __, index) => index + 1 },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button type="primary" onClick={() => message.info("Edit feature coming soon!")}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <Card title="User Management" bordered={false} className="w-full max-w-3xl shadow-lg">
        <Table dataSource={users} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  );
};

export default UserManagement;
