import React from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  { name: "Platform Admin", icon: "\ud83d\udcbb" },
  { name: "Project Admin", icon: "\ud83d\udcc4" },
  { name: "Machine Learning Engineer", icon: "⚙️" },
  { name: "Data Owner", icon: "\ud83d\udcda" },
  { name: "Data Quality Engineer", icon: "\ud83d\udc65" },
  { name: "Data Engineer", icon: "\ud83d\udcc0" },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    console.log("Selected role:", role);
    navigate(`/dashboard?role=${role}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">DANONE</div>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Role Selection Grid */}
      <main className="flex-grow flex justify-center items-center p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {roles.map((role) => (
            <div
              key={role.name}
              className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-200 transition"
              onClick={() => handleRoleSelect(role.name)}
            >
              <div className="text-5xl">{role.icon}</div>
              <p className="mt-2 text-lg font-semibold text-gray-700">{role.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;
