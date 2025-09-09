'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Mail, Phone, MapPin, Calendar, FileText,
    CreditCard, Key, Trash2, Edit, Plus, CheckCircle,
    ChevronDown, ChevronUp, Search, Filter, Download
} from "lucide-react";

import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import Footer from "@/components/foorter/Footer";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";

export default function DriversPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("accountInfo");
    const [editingDriver, setEditingDriver] = useState(null);
    const [showAddDriver, setShowAddDriver] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSidebarClose = () => setIsSidebarOpen(false);

    // Drivers data
    const [drivers, setDrivers] = useState([
        { id: 1, driverName: "MAAZ AZIZ", arabicName: "", nationality: "Pakistan", documentNo: "4109329", email: "maximusmaaz@gmail.com", status: "Active", phone: "+971 50 123 4567" },
        { id: 2, driverName: "MAAZ AZIZ", arabicName: "", nationality: "Pakistan", documentNo: "4109329", email: "info@samr.com", status: "Inactive", phone: "+971 55 987 6543" },
        { id: 3, driverName: "AHMED KHAN", arabicName: "أحمد خان", nationality: "UAE", documentNo: "7856342", email: "ahmed.khan@example.com", status: "Active", phone: "+971 52 456 7890" },
        { id: 4, driverName: "JAMES WILSON", arabicName: "", nationality: "UK", documentNo: "UK453217", email: "james.wilson@example.com", status: "Pending", phone: "+971 56 789 0123" }
    ]);

    // Terms and Conditions data
    const companyTerms = [
        { id: 1, companyName: "Caryaati", terms: "Read Complete Terms and Condition here", status: "Accepted" }
    ];

    const supplierTerms = [
        { id: 0, vendorName: "Rent a Car Demo Account", terms: "Terms and Condition", status: "Accepted" },
        { id: 1, vendorName: "Premium Car Rentals", terms: "Terms and Condition", status: "Accepted" },
        { id: 2, vendorName: "FAIR DEAL RENT A CAR LLC", terms: "Terms and Condition", status: "Accepted" },
        { id: 3, vendorName: "VESLA RENT A CAR L.L.C", terms: "Terms and Condition", status: "Accepted" },
        { id: 4, vendorName: "H N M CAR RENTAL L.L.C", terms: "Terms and Condition", status: "Accepted" }
    ];

    // New driver form state
    const [newDriver, setNewDriver] = useState({
        driverName: "",
        arabicName: "",
        nationality: "",
        documentNo: "",
        email: "",
        phone: "",
        status: "Active"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDriver(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addDriver = () => {
        if (!newDriver.driverName || !newDriver.email) return;

        const newDriverWithId = {
            ...newDriver,
            id: drivers.length + 1
        };

        setDrivers(prev => [...prev, newDriverWithId]);
        setNewDriver({
            driverName: "",
            arabicName: "",
            nationality: "",
            documentNo: "",
            email: "",
            phone: "",
            status: "Active"
        });
        setShowAddDriver(false);
    };

    const updateDriver = () => {
        if (!editingDriver.driverName || !editingDriver.email) return;

        setDrivers(prev =>
            prev.map(driver =>
                driver.id === editingDriver.id ? editingDriver : driver
            )
        );
        setEditingDriver(null);
    };

    const deleteDriver = (id) => {
        setDrivers(prev => prev.filter(driver => driver.id !== id));
    };

    const startEditing = (driver) => {
        setEditingDriver({ ...driver });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingDriver(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredDrivers = drivers.filter(driver =>
        driver.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        driver.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar
                isHome={true}
                onMenuToggle={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                    setIsDropdownOpen(false);
                }}
                onUserToggle={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsSidebarOpen(false);
                }}
            />

            <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'profile'} onClose={handleSidebarClose} />
            <UserDropdown isOpen={isDropdownOpen} />

            <div className="flex flex-col min-h-screen md:pl-[72px]">
                <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                    <main className="flex-1 px-2 py-4 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                        {/* Header */}
                        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Drivers Management</h1>
                                <p className="text-sm text-gray-500 mt-1">Manage your drivers and review terms & conditions</p>
                            </div>

                            <div className="mt-4 md:mt-0">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setActiveTab("accountInfo")}
                                        className={`px-4 py-2 rounded-lg transition ${activeTab === "accountInfo" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Account Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("drivers")}
                                        className={`px-4 py-2 rounded-lg transition ${activeTab === "drivers" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        My Drivers
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("companyTerms")}
                                        className={`px-4 py-2 rounded-lg transition ${activeTab === "companyTerms" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Company Terms
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("supplierTerms")}
                                        className={`px-4 py-2 rounded-lg transition ${activeTab === "supplierTerms" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        Supplier Terms
                                    </button>
                                </div>
                            </div>
                        </header>

                        <AnimatePresence mode="wait">
                            {/* Account Information Tab */}
{activeTab === "accountInfo" && (
  <motion.div
    key="accountInfo"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="bg-white rounded-2xl shadow-md p-6"
  >
    <h2 className="text-lg font-semibold text-gray-800 mb-6">Account Information</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* My Cards Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <CreditCard size={18} /> My Cards
          </h3>
          <button className="text-indigo-600 text-sm">Add New</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Visa •••• 1234</p>
              <p className="text-sm text-gray-500">Expires 12/2025</p>
            </div>
            <button className="text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Mastercard •••• 5678</p>
              <p className="text-sm text-gray-500">Expires 09/2024</p>
            </div>
            <button className="text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Account Information Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <User size={18} /> Personal Information
          </h3>
          <button className="text-indigo-600 text-sm">Edit</button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">John Doe</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">john.doe@example.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">+971 50 123 4567</p>
          </div>
        </div>
      </div>

      {/* My Documents Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <FileText size={18} /> My Documents
          </h3>
          <button className="text-indigo-600 text-sm">Upload</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Passport.pdf</p>
              <p className="text-sm text-gray-500">Uploaded 2 days ago</p>
            </div>
            <button className="text-indigo-600">
              <Download size={16} />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">ID_Card.pdf</p>
              <p className="text-sm text-gray-500">Uploaded 1 week ago</p>
            </div>
            <button className="text-indigo-600">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* My Driving License Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <Key size={18} /> My Driving License
          </h3>
          <button className="text-indigo-600 text-sm">Update</button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">License Number</p>
            <p className="font-medium">DL1234567890</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expiry Date</p>
            <p className="font-medium">15/08/2026</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500 mb-2">License Copy</p>
            <button className="text-indigo-600 flex items-center gap-1">
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)}
                            {/* Drivers Tab */}
                            {activeTab === "drivers" && (
                                <motion.div
                                    key="drivers"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-2xl shadow-md p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Drivers List</h2>

                                        <div className="flex flex-col md:flex-row gap-3">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Search drivers..."
                                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>

                                            <button
                                                onClick={() => setShowAddDriver(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                            >
                                                <Plus size={18} /> Add Driver
                                            </button>
                                        </div>
                                    </div>

                                    {/* Add Driver Form */}
                                    {showAddDriver && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mb-6 p-4 border border-gray-200 rounded-lg"
                                        >
                                            <h3 className="text-lg font-medium mb-4">Add New Driver</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                                                    <input
                                                        type="text"
                                                        name="driverName"
                                                        value={newDriver.driverName}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Arabic Name</label>
                                                    <input
                                                        type="text"
                                                        name="arabicName"
                                                        value={newDriver.arabicName}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                                    <input
                                                        type="text"
                                                        name="nationality"
                                                        value={newDriver.nationality}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Document No</label>
                                                    <input
                                                        type="text"
                                                        name="documentNo"
                                                        value={newDriver.documentNo}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={newDriver.email}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={newDriver.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                    <select
                                                        name="status"
                                                        value={newDriver.status}
                                                        onChange={handleInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                        <option value="Pending">Pending</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={addDriver}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                                                >
                                                    Save Driver
                                                </button>
                                                <button
                                                    onClick={() => setShowAddDriver(false)}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Edit Driver Form */}
                                    {editingDriver && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mb-6 p-4 border border-indigo-200 rounded-lg bg-indigo-50"
                                        >
                                            <h3 className="text-lg font-medium mb-4">Edit Driver</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                                                    <input
                                                        type="text"
                                                        name="driverName"
                                                        value={editingDriver.driverName}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Arabic Name</label>
                                                    <input
                                                        type="text"
                                                        name="arabicName"
                                                        value={editingDriver.arabicName}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                                    <input
                                                        type="text"
                                                        name="nationality"
                                                        value={editingDriver.nationality}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Document No</label>
                                                    <input
                                                        type="text"
                                                        name="documentNo"
                                                        value={editingDriver.documentNo}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editingDriver.email}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={editingDriver.phone}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                    <select
                                                        name="status"
                                                        value={editingDriver.status}
                                                        onChange={handleEditInputChange}
                                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                        <option value="Pending">Pending</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={updateDriver}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                                                >
                                                    Update Driver
                                                </button>
                                                <button
                                                    onClick={() => setEditingDriver(null)}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Drivers Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S#</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arabic Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document No</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredDrivers.map((driver, index) => (
                                                    <tr key={driver.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{driver.driverName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.arabicName || "-"}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.nationality}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.documentNo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${driver.status === "Active" ? "bg-green-100 text-green-800" :
                                                                    driver.status === "Inactive" ? "bg-red-100 text-red-800" :
                                                                        "bg-yellow-100 text-yellow-800"
                                                                }`}>
                                                                {driver.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => startEditing(driver)}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteDriver(driver.id)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredDrivers.length === 0 && (
                                        <div className="text-center py-12">
                                            <User className="mx-auto text-gray-400" size={48} />
                                            <p className="mt-4 text-gray-500">No drivers found</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Company Terms Tab */}
                            {activeTab === "companyTerms" && (
                                <motion.div
                                    key="companyTerms"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-2xl shadow-md p-6"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Caryaati's Terms & Conditions</h2>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S#</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terms and Condition</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {companyTerms.map((term, index) => (
                                                    <tr key={term.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{term.companyName}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            <a href="#" className="text-indigo-600 hover:underline">{term.terms}</a>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                                {term.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">Terms & Conditions Overview</h3>
                                        <div className="prose prose-sm max-w-none">
                                            <p>By using our services, you agree to the following terms and conditions:</p>
                                            <ul className="list-disc pl-5 mt-2">
                                                <li>All drivers must possess a valid driving license</li>
                                                <li>Vehicles must be returned in the same condition as rented</li>
                                                <li>Any traffic violations during rental period are responsibility of the renter</li>
                                                <li>Fuel should be returned at the same level as provided</li>
                                                <li>A security deposit may be required for certain vehicle categories</li>
                                            </ul>
                                            <p className="mt-4">For complete terms and conditions, please click the link above.</p>
                                        </div>
                                    </div> */}
                                </motion.div>
                            )}

                            {/* Supplier Terms Tab */}
                            {activeTab === "supplierTerms" && (
                                <motion.div
                                    key="supplierTerms"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-2xl shadow-md p-6"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Our Suppliers Terms and Conditions</h2>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S#</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terms and Condition</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {supplierTerms.map((term, index) => (
                                                    <tr key={term.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{term.id + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{term.vendorName}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            <a href="#" className="text-indigo-600 hover:underline">{term.terms}</a>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                                {term.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">Suppliers Terms & Conditions Overview</h3>
                                        <div className="prose prose-sm max-w-none">
                                            <p>By partnering with our suppliers, they agree to the following terms:</p>
                                            <ul className="list-disc pl-5 mt-2">
                                                <li>Provide vehicles in good condition</li>
                                                <li>Accurate pricing and availability</li>
                                                <li>Timely response to bookings</li>
                                                <li>Compliance with local regulations</li>
                                                <li>Insurance coverage for vehicles</li>
                                            </ul>
                                            <p className="mt-4">For complete terms for each supplier, please click the links above.</p>
                                        </div>
                                    </div> */}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
}