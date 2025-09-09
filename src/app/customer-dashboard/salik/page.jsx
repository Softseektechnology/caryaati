'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search, Filter, Download, Eye, ChevronDown, ChevronUp, MapPin, Navigation, Receipt } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";
import Link from "next/link";

export default function SalikPage() {
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
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    // Salik data from the provided content
    const salikData = [
        { id: 1, company: "Rent a Car Demo Account", date: "12-May-2024", time: "7:09 PM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "67657535454", tagNumber: "", postDate: "12-May-2024", status: "Paid" },
        { id: 2, company: "Rent a Car Demo Account", date: "13-May-2024", time: "12:09 AM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "53653653t", tagNumber: "", postDate: "13-May-2024", status: "Paid" },
        { id: 3, company: "Rent a Car Demo Account", date: "13-May-2024", time: "12:09 AM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "43653655", tagNumber: "", postDate: "13-May-2024", status: "Paid" },
        { id: 4, company: "Rent a Car Demo Account", date: "12-May-2024", time: "4:09 PM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "4635653745", tagNumber: "", postDate: "12-May-2024", status: "Paid" },
        { id: 5, company: "Rent a Car Demo Account", date: "12-May-2024", time: "5:09 PM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "655353565", tagNumber: "", postDate: "12-May-2024", status: "Paid" },
        { id: 6, company: "Rent a Car Demo Account", date: "13-May-2024", time: "12:09 AM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "3463553", tagNumber: "", postDate: "13-May-2024", status: "Paid" },
        { id: 7, company: "Rent a Car Demo Account", date: "14-May-2024", time: "12:09 AM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "6536335", tagNumber: "", postDate: "14-May-2024", status: "Paid" },
        { id: 8, company: "Rent a Car Demo Account", date: "16-May-2024", time: "12:09 AM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "6533446", tagNumber: "", postDate: "16-May-2024", status: "Paid" },
        { id: 9, company: "Rent a Car Demo Account", date: "12-May-2024", time: "8:09 PM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "3535753", tagNumber: "", postDate: "12-May-2024", status: "Paid" },
        { id: 10, company: "Rent a Car Demo Account", date: "13-May-2024", time: "12:09 AM", plate: "94088976", tollGate: "Dubai", direction: "AUH", amount: 4, transactionId: "3635653", tagNumber: "", postDate: "13-May-2024", status: "Paid" },
        { id: 11, company: "Rent a Car Demo Account", date: "06-Jun-2024", time: "11:38 AM", plate: "K4656657", tollGate: "Dubai", direction: "Dubai", amount: 4, transactionId: "748453654", tagNumber: "", postDate: "06-Jun-2024", status: "Paid" },
        { id: 12, company: "Rent a Car Demo Account", date: "06-Jun-2024", time: "12:38 PM", plate: "K4656657", tollGate: "Barsha", direction: "Dubai", amount: 4, transactionId: "575444263", tagNumber: "", postDate: "06-Jun-2024", status: "Paid" },
        { id: 13, company: "Rent a Car Demo Account", date: "05-Jun-2024", time: "3:38 PM", plate: "K4656657", tollGate: "Safa", direction: "Business Bay", amount: 4, transactionId: "46564262", tagNumber: "", postDate: "05-Jun-2024", status: "Paid" },
        { id: 14, company: "Rent a Car Demo Account", date: "15-Oct-2024", time: "12:51 PM", plate: "K4656657", tollGate: "Safa", direction: "D", amount: 4, transactionId: "75867453", tagNumber: "", postDate: "15-Oct-2024", status: "Paid" },
        { id: 15, company: "Rent a Car Demo Account", date: "15-Oct-2024", time: "12:51 PM", plate: "K4656657", tollGate: "Safa", direction: "D", amount: 4, transactionId: "7564twre", tagNumber: "", postDate: "15-Oct-2024", status: "Paid" },
        { id: 16, company: "Rent a Car Demo Account", date: "16-Oct-2024", time: "12:51 PM", plate: "K4656657", tollGate: "Safa", direction: "D", amount: 4, transactionId: "65474564", tagNumber: "", postDate: "16-Oct-2024", status: "Paid" },
        { id: 17, company: "Rent a Car Demo Account", date: "15-Oct-2024", time: "12:51 PM", plate: "K4656657", tollGate: "Safa", direction: "D", amount: 4, transactionId: "8665467", tagNumber: "", postDate: "16-Oct-2024", status: "Paid" },
        { id: 18, company: "Rent a Car Demo Account", date: "27-May-2025", time: "8:37 AM", plate: "94150611", tollGate: "Safa", direction: "Dubai", amount: 4, transactionId: "897453245647", tagNumber: "", postDate: "27-May-2025", status: "Paid" },
        { id: 19, company: "Rent a Car Demo Account", date: "29-May-2025", time: "11:37 AM", plate: "94150611", tollGate: "Gharhoud", direction: "Sharjah", amount: 4, transactionId: "897645332456", tagNumber: "", postDate: "29-May-2025", status: "Paid" },
        { id: 20, company: "Rent a Car Demo Account", date: "04-Jun-2025", time: "1:42 PM", plate: "94150611", tollGate: "Dubai Mall", direction: "Cenima", amount: 100, transactionId: "843242567709", tagNumber: "", postDate: "04-Jun-2025", status: "Paid" },
        { id: 21, company: "Rent a Car Demo Account", date: "04-Jun-2025", time: "1:05 PM", plate: "1611247441", tollGate: "Safa", direction: "Dubai", amount: 4, transactionId: "643867757456", tagNumber: "", postDate: "04-Jun-2025", status: "Paid" },
        { id: 22, company: "Rent a Car Demo Account", date: "05-Jun-2025", time: "3:31 PM", plate: "1611247441", tollGate: "Mamazar", direction: "Sharjah", amount: 4, transactionId: "457567456345", tagNumber: "", postDate: "05-Jun-2025", status: "Paid" },
        { id: 23, company: "Rent a Car Demo Account", date: "27-Jun-2025", time: "6:27 PM", plate: "1611247441", tollGate: "Business Bay", direction: "Abu Dhabi", amount: 4, transactionId: "457767456345", tagNumber: "", postDate: "27-Jun-2025", status: "Paid" },
        { id: 24, company: "Rent a Car Demo Account", date: "06-Jun-2025", time: "3:18 PM", plate: "1611247441", tollGate: "Garhoud", direction: "Deira", amount: 4, transactionId: "76867456445", tagNumber: "", postDate: "06-Jun-2025", status: "Paid" },
        { id: 25, company: "Rent a Car Demo Account", date: "24-Jun-2025", time: "3:29 PM", plate: "1611247441", tollGate: "Dubai Mall Parkin", direction: "Fashion", amount: 20, transactionId: "78674563574", tagNumber: "", postDate: "24-Jun-2025", status: "Paid" },
        { id: 26, company: "Rent a Car Demo Account", date: "23-May-2025", time: "9:34 AM", plate: "93851241", tollGate: "Al Safa North", direction: "Abu Dhabi", amount: 4, transactionId: "1234323423333", tagNumber: "", postDate: "23-May-2025", status: "Paid" },
        { id: 27, company: "Rent a Car Demo Account", date: "23-May-2025", time: "3:48 PM", plate: "93851241", tollGate: "Al Safa North", direction: "Abu Dhabi", amount: 4, transactionId: "2343234232323", tagNumber: "", postDate: "23-May-2025", status: "Paid" },
        { id: 28, company: "Rent a Car Demo Account", date: "24-May-2025", time: "2:51 PM", plate: "93851241", tollGate: "Al Safa North", direction: "Abu Dhabi", amount: 4, transactionId: "23434543", tagNumber: "", postDate: "24-May-2025", status: "Paid" },
        { id: 29, company: "Rent a Car Demo Account", date: "23-May-2025", time: "2:51 PM", plate: "93851241", tollGate: "Al Safa North", direction: "Abu Dhabi", amount: 4, transactionId: "45433423", tagNumber: "", postDate: "23-May-2025", status: "Paid" },
        { id: 30, company: "Rent a Car Demo Account", date: "24-May-2025", time: "2:51 PM", plate: "93851241", tollGate: "gurair mall", direction: "Dubai", amount: 4, transactionId: "434545443", tagNumber: "", postDate: "24-May-2025", status: "Paid" },
        { id: 31, company: "Rent a Car Demo Account", date: "23-May-2025", time: "2:51 PM", plate: "93851241", tollGate: "Gurair Mall", direction: "Dubai", amount: 4, transactionId: "3453434343", tagNumber: "", postDate: "23-May-2025", status: "Paid" },
        { id: 32, company: "Morning Star Rent a Car LLC", date: "09-Jul-2025", time: "12:38 AM", plate: "DF34353", tollGate: "Business bay", direction: "Safa", amount: 4, transactionId: "8098764533", tagNumber: "", postDate: "09-Jul-2025", status: "Paid" },
        { id: 33, company: "Morning Star Rent a Car LLC", date: "10-Jul-2025", time: "1:38 AM", plate: "DF34353", tollGate: "Mirdif", direction: "Sharjah", amount: 6, transactionId: "45698076453", tagNumber: "", postDate: "09-Jul-2025", status: "Paid" },
        { id: 34, company: "Morning Star Rent a Car LLC", date: "09-Jul-2025", time: "1:38 AM", plate: "DF34353", tollGate: "Deira", direction: "Mall parking", amount: 20, transactionId: "34789045345", tagNumber: "", postDate: "09-Jul-2025", status: "Paid" },
        { id: 35, company: "Rent a Car Demo Account", date: "01-Sep-2025", time: "9:35 PM", plate: "1010146816", tollGate: "Safa", direction: "Safa", amount: 4, transactionId: "4557689675", tagNumber: "", postDate: "01-Sep-2025", status: "Paid" },
        { id: 36, company: "Rent a Car Demo Account", date: "01-Sep-2025", time: "9:37 PM", plate: "1010146816", tollGate: "Dubai", direction: "Safa", amount: 6, transactionId: "54675678465", tagNumber: "", postDate: "01-Sep-2025", status: "Paid" },
        { id: 37, company: "Rent a Car Demo Account", date: "01-Sep-2025", time: "10:35 PM", plate: "1010146816", tollGate: "Mirdif", direction: "Safa", amount: 40, transactionId: "76574524576", tagNumber: "", postDate: "01-Sep-2025", status: "Paid" },
        { id: 38, company: "Rent a Car Demo Account", date: "01-Sep-2025", time: "10:35 PM", plate: "1010146816", tollGate: "City", direction: "Safa", amount: 100, transactionId: "47653866", tagNumber: "", postDate: "01-Sep-2025", status: "Paid" },
    ];

    // Calculate summary statistics
    const totalTransactions = salikData.length;
    const totalAmount = salikData.reduce((sum, transaction) => sum + transaction.amount, 0);
    const averageAmount = totalAmount / totalTransactions;
    
    // Get unique plates for filtering
    const uniquePlates = [...new Set(salikData.map(item => item.plate))];
    const [filterPlate, setFilterPlate] = useState("all");
    
    // Get unique toll gates for filtering
    const uniqueTollGates = [...new Set(salikData.map(item => item.tollGate))];
    const [filterTollGate, setFilterTollGate] = useState("all");

    // Sort and filter data
    const sortedAndFilteredData = salikData
        .filter(transaction => {
            const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
            const matchesPlate = filterPlate === "all" || transaction.plate === filterPlate;
            const matchesTollGate = filterTollGate === "all" || transaction.tollGate === filterTollGate;
            const matchesSearch = searchQuery === "" || 
                Object.values(transaction).some(value => 
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                );
            return matchesStatus && matchesPlate && matchesTollGate && matchesSearch;
        })
        .sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            if (sortField === "date") {
                // Convert date strings to Date objects for proper sorting
                aValue = new Date(a.date.split('-').reverse().join('-'));
                bValue = new Date(b.date.split('-').reverse().join('-'));
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

    const formatCurrency = (amount) => {
        return `AED ${amount.toFixed(2)}`;
    };

    const getAmountColor = (amount) => {
        if (amount > 20) return "text-red-600 font-semibold";
        if (amount > 10) return "text-amber-600";
        return "text-green-600";
    };

    const openTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeTransactionDetails = () => {
        setSelectedTransaction(null);
    };

    // Group data by plate for charts
    const transactionsByPlate = salikData.reduce((acc, transaction) => {
        if (!acc[transaction.plate]) {
            acc[transaction.plate] = { count: 0, total: 0 };
        }
        acc[transaction.plate].count += 1;
        acc[transaction.plate].total += transaction.amount;
        return acc;
    }, {});

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
                }} />
            <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'salik'} onClose={handleSidebarClose} />
            {/* User Dropdown */}
            <UserDropdown isOpen={isDropdownOpen} />

            <div className="flex flex-col min-h-screen md:pl-[72px]">
                <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                    <main className="flex-1 px-1 py-2 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                        <header className="flex items-center justify-between mb-6 bg-white content-center p-4 rounded-xl shadow-sm relative">
                            <div className="flex items-center relative max-sm:left-[-10px] w-full justify-between">
                                <div className="flex items-center">
                                    <h1 className="text-xl dashboard-text sm:text-2xl font-bold text-gray-800">Salik Transactions</h1>
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
                                        <p className="text-sm text-gray-500">Total Transactions</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{totalTransactions}</h3>
                                    </div>
                                    <div className="p-3 bg-indigo-100 rounded-full">
                                        <Receipt className="text-indigo-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalAmount)}</h3>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <DollarSign className="text-green-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Average Toll</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(averageAmount)}</h3>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <DollarSign className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Unique Vehicles</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{uniquePlates.length}</h3>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <Car className="text-purple-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Vehicle Summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Transactions by Vehicle</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.entries(transactionsByPlate).slice(0, 4).map(([plate, data], index) => (
                                    <motion.div 
                                        key={plate}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 p-4 rounded-lg"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-500">Plate {plate}</p>
                                                <p className="text-lg font-semibold">{data.count} transactions</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="text-lg font-semibold text-green-600">{formatCurrency(data.total)}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-indigo-600 h-2 rounded-full" 
                                                style={{ width: `${(data.count / Math.max(...Object.values(transactionsByPlate).map(d => d.count))) * 100}%` }}
                                            ></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                <div className="flex max-sm:flex-col gap-2 flex-wrap">
                                    <select
                                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={filterPlate}
                                        onChange={(e) => setFilterPlate(e.target.value)}
                                    >
                                        <option value="all">All Plates</option>
                                        {uniquePlates.map(plate => (
                                            <option key={plate} value={plate}>{plate}</option>
                                        ))}
                                    </select>
                                    
                                    <select
                                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={filterTollGate}
                                        onChange={(e) => setFilterTollGate(e.target.value)}
                                    >
                                        <option value="all">All Toll Gates</option>
                                        {uniqueTollGates.map(gate => (
                                            <option key={gate} value={gate}>{gate}</option>
                                        ))}
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

                        {/* Transactions Table */}
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
                                                Plate
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Toll Gate
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Direction
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
                                        {sortedAndFilteredData.map((transaction) => (
                                            <motion.tr 
                                                key={transaction.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{transaction.date}</div>
                                                    <div className="text-sm text-gray-500">{transaction.time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {transaction.plate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={14} className="text-gray-400" />
                                                        {transaction.tollGate}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex items-center gap-1">
                                                        <Navigation size={14} className="text-gray-400" />
                                                        {transaction.direction}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <span className={getAmountColor(transaction.amount)}>
                                                        {formatCurrency(transaction.amount)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        onClick={() => openTransactionDetails(transaction)}
                                                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                                                    >
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
                                    <Receipt className="mx-auto text-gray-400" size={48} />
                                    <p className="mt-4 text-gray-500">No transactions found matching your criteria</p>
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
            <Footer />
        </>
    );
}