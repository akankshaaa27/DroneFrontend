// pages/MissionLogs.jsx

import Navbar from '../Components/Navbar';

const MissionLogs = () => (
  <Navbar>
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Mission Logs</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
        <span className="mr-2">📥</span> Export
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mission ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item}007</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Operation Phantom</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Completed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-{10+item}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Agent #{item}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-gray-600 hover:text-gray-900">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div className="mt-6 flex justify-between items-center">
      <div className="text-sm text-gray-500">Showing 1 to 5 of 24 entries</div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 border rounded-md">Previous</button>
        <button className="px-4 py-2 border bg-blue-500 text-white rounded-md">1</button>
        <button className="px-4 py-2 border rounded-md">2</button>
        <button className="px-4 py-2 border rounded-md">3</button>
        <button className="px-4 py-2 border rounded-md">Next</button>
      </div>
    </div>
  </Navbar>
);

export default MissionLogs;