'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search, Filter, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";
import Link from "next/link"

const FinesMain = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const [widgetsDropdownOpen, setWidgetsDropdownOpen] = useState(false);
        const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
        const [wishlistDropdownOpen, setWishlistDropdownOpen] = useState(false);
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
        const [mobileWidgetsOpen, setMobileWidgetsOpen] = useState(false);
        const [sortField, setSortField] = useState("date");
        const [sortDirection, setSortDirection] = useState("desc");
        const [filterStatus, setFilterStatus] = useState("all");
        const [searchQuery, setSearchQuery] = useState("");
    
        const handleSidebarClose = () => {
            setIsSidebarOpen(false);
        };
    
        // Fines data from the image
        const finesData = [
            { id: 1, company: "Rent a Car Demo Account", date: "2025-05-05 19:30:00", fineNumber: "4,554667585456", plate: "9,3930486", reason: "Overspeeding", location: "Dubai", source: "Dubai Police", amount: 600.00, blackPoints: 0, status: "UnPaid" },
            { id: 2, company: "Rent a Car Demo Account", date: "2025-05-05 19:40:00", fineNumber: "756456543434", plate: "9,3930486", reason: "Unknown", location: "Municipal Bulgaria", source: "Sharjah", amount: 450.00, blackPoints: 0, status: "UnPaid" },
            { id: 3, company: "Rent a Car Demo Account", date: "2024-05-12 16:42:00", fineNumber: "3655645765764", plate: "94088976", reason: "Over speeding", location: "Dubai", source: "Dubai Police", amount: 650.00, blackPoints: 0, status: "UnPaid" },
            { id: 4, company: "Rent a Car Demo Account", date: "2024-05-15 00:43:00", fineNumber: "75845344", plate: "94088976", reason: "No reason avain", location: "Al Majaz 3", source: "Sharjah", amount: 300.00, blackPoints: 0, status: "UnPaid" },
            { id: 5, company: "Rent a Car Demo Account", date: "2024-10-08 12:11:00", fineNumber: "7643454101", plate: "94088976", reason: "Unknown", location: "E11 Highway", source: "Sharjah Police", amount: 350.00, blackPoints: 0, status: "UnPaid" },
            { id: 6, company: "Rent a Car Demo Account", date: "2024-10-07 12:29:00", fineNumber: "54324nvtre", plate: "94088976", reason: "Unknown", location: "Dubai", source: "Dubai Police", amount: 450.00, blackPoints: 0, status: "UnPaid" },
            { id: 7, company: "Rent a Car Demo Account", date: "2024-10-10 12:32:00", fineNumber: "67845nrt", plate: "94088976", reason: "Parking", location: "Dubai", source: "RTA", amount: 400.00, blackPoints: 0, status: "UnPaid" },
            { id: 8, company: "Rent a Car Demo Account", date: "2024-06-05 18:30:00", fineNumber: "860987565", plate: "K4656657", reason: "Avain", location: "Police academy", source: "Dubai Police", amount: 1000.00, blackPoints: 0, status: "Paid" },
            { id: 9, company: "Rent a Car Demo Account", date: "2024-10-18 16:09:00", fineNumber: "674563523TY", plate: "K4656657", reason: "Over speed", location: "Dubai Free Zone", source: "Dubai Police", amount: 600.00, blackPoints: 0, status: "UnPaid" },
            { id: 10, company: "Rent a Car Demo Account", date: "2024-10-22 16:52:00", fineNumber: "422432432434", plate: "K4656657", reason: "Kol bhi", location: "Dubai Park Hill Mountain", source: "Dubai", amount: 450.00, blackPoints: 0, status: "UnPaid" },
            { id: 11, company: "Rent a Car Demo Account", date: "2025-05-29 18:03:00", fineNumber: "44,554356564", plate: "94150611", reason: "Pindi Boys", location: "Pindi", source: "Dubai Police", amount: 450.00, blackPoints: 0, status: "Paid" },
            { id: 12, company: "Rent a Car Demo Account", date: "2025-06-03 18:04:00", fineNumber: "476354324", plate: "94150611", reason: "Avain", location: "Gigit", source: "Sharjah Municipality", amount: 500.00, blackPoints: 0, status: "Paid" },
            { id: 13, company: "Rent a Car Demo Account", date: "2025-05-24 05:09:00", fineNumber: "34,56545634", plate: "93851241", reason: "Violation", location: "Clifton bridge", source: "Dubai", amount: 575.35, blackPoints: 0, status: "Paid" },
            { id: 14, company: "Rent a Car Demo Account", date: "2025-05-23 14:55:00", fineNumber: "34,3433423", plate: "93851241", reason: "Accident", location: "Clifton bridge", source: "Dubai", amount: 700.00, blackPoints: 0, status: "Paid" },
            { id: 15, company: "Rent a Car Demo Account", date: "2025-06-03 17:34:00", fineNumber: "24,53454323", plate: "93851241", reason: "Signal violation", location: "-", source: "Dubai", amount: 82.00, blackPoints: 0, status: "Paid" },
            { id: 16, company: "Morning Star Rent a Car LLC", date: "2025-07-09 05:37:00", fineNumber: "4,56437657", plate: "DF34353", reason: "Maaz aziz", location: "Dubai", source: "Dubai Police", amount: 600.00, blackPoints: 0, status: "Paid" },
            { id: 17, company: "Rent a Car Demo Account", date: "2025-09-01 21:43:00", fineNumber: "4,34665587575", plate: "1010146816", reason: "Unknown", location: "Dubai", source: "Dubai", amount: 350.00, blackPoints: 0, status: "UnPaid" },
            { id: 18, company: "Rent a Car Demo Account", date: "2025-09-01 00:38:00", fineNumber: "90987652", plate: "1010146816", reason: "Unknown", location: "Dubai", source: "Dubai Police", amount: 150.00, blackPoints: 0, status: "UnPaid" },
        ];
    
        // Calculate summary statistics
        const totalFines = finesData.length;
        const unpaidFines = finesData.filter(fine => fine.status === "UnPaid").length;
        const totalAmount = finesData.reduce((sum, fine) => sum + fine.amount, 0);
        const unpaidAmount = finesData
            .filter(fine => fine.status === "UnPaid")
            .reduce((sum, fine) => sum + fine.amount, 0);
    
        // Sort and filter data
        const sortedAndFilteredData = finesData
            .filter(fine => {
                const matchesStatus = filterStatus === "all" || fine.status === filterStatus;
                const matchesSearch = searchQuery === "" || 
                    Object.values(fine).some(value => 
                        String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    );
                return matchesStatus && matchesSearch;
            })
            .sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];
                
                if (sortField === "date") {
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
                }
                
                if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
                if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
    
        const handleSort = (field) => {
            if (sortField === field) {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            } else {
                setSortField(field);
                setSortDirection("asc");
            }
        };
    
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        };
    
        const formatTime = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
        };
  return (
    <div className="flex flex-col min-h-screen md:pl-[72px]">
                <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                    <main className="flex-1 px-1 py-2 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                        <header className="flex items-center justify-between mb-6 bg-white content-center p-4 rounded-xl shadow-sm relative">
                            <div className="flex items-center relative max-sm:left-[-10px] w-full justify-between">
                                <div className="flex items-center">
                                    <h1 className="text-xl dashboard-text sm:text-2xl font-bold text-gray-800">Fines Dashboard</h1>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setWishlistDropdownOpen(!wishlistDropdownOpen);
                                                setProfileDropdownOpen(false);
                                                setWidgetsDropdownOpen(false);
                                            }}
                                            className="p-2 hover:bg-gray-100 rounded-full relative"
                                        >
                                            <Heart size={22} className="text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setProfileDropdownOpen(!profileDropdownOpen);
                                                setWishlistDropdownOpen(false);
                                                setWidgetsDropdownOpen(false);
                                            }}
                                            className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <User size={28} className="text-indigo-500" />
                                            <span className="font-medium hidden sm:inline text-gray-800">Maaz Aziz</span>
                                        </button>
                                        <AnimatePresence>
                                            {profileDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute right-0 mt-2 w-44 sm:w-48 bg-white shadow-lg rounded-xl overflow-hidden z-10"
                                                >
                                                    <button className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 border-b">
                                                        <User size={16} className="text-gray-600" /> My Profile
                                                    </button>
                                                    <Link href={`/login`} className="w-full px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 no-underline text-red-600" style={{ textDecoration: 'none' }}>
                                                        <button className="w-full text-sm hover:bg-gray-50 flex items-center gap-2 no-underline text-red-600"><LogOut size={16} /> Log Out</button>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-indigo-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Fines</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{totalFines}</h3>
                                    </div>
                                    <div className="p-3 bg-indigo-100 rounded-full">
                                        <DollarSign className="text-indigo-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-rose-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Unpaid Fines</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{unpaidFines}</h3>
                                    </div>
                                    <div className="p-3 bg-rose-100 rounded-full">
                                        <DollarSign className="text-rose-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <h3 className="text-2xl font-bold text-gray-800">AED {totalAmount.toFixed(2)}</h3>
                                    </div>
                                    <div className="p-3 bg-amber-100 rounded-full">
                                        <DollarSign className="text-amber-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Unpaid Amount</p>
                                        <h3 className="text-2xl font-bold text-gray-800">AED {unpaidAmount.toFixed(2)}</h3>
                                    </div>
                                    <div className="p-3 bg-emerald-100 rounded-full">
                                        <DollarSign className="text-emerald-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Filters and Search */}
                        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search fines..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                <div className="flex max-sm:flex-col gap-2">
                                    <select
                                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="Paid">Paid</option>
                                        <option value="UnPaid">Unpaid</option>
                                    </select>
                                    
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                                        <Filter size={18} /> Filter
                                    </button>
                                    
                                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                                        <Download size={18} /> Export
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Fines Table */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort("date")}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Date & Time
                                                    {sortField === "date" && (
                                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                    )}
                                                </div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fine Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Plate
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Reason
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Location
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Source
                                            </th>
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort("amount")}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Amount (AED)
                                                    {sortField === "amount" && (
                                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                    )}
                                                </div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {sortedAndFilteredData.map((fine) => (
                                            <motion.tr 
                                                key={fine.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{formatDate(fine.date)}</div>
                                                    <div className="text-sm text-gray-500">{formatTime(fine.date)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.fineNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.plate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.reason}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.source}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {fine.amount.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        fine.status === "Paid" 
                                                            ? "bg-green-100 text-green-800" 
                                                            : "bg-red-100 text-red-800"
                                                    }`}>
                                                        {fine.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1">
                                                        <Eye size={16} /> View
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {sortedAndFilteredData.length === 0 && (
                                <div className="text-center py-12">
                                    <DollarSign className="mx-auto text-gray-400" size={48} />
                                    <p className="mt-4 text-gray-500">No fines found matching your criteria</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                                <span className="font-medium">{sortedAndFilteredData.length}</span> results
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700">
                                    Next
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
  )
}

export default FinesMain;