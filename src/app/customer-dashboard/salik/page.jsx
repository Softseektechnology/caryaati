'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search, Filter, Download, Eye, ChevronDown, ChevronUp, MapPin, Navigation, Receipt } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";
import Link from "next/link";
import SalikMain from "./SalikMain";

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

            <SalikMain />
            <Footer />
        </>
    );
}