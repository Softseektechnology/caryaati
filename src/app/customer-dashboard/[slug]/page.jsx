'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ArrowRight } from "lucide-react";

import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import Footer from "@/components/foorter/Footer";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";
import Main from "./main";

export default function ComingSoonPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSidebarClose = () => setIsSidebarOpen(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
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
        }}
      />

      <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'widgets'} onClose={handleSidebarClose} />
      <UserDropdown isOpen={isDropdownOpen} />

      <Main />
    </>
  );
}