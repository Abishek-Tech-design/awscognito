// import React, { useEffect, useState } from "react";
// import { Table, Card } from "antd";
// import axios from "axios";

// const Leaderboard = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/leaderboard/")
//       .then((response) => setData(response.data))
//       .catch((error) => console.error("Error fetching leaderboard:", error));
//   }, []);

//   const columns = [
//     { title: "S. No", dataIndex: "id", key: "id" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Score", dataIndex: "score", key: "score" },
//     { title: "Time Taken", dataIndex: "time_taken", key: "time_taken" },
//   ];

//   return (
//     <Card title="Leaderboard" bordered={false} style={{ width: "80%", margin: "20px auto" }}>
//       <Table dataSource={data} columns={columns} rowKey="id" />
//     </Card>
//   );
// };

// export default Leaderboard;




// // ok but i need appex charts 
// import React, { useState } from "react";
// import { Table, Card } from "antd";

// const Leaderboard = () => {
//   const [data] = useState([
//     { id: 1, name: "Alice", score: 95, time_taken: "1m 30s" },
//     { id: 2, name: "Bob", score: 90, time_taken: "1m 45s" },
//     { id: 3, name: "Charlie", score: 85, time_taken: "2m 10s" },
//     { id: 4, name: "David", score: 80, time_taken: "2m 30s" },
//   ]);

//   const columns = [
//     { title: "S. No", dataIndex: "id", key: "id" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Score", dataIndex: "score", key: "score" },
//     { title: "Time Taken", dataIndex: "time_taken", key: "time_taken" },
//   ];

//   return (
//     <Card title="Leaderboard" bordered={false} style={{ width: "80%", margin: "20px auto" }}>
//       <Table dataSource={data} columns={columns} rowKey="id" />
//     </Card>
//   );
// };

// export default Leaderboard;

// // ok but issue in learboard 4,5 display in need all so new code 
// import React, { useState } from "react";
// import { Table, Card } from "antd";

// const Leaderboard = () => {
//   const [data] = useState([
//     { id: 1, name: "Alice", score: 95, time_taken: "1m 30s" },
//     { id: 2, name: "Bob", score: 90, time_taken: "1m 45s" },
//     { id: 3, name: "Charlie", score: 85, time_taken: "2m 10s" },
//     { id: 4, name: "David", score: 80, time_taken: "2m 30s" },
//     { id: 5, name: "Eve", score: 75, time_taken: "2m 50s" },
//   ]);

//   const sortedData = [...data].sort((a, b) => b.score - a.score);
//   const topThree = sortedData.slice(0, 3);
//   const remaining = sortedData.slice(3);

//   const columns = [
//     { title: "S. No", dataIndex: "id", key: "id" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Score", dataIndex: "score", key: "score" },
//     { title: "Time Taken", dataIndex: "time_taken", key: "time_taken" },
//   ];

//   return (
//     <div className="flex flex-col items-center p-4">
//       {/* Top 3 Leaderboard */}
//       <Card title="Top 3 Players" bordered={false} className="w-full max-w-2xl mb-4 shadow-lg">
//         <div className="flex flex-col space-y-2">
//           {topThree.map((player, index) => (
//             <div
//               key={player.id}
//               className={`flex justify-between items-center p-3 rounded-lg text-white text-lg ${
//                 index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-blue-500"
//               }`}
//             >
//               <span className="font-bold">{index + 1}.</span>
//               <span className="font-semibold">{player.name}</span>
//               <span>{player.score}</span>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Overall Leaderboard */}
//       <Card title="Overall Leaderboard" bordered={false} className="w-full max-w-3xl shadow-lg">
//         <Table dataSource={remaining} columns={columns} rowKey="id" pagination={false} />
//       </Card>
//     </div>
//   );
// };

// export default Leaderboard;







import React, { useState } from "react";
import { Table, Card } from "antd";

const Leaderboard = () => {
  const [data] = useState([
    { id: 1, name: "Alice", score: 10, time_taken: "0:00:23" },
    { id: 2, name: "Bob", score: 10, time_taken: "0:01:07" },
    { id: 3, name: "User3", score: 8, time_taken: "0:01:20" },
    { id: 4, name: "user2", score: 8, time_taken: "0:00:18" },
    { id: 5, name: "User1", score: 7, time_taken: "0:00:14" },
  ]);

  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const columns = [
    { title: "Rank", dataIndex: "rank", key: "rank", render: (_, __, index) => index + 1 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Score", dataIndex: "score", key: "score" },
    { title: "Time Taken", dataIndex: "time_taken", key: "time_taken" },
  ];

  const highlightedRowClass = (index) => {
    return index === 0 ? "bg-yellow-500 text-white" : index === 1 ? "bg-gray-400 text-white" : index === 2 ? "bg-blue-500 text-white" : "";
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Leaderboard */}
      <Card title="Leaderboard" bordered={false} className="w-full max-w-3xl shadow-lg">
        <Table
          dataSource={sortedData.map((item, index) => ({ ...item, rank: index + 1 }))}
          columns={columns}
          rowKey="id"
          pagination={false}
          rowClassName={(_, index) => highlightedRowClass(index)}
        />
      </Card>
    </div>
  );
};

export default Leaderboard;
