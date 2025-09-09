'use client'

import { useState } from "react";
import { Menu, LogOut, User, Heart, Calendar, DollarSign, Car, LayoutGrid, Search, Filter, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/foorter/Footer";
import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";
import Link from "next/link";
import FinesMain from "./FinesMain";

export default function FinesPage() {
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
            <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'fines'} onClose={handleSidebarClose} />
            {/* User Dropdown */}
            <UserDropdown isOpen={isDropdownOpen} />

            <FinesMain />
            <Footer />
        </>
    );
}