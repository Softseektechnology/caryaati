'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search, Filter, Download, Eye, ChevronDown, ChevronUp, Clock, MapPin, MoreVertical } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";
import Link from "next/link";

export default function BookingPage() {
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
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    // Booking data from the image
    const bookingData = [
        { id: 1, refNo: 100528, timeSlot: "01:00 - 02:00", company: "Rent a Car Demo Account", car: "10146816", quantity: "0000000", date: "2023-06-01", status: "Confirmed" },
        { id: 2, refNo: 104101, timeSlot: "19:05 - 20:00", company: "Rent a Car Demo Account", car: "8986406", quantity: "0000000", date: "2023-06-02", status: "Completed" },
        { id: 3, refNo: 100072, timeSlot: "09:07 - 10:00", company: "Morning Star Rent a Car LLC", car: "36323", quantity: "0000000", date: "2023-06-03", status: "Confirmed" },
        { id: 4, refNo: 99358, timeSlot: "30:06 - 31:00", company: "Rent a Car Demo Account", car: "3693931", quantity: "0000000", date: "2023-06-04", status: "Cancelled" },
        { id: 5, refNo: 98991, timeSlot: "26:06 - 29:00", company: "Rent a Car Demo Account", car: "3605731", quantity: "0000000", date: "2023-06-05", status: "Confirmed" },
        { id: 6, refNo: 98715, timeSlot: "24:06 - 28:00", company: "Rent a Car Demo Account", car: "3754388", quantity: "0000000", date: "2023-06-06", status: "Completed" },
        { id: 7, refNo: 98053, timeSlot: "22:06 - 25:00", company: "Rent a Car Demo Account", car: "3710581", quantity: "0000000", date: "2023-06-07", status: "Confirmed" },
        { id: 8, refNo: 98019, timeSlot: "17:06 - 20:00", company: "Rent a Car Demo Account", car: "3891304", quantity: "0000000", date: "2023-06-08", status: "Pending" },
        { id: 9, refNo: 97920, timeSlot: "18:06 - 20:00", company: "Rent a Car Demo Account", car: "3700501", quantity: "0000000", date: "2023-06-09", status: "Confirmed" },
        { id: 10, refNo: 97768, timeSlot: "14:06 - 20:00", company: "Rent a Car Demo Account", car: "3780776", quantity: "0000000", date: "2023-06-10", status: "Completed" },
        { id: 11, refNo: 96971, timeSlot: "09:06 - 20:00", company: "Rent a Car Demo Account", car: "11363441", quantity: "0000000", date: "2023-06-11", status: "Confirmed" },
        { id: 12, refNo: 96337, timeSlot: "27:06 - 20:00", company: "Rent a Car Demo Account", car: "4000000", quantity: "0000000", date: "2023-06-12", status: "Cancelled" },
        { id: 13, refNo: 96581, timeSlot: "26:06 - 20:00", company: "Rent a Car Demo Account", car: "4195611", quantity: "0000000", date: "2023-06-13", status: "Confirmed" },
        { id: 14, refNo: 95045, timeSlot: "16:06 - 20:00", company: "Rent a Car Demo Account", car: "3879566", quantity: "0000000", date: "2023-06-14", status: "Pending" },
        { id: 15, refNo: 95240, timeSlot: "15:06 - 20:00", company: "Rent a Car Demo Account", car: "4027341", quantity: "0000000", date: "2023-06-15", status: "Confirmed" },
        { id: 16, refNo: 95333, timeSlot: "15:06 - 20:00", company: "Rent a Car Demo Account", car: "3251081", quantity: "0000000", date: "2023-06-16", status: "Completed" },
        { id: 17, refNo: 95961, timeSlot: "15:06 - 20:00", company: "Premium Car Rentals", car: "2000000", quantity: "0000000", date: "2023-06-17", status: "Confirmed" },
        { id: 18, refNo: 95947, timeSlot: "11:06 - 20:00", company: "Rent a Car Demo Account", car: "2951081", quantity: "0000000", date: "2023-06-18", status: "Cancelled" },
        { id: 19, refNo: 95963, timeSlot: "11:06 - 20:00", company: "Rent a Car Demo Account", car: "4450606", quantity: "0000000", date: "2023-06-19", status: "Confirmed" },
        { id: 20, refNo: 95964, timeSlot: "11:06 - 20:00", company: "Rent a Car Demo Account", car: "4450567", quantity: "0000000", date: "2023-06-20", status: "Pending" },
    ];

    // Calculate summary statistics
    const totalBookings = bookingData.length;
    const confirmedBookings = bookingData.filter(booking => booking.status === "Confirmed").length;
    const completedBookings = bookingData.filter(booking => booking.status === "Completed").length;
    const pendingBookings = bookingData.filter(booking => booking.status === "Pending").length;

    // Sort and filter data
    const sortedAndFilteredData = bookingData
        .filter(booking => {
            const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
            const matchesSearch = searchQuery === "" || 
                Object.values(booking).some(value => 
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

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed": return "bg-blue-100 text-blue-800";
            case "Completed": return "bg-green-100 text-green-800";
            case "Pending": return "bg-amber-100 text-amber-800";
            case "Cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const openBookingDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const closeBookingDetails = () => {
        setSelectedBooking(null);
    };

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
            <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'booking'} onClose={handleSidebarClose} />
            {/* User Dropdown */}
            <UserDropdown isOpen={isDropdownOpen} />

            <div className="flex flex-col min-h-screen md:pl-[72px]">
                <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                    <main className="flex-1 px-1 py-2 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                        <header className="flex items-center justify-between mb-6 bg-white content-center p-4 rounded-xl relative">
                            <div className="flex items-center relative max-sm:left-[-10px] w-full justify-between">
                                <div className="flex items-center">
                                    <h1 className="text-xl dashboard-text sm:text-2xl font-bold text-gray-800">Booking Dashboard</h1>
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
                                                    className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl overflow-hidden z-10"
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
                                className="bg-white rounded-2xl p-6 border-l-4 border-indigo-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Bookings</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{totalBookings}</h3>
                                    </div>
                                    <div className="p-3 bg-indigo-100 rounded-full">
                                        <Calendar className="text-indigo-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 border-l-4 border-blue-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Confirmed</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{confirmedBookings}</h3>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <Calendar className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl p-6 border-l-4 border-green-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Completed</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{completedBookings}</h3>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <Calendar className="text-green-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl p-6 border-l-4 border-amber-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Pending</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{pendingBookings}</h3>
                                    </div>
                                    <div className="p-3 bg-amber-100 rounded-full">
                                        <Clock className="text-amber-600" size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Filters and Search */}
                        <div className="bg-white rounded-2xl p-4 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search bookings..."
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
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Cancelled">Cancelled</option>
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

                        {/* Bookings Table */}
                        <div className="bg-white rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ref No.
                                            </th>
                                            <th 
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => handleSort("date")}
                                            >
                                                <div className="flex items-center gap-1">
                                                    Date
                                                    {sortField === "date" && (
                                                        sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                    )}
                                                </div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time Slot
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Company
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Car
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
                                        {sortedAndFilteredData.map((booking) => (
                                            <motion.tr 
                                                key={booking.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {booking.refNo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(booking.date)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={14} className="text-gray-400" />
                                                        {booking.timeSlot}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {booking.company}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {booking.car}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        onClick={() => openBookingDetails(booking)}
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
                                    <Calendar className="mx-auto text-gray-400" size={48} />
                                    <p className="mt-4 text-gray-500">No bookings found matching your criteria</p>
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

            {/* Booking Detail Modal */}
            <AnimatePresence>
                {selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
                                <button onClick={closeBookingDetails} className="text-gray-500 hover:text-gray-700">
                                    &times;
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Reference Number</h3>
                                    <p className="text-lg font-semibold">{selectedBooking.refNo}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                                        {selectedBooking.status}
                                    </span>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Date</h3>
                                    <p className="text-lg">{formatDate(selectedBooking.date)}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Time Slot</h3>
                                    <p className="text-lg">{selectedBooking.timeSlot}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Company</h3>
                                    <p className="text-lg">{selectedBooking.company}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Car</h3>
                                    <p className="text-lg">{selectedBooking.car}</p>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Quantity</h3>
                                    <p className="text-lg">{selectedBooking.quantity}</p>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex justify-end gap-3">
                                <button 
                                    onClick={closeBookingDetails}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                    Edit Booking
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
}