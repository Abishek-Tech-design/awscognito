// import React from "react";
// import { Card, Typography } from "antd";

// const { Title } = Typography;

// const Score = ({ score }) => {
//   return (
//     <Card title="Results" bordered={false} style={{ width: "100%", textAlign: "center" }}>
//       <Title level={4}>Your score: {score}</Title>
//     </Card>
//   );
// };

// export default Score;

import React from "react";
import { Card, Typography } from "antd";
import { useLocation } from "react-router-dom";

const { Title } = Typography;

const Score = () => {

  const location = useLocation();
  const score = location.state?.score || 0;


  return (
    <Card
      title="Results"
      bordered={false}
      style={{
        width: "100%",
        textAlign: "center",
        backgroundColor: "#f0f2f5",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <Title level={3} style={{ color: "#1890ff" }}>
        Your Score: {score}
      </Title>
    </Card>
  );
};

export default Score;
