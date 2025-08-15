import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const entriesPerPage = 10;

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/get");
      setEntries(res.data);
    } catch (error) {
      toast.error("Failed to fetch entries");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/${editingEntry.id}`,
        editingEntry
      );
      toast.success("Entry updated successfully");
      fetchEntries();
      setEditingEntry(null);
    } catch (error) {
      toast.error("Failed to update entry");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`http://localhost:8080/api/${id}`);
        toast.success("Entry deleted successfully");
        fetchEntries();
      } catch (error) {
        toast.error("Failed to delete entry");
      }
    }
  };

  const applyDateFilter = (entries) => {
    const now = new Date();
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      switch (filter) {
        case "daily":
          return entryDate.toDateString() === now.toDateString();
        case "weekly": {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return entryDate >= oneWeekAgo && entryDate <= now;
        }
        case "monthly":
          return (
            entryDate.getMonth() === now.getMonth() &&
            entryDate.getFullYear() === now.getFullYear()
          );
        case "yearly":
          return entryDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const applySearchFilter = (entries) => {
    return entries.filter(
      (entry) =>
        entry.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredEntries = applySearchFilter(applyDateFilter(entries));

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const totalProfit = filteredEntries.reduce(
    (acc, entry) => acc + entry.profit,
    0
  );
  const totalExpense = filteredEntries.reduce(
    (acc, entry) => acc + entry.expense,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Drone Mission Logs
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search farmer/location"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded-lg text-sm w-48 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <FaSearch className="text-gray-500" />
        </div>

        <div className="flex items-center gap-4">
          <select
            className="border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Time</option>
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>

          <button
            onClick={() => (window.location.href = "/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add Entry
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-left">Location</th>
              <th className="py-3 px-4 border-b text-left">Farmer</th>
              <th className="py-3 px-4 border-b text-left">Mobile</th>
              <th className="py-3 px-4 border-b text-left">Spraying Area</th>
              <th className="py-3 px-4 border-b text-left">Expense</th>
              <th className="py-3 px-4 border-b text-left">Profit</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={entry.id} className="hover:bg-blue-50 transition">
                <td className="py-2 px-4 border-b">{indexOfFirstEntry + index + 1}</td>
                <td className="py-2 px-4 border-b">{entry.date}</td>
                <td className="py-2 px-4 border-b">{entry.location}</td>
                <td className="py-2 px-4 border-b">{entry.farmerName}</td>
                <td className="py-2 px-4 border-b">{entry.mobileNumber}</td>
                <td className="py-2 px-4 border-b">{entry.sprayingArea}</td>
                <td className="py-2 px-4 border-b">₹{entry.expense}</td>
                <td className="py-2 px-4 border-b">₹{entry.profit}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={() => setEditingEntry(entry)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {currentEntries.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-700">
          Total Profit: ₹{totalProfit} | Total Expense: ₹{totalExpense}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Entry</h3>
            <form className="space-y-4">
              <input
                type="text"
                value={editingEntry.location}
                onChange={(e) =>
                  setEditingEntry({ ...editingEntry, location: e.target.value })
                }
                placeholder="Location"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={editingEntry.farmerName}
                onChange={(e) =>
                  setEditingEntry({ ...editingEntry, farmerName: e.target.value })
                }
                placeholder="Farmer Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={editingEntry.mobileNumber}
                onChange={(e) =>
                  setEditingEntry({ ...editingEntry, mobileNumber: e.target.value })
                }
                placeholder="Mobile Number"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={editingEntry.sprayingArea}
                onChange={(e) =>
                  setEditingEntry({ ...editingEntry, sprayingArea: e.target.value })
                }
                placeholder="Spraying Area"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={editingEntry.expense}
                onChange={(e) =>
                  setEditingEntry({
                    ...editingEntry,
                    expense: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="Expense"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={editingEntry.profit}
                onChange={(e) =>
                  setEditingEntry({
                    ...editingEntry,
                    profit: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="Profit"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEntry(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntriesList;
