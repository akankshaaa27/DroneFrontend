import React from "react";

const Dashboard = () => {
  // Sample data - replace with real data
  const stats = [
    { title: "Total Missions", value: "128", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", icon: "✈️" },
    { title: "Total Profit", value: "$12,840", bg: "bg-green-100", text: "text-green-800", border: "border-green-300", icon: "💰" },
    { title: "Total Expense", value: "$4,210", bg: "bg-red-100", text: "text-red-800", border: "border-red-300", icon: "📉" },
    { title: "Today's Entries", value: "14", bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", icon: "📅" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Drone Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`${stat.bg} ${stat.border} ${stat.text} p-6 rounded-lg shadow-md border-l-4 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
};

export default Dashboard;