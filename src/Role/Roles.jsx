// import React, { useState, useEffect } from "react";
// import { Layout, Menu, Button, Table, Input, Spin, message, Avatar, Dropdown, Tag } from "antd";
// import { 
//   UserOutlined,
//   LogoutOutlined,
//   DashboardOutlined,
//   ProjectOutlined,
//   DeleteOutlined,
//   EyeOutlined
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const { Header, Content, Sider } = Layout;

// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8000/api/projects");
//       if (!response.ok) throw new Error("Failed to fetch projects");
//       const data = await response.json();
//       setProjects(data.rows || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       message.error("Failed to load projects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value.toLowerCase());
//   };

//   const filteredProjects = projects.filter(project =>
//     Object.values(project).some(value =>
//       String(value).toLowerCase().includes(searchText)
//     )
//   );

//   const columns = [
//     { title: "Project Title", dataIndex: "project_title", key: "project_title" },
//     { title: "Project Owner", dataIndex: "project_owner", key: "project_owner" },
//     { title: "Project Status", dataIndex: "project_status", key: "project_status", render: status => <Tag>{status}</Tag> },
//     { title: "Description", dataIndex: "description", key: "description" },
//     { 
//       title: "Action", 
//       key: "action", 
//       render: (_, record) => (
//         <>
//           <Button type="link" icon={<EyeOutlined />} onClick={() => message.info("View " + record.project_title)} />
//           <Button type="link" danger icon={<DeleteOutlined />} onClick={() => message.error("Delete " + record.project_title)} />
//         </>
//       )
//     }
//   ];

//   const profileMenuItems = [
//     { key: 'change-password', label: 'Change Password', onClick: () => navigate("/change-password") },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider width={250} style={{ background: "#fff" }}>
//         <div className="text-center py-4 text-xl font-bold text-blue-600">DANONE</div>
//         <Menu mode="inline" selectedKeys={["Projects"]} items={[{ key: "Projects", label: "Projects", icon: <ProjectOutlined /> }]} />
//         <Menu mode="inline" items={[{ key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: () => navigate("/") }]} />
//       </Sider>

//       <Layout>
//         {/* Header */}
//         <Header className="bg-white shadow-md flex justify-end p-4">
//           <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
//             <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
//           </Dropdown>
//         </Header>

//         {/* Main Content */}
//         <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Projects</h1>
//             <Button type="primary">+ Create Project</Button>
//           </div>
//           <Input.Search placeholder="Search by project name..." onChange={handleSearch} className="mb-4 w-1/3" />
//           {loading ? (
//             <Spin size="large" className="mt-4" />
//           ) : (
//             <Table columns={columns} dataSource={filteredProjects} rowKey={(record, index) => index} pagination={{ pageSize: 5 }} bordered />
//           )}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// import { Layout, Menu, Button, Table, Input, Spin, message, Avatar, Dropdown, Tag, Modal, Form } from "antd";
// import { 
//   UserOutlined,
//   LogoutOutlined,
//   ProjectOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   PlusOutlined
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const { Header, Content, Sider } = Layout;

// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8000/api/projects");
//       if (!response.ok) throw new Error("Failed to fetch projects");
//       const data = await response.json();
//       setProjects(data.rows || []);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       message.error("Failed to load projects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value.toLowerCase());
//   };

//   const filteredProjects = projects.filter(project =>
//     Object.values(project).some(value =>
//       String(value).toLowerCase().includes(searchText)
//     )
//   );

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     form.resetFields();
//   };

//   const handleCreateProject = (values) => {
//     console.log("Project Created:", values);
//     setIsModalOpen(false);
//     message.success("Project created successfully!");
//     form.resetFields();
//   };

//   const columns = [
//     { title: "Project Title", dataIndex: "project_title", key: "project_title" },
//     { title: "Project Owner", dataIndex: "project_owner", key: "project_owner" },
//     { title: "Project Status", dataIndex: "project_status", key: "project_status", render: status => <Tag>{status}</Tag> },
//     { title: "Description", dataIndex: "description", key: "description" },
//     { 
//       title: "Action", 
//       key: "action", 
//       render: (_, record) => (
//         <>
//           <Button type="link" icon={<EyeOutlined />} onClick={() => message.info("View " + record.project_title)} />
//           <Button type="link" danger icon={<DeleteOutlined />} onClick={() => message.error("Delete " + record.project_title)} />
//         </>
//       )
//     }
//   ];

