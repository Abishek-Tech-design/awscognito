


// //ok 100% but i need gold silver dashboard so create new 
// import React, { useState, useEffect } from "react";
// import { Layout, Menu, Dropdown, Avatar, Table, Input, Spin, message } from "antd";
// import { 
//   LaptopOutlined,
//   FileTextOutlined,
//   DatabaseOutlined,
//   TeamOutlined,
//   SettingOutlined,
//   BookOutlined,
//   UserOutlined,
//   LogoutOutlined,
//   DashboardOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import Chart from "react-apexcharts";

// const { Header, Content, Sider } = Layout;

// const roles = [
//   { key: "Dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
//   { key: "Platform Admin", label: "Platform Admin", icon: <LaptopOutlined /> },
//   { key: "Project Admin", label: "Project Admin", icon: <FileTextOutlined /> },
//   { key: "Machine Learning Engineer", label: "Machine Learning Engineer", icon: <SettingOutlined /> },
//   { key: "Data Owner", label: "Data Owner", icon: <BookOutlined /> },
//   { key: "Data Quality Engineer", label: "Data Quality Engineer", icon: <TeamOutlined /> },
//   { key: "Data Engineer", label: "Data Engineer", icon: <DatabaseOutlined /> },
// ];

// const Dashboard = () => {
//   const [selectedRole, setSelectedRole] = useState("Dashboard");
//   const [tableData, setTableData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedRole !== "Dashboard") {
//       fetchProjects();
//     }
//   }, [selectedRole]);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8000/api/projects");
//       if (!response.ok) throw new Error("Failed to fetch projects");

//       const data = await response.json();
//       console.log("Fetched data:", data);

//       if (data.columns && data.rows) {
//         setColumns(data.columns.map(col => ({ title: col, dataIndex: col, key: col })));
//         setTableData(data.rows);
//       } else {
//         message.error("Invalid data format from server");
//       }
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//       message.error("Failed to load projects");
//       setColumns([]);
//       setTableData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleSelect = (e) => {
//     setSelectedRole(e.key);
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value.toLowerCase());
//   };

//   const filteredData = tableData.filter(item =>
//     Object.values(item).some(value =>
//       String(value).toLowerCase().includes(searchText)
//     )
//   );

//   const profileMenuItems = [
//     {
//       key: 'change-password',
//       label: 'Change Password',
//       onClick: () => navigate("/change-password")
//     },
//   ];

//   const logoutItems = [
//     {
//       key: 'logout',
//       icon: <LogoutOutlined />,
//       label: 'Logout',
//       onClick: () => navigate("/")
//     }
//   ];

//   const chartOptions = {
//     chart: { type: 'bar' },
//     xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
//   };

//   const chartSeries = [{ name: 'Sales', data: [400, 600, 300, 500, 700] }];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sider width={250} style={{ background: "#fff" }}>
//         <div className="text-center py-4 text-xl font-bold text-blue-600">DANONE</div>
//         <Menu mode="inline" selectedKeys={[selectedRole]} items={roles} onClick={handleRoleSelect} />
//         <Menu mode="inline" items={logoutItems} />
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
//           <h1 className="text-2xl font-semibold">{selectedRole}</h1>

//           {selectedRole === "Dashboard" ? (
//             <div className="mb-6">
//               <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
//             </div>
//           ) : (
//             <>
//               <Input.Search placeholder="Search projects..." onChange={handleSearch} className="mb-4 w-1/3" />
//               {loading ? (
//                 <Spin size="large" className="mt-4" />
//               ) : filteredData.length > 0 ? (
//                 <Table
//                   columns={columns}
//                   dataSource={filteredData}
//                   rowKey={(record, index) => index}
//                   pagination={{ pageSize: 5 }}
//                   bordered
//                 />
//               ) : (
//                 <p className="mt-2 text-gray-600">No Data Available</p>
//               )}
//             </>
//           )}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Table, Input, Spin, message } from "antd";
import { 
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ProjectOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const { Header, Content, Sider } = Layout;

const roles = [
  { key: "Dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
  { key: "Projects", label: "Projects", icon: <ProjectOutlined /> },
];

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState("Dashboard");
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRole === "Projects") {
      fetchProjects();
    }
  }, [selectedRole]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.columns && data.rows) {
        setColumns(data.columns.map(col => ({ title: col, dataIndex: col, key: col })));
        setTableData(data.rows);
      } else {
        message.error("Invalid data format from server");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      message.error("Failed to load projects");
      setColumns([]);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (e) => {
    setSelectedRole(e.key);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = tableData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchText)
    )
  );

  const profileMenuItems = [
    {
      key: 'change-password',
      label: 'Change Password',
      onClick: () => navigate("/change-password")
    },
  ];

  const logoutItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => navigate("/")
    }
  ];

  const chartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  };

  const chartSeries = [{ name: 'Sales', data: [400, 600, 300, 500, 700] }];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={250} style={{ background: "#fff" }}>
        <div className="text-center py-4 text-xl font-bold text-blue-600">DANONE</div>
        <Menu mode="inline" selectedKeys={[selectedRole]} items={roles} onClick={handleRoleSelect} />
        <Menu mode="inline" items={logoutItems} />
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
          <h1 className="text-2xl font-semibold">{selectedRole}</h1>

          {selectedRole === "Dashboard" ? (
            <div className="mb-6">
              <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
            </div>
          ) : (
            <>
              <Input.Search placeholder="Search projects..." onChange={handleSearch} className="mb-4 w-1/3" />
              {loading ? (
                <Spin size="large" className="mt-4" />
              ) : filteredData.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  rowKey={(record, index) => index}
                  pagination={{ pageSize: 5 }}
                  bordered
                />
              ) : (
                <p className="mt-2 text-gray-600">No Data Available</p>
              )}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
