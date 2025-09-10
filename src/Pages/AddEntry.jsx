import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaRupeeSign,
  FaChartLine,
  FaSeedling,
} from "react-icons/fa";

// Backend API URL
const API_BASE_URL = "http://localhost:8080/api/post";

const AddEntry = () => {
  const [form, setForm] = useState({
    date: "",
    location: "",
    farmerName: "",
    mobileNumber: "",
    sprayingArea: "",
    expense: "",
    profit: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date) {
      toast.error("Please select a date!");
      return;
    }

    // Send date in ISO format (yyyy-MM-dd) for LocalDate
    const payload = {
      ...form,
      sprayingArea: parseFloat(form.sprayingArea),
      expense: parseFloat(form.expense),
      profit: parseFloat(form.profit),
    };

    console.log("Submitting data:", payload);

    try {
      const res = await axios.post(API_BASE_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("✅ Entry added successfully!");
        setTimeout(() => navigate("/entries"), 1500);
      } else {
        toast.error("⚠ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error adding entry:", err.response || err.message);
      if (err.response?.data?.message) {
        toast.error(`Failed: ${err.response.data.message}`);
      } else {
        toast.error("Failed to add entry. Check server connection.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <ToastContainer position="top-right" />

      <div className="max-w-2xl mx-auto mt-8 sm:mt-12">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Add New Drone Mission
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Record all the details of your agricultural drone operation
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
              {/* Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="Farm location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Farmer Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farmer Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="farmerName"
                  placeholder="Farmer's full name"
                  value={form.farmerName}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Contact number"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit mobile number"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Spraying Area */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spraying Area (Acre)
              </label>
              <div className="relative">
                <FaSeedling className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  name="sprayingArea"
                  placeholder="Land size in acres"
                  value={form.sprayingArea}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Expense */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expense (₹)
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  name="expense"
                  placeholder="Total cost"
                  value={form.expense}
                  onChange={handleChange}
                  min="0"
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Profit */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profit (₹)
              </label>
              <div className="relative">
                <FaChartLine className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  name="profit"
                  placeholder="Total earnings"
                  value={form.profit}
                  onChange={handleChange}
                  min="0"
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Submit Mission Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntry;