//   const profileMenuItems = [
//     { key: 'profile', label: 'Profile', onClick: () => navigate("/profile") },
//     { key: 'change-password', label: 'Change Password', onClick: () => navigate("/change-password") },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider width={250} style={{ background: "#fff" }}>
//         <div className="text-center py-4 text-xl font-bold text-blue-600">DANONE</div>
//         <Menu mode="inline" selectedKeys={["Projects"]} items={[{ key: "Projects", label: "Projects", icon: <ProjectOutlined /> }]} />
//         <Menu mode="inline" items={[{ key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: () => navigate("/") }]} />
//       </Sider>

//       <Layout>
//         {/* Header */}
//         <Header className="bg-white shadow-md flex justify-end p-4">
//           <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
//             <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
//           </Dropdown>
//         </Header>

//         {/* Main Content */}
//         <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Projects</h1>
//             <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Create Project</Button>
//           </div>
//           <Input.Search placeholder="Search by project name..." onChange={handleSearch} className="mb-4 w-1/3" />
//           {loading ? (
//             <Spin size="large" className="mt-4" />
//           ) : (
//             <Table columns={columns} dataSource={filteredProjects} rowKey={(record, index) => index} pagination={{ pageSize: 5 }} bordered />
//           )}
//         </Content>
//       </Layout>

//       {/* Create Project Modal */}
//       <Modal title="Create Project" open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <Form form={form} layout="vertical" onFinish={handleCreateProject}>
//           <Form.Item name="project_title" label="Project Title" rules={[{ required: true, message: "Please enter project title" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="project_owner" label="Project Owner" rules={[{ required: true, message: "Please enter project owner" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="project_status" label="Project Status" rules={[{ required: true, message: "Please enter project status" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input.TextArea rows={3} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">Submit</Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Table, Input, Spin, message, Avatar, Dropdown, Tag, Modal, Form } from "antd";
import { 
  UserOutlined,
  LogoutOutlined,
  ProjectOutlined,
  DashboardOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Projects");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.rows || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      message.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCreateProject = (values) => {
    console.log("Project Created:", values);
    setIsModalOpen(false);
    message.success("Project created successfully!");
    form.resetFields();
  };

  const profileMenuItems = [
    { key: 'profile', label: 'Profile', onClick: () => navigate("/profile") },
    { key: 'change-password', label: 'Change Password', onClick: () => navigate("/change-password") },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={250} style={{ background: "#fff" }}>
        <div className="text-center py-4 text-xl font-bold text-blue-600">DANONE</div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} onClick={(e) => setSelectedMenu(e.key)}
          items={[
            { key: "Dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
            { key: "Projects", label: "Projects", icon: <ProjectOutlined /> },
          ]}
        />
        <Menu mode="inline" items={[{ key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: () => navigate("/") }]} />
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="bg-white shadow-md flex justify-end p-4">
          <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
            <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
        </Header>









        {/* Main Content */}
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          {selectedMenu === "Dashboard" ? (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Dashboard Analytics</h1>
              <Chart type="bar" series={[{ data: [30, 40, 45, 50, 49, 60, 70, 91] }]} options={{ chart: { id: "basic-bar" }, xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] } }} height={300} />
              <Chart type="pie" series={[44, 55, 13, 43]} options={{ labels: ["A", "B", "C", "D"] }} height={300} />
              <Chart type="line" series={[{ data: [10, 20, 30, 40, 50, 60, 70, 80] }]} options={{ xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] } }} height={300} />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Create Project</Button>
              </div>
              <Input.Search placeholder="Search by project name..." onChange={(e) => setSearchText(e.target.value.toLowerCase())} className="mb-4 w-1/3" />
              {loading ? (
                <Spin size="large" className="mt-4" />
              ) : (
                <Table columns={[
                  { title: "Project Title", dataIndex: "project_title", key: "project_title" },
                  { title: "Project Owner", dataIndex: "project_owner", key: "project_owner" },
                  { title: "Project Status", dataIndex: "project_status", key: "project_status", render: status => <Tag>{status}</Tag> },
                  { title: "Description", dataIndex: "description", key: "description" },
                  { 
                    title: "Action", 
                    key: "action", 
                    render: (_, record) => (
                      <>
                        <Button type="link" icon={<EyeOutlined />} onClick={() => message.info("View " + record.project_title)} />
                        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => message.error("Delete " + record.project_title)} />
                      </>
                    )
                  }
                ]} dataSource={projects} rowKey={(record, index) => index} pagination={{ pageSize: 5 }} bordered />
              )}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
