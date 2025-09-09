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
import ProfileMain from "./ProfileMain";

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

    // Account Info States
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "MAAZ AZIZ ABDUL AZIZ QADRI",
        email: "maximusmaaz@gmail.com",
        phone: "+971 50 188 9924",
        gender: "Male",
        dateOfBirth: "04-02-1988",
        nationality: "Pakistan",
        countryOfResidence: "United Arab Emirates"
    });
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [tempPersonalInfo, setTempPersonalInfo] = useState(personalInfo);

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setTempPersonalInfo(prev => ({ ...prev, [name]: value }));
    };

    const startEditingPersonal = () => {
        setTempPersonalInfo({ ...personalInfo });
        setIsEditingPersonal(true);
    };

    const savePersonal = () => {
        setPersonalInfo({ ...tempPersonalInfo });
        setIsEditingPersonal(false);
    };

    const cancelPersonal = () => {
        setIsEditingPersonal(false);
    };

    const [licenseInfo, setLicenseInfo] = useState({
        documentType: "UAE Driving License",
        documentNo: "4109329",
        expiryDate: "26-04-2028",
        issueDate: "04-04-2021",
        dateOfBirth: "04-02-1988",
        frontCopy: "No file chosen",
        backCopy: "No file chosen"
    });
    const [isEditingLicense, setIsEditingLicense] = useState(false);
    const [tempLicenseInfo, setTempLicenseInfo] = useState(licenseInfo);

    const handleLicenseChange = (e) => {
        const { name, value } = e.target;
        setTempLicenseInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLicenseFileChange = (e, side) => {
        const file = e.target.files[0];
        setTempLicenseInfo(prev => ({
            ...prev,
            [`${side}Copy`]: file ? file.name : "No file chosen"
        }));
    };

    const startEditingLicense = () => {
        setTempLicenseInfo({ ...licenseInfo });
        setIsEditingLicense(true);
    };

    const saveLicense = () => {
        setLicenseInfo({ ...tempLicenseInfo });
        setIsEditingLicense(false);
    };

    const cancelLicense = () => {
        setIsEditingLicense(false);
    };

    const [cards, setCards] = useState([
        { id: 1, type: "Visa", last4: "1234", expiry: "12/2025" },
        { id: 2, type: "Mastercard", last4: "5678", expiry: "09/2024" }
    ]);
    const [showAddCard, setShowAddCard] = useState(false);
    const [newCard, setNewCard] = useState({ type: "", last4: "", expiry: "" });
    const [editingCard, setEditingCard] = useState(null);

    const handleNewCardChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prev => ({ ...prev, [name]: value }));
    };

    const addCard = () => {
        if (!newCard.type || !newCard.last4 || !newCard.expiry) return;
        setCards(prev => [...prev, { id: prev.length + 1, ...newCard }]);
        setNewCard({ type: "", last4: "", expiry: "" });
        setShowAddCard(false);
    };

    const startEditingCard = (card) => {
        setEditingCard({ ...card });
    };

    const handleEditCardChange = (e) => {
        const { name, value } = e.target;
        setEditingCard(prev => ({ ...prev, [name]: value }));
    };

    const updateCard = () => {
        if (!editingCard.type || !editingCard.last4 || !editingCard.expiry) return;
        setCards(prev =>
            prev.map(c => c.id === editingCard.id ? editingCard : c)
        );
        setEditingCard(null);
    };

    const deleteCard = (id) => {
        setCards(prev => prev.filter(c => c.id !== id));
    };

    const [documents, setDocuments] = useState([
        { 
            id: 1, 
            type: "Emirates Id", 
            documentNo: "784198831963255", 
            expiryDate: "06-02-2026", 
            issueBy: "RTA", 
            frontCopy: "No file chosen", 
            backCopy: "No file chosen",
            name: "Emirates ID.pdf", 
            uploaded: "Just now" 
        },
        { id: 2, name: "Passport.pdf", uploaded: "2 days ago" },
        { id: 3, name: "ID_Card.pdf", uploaded: "1 week ago" }
    ]);
    const [showAddDocument, setShowAddDocument] = useState(false);
    const [newDocument, setNewDocument] = useState({ name: "", uploaded: "Just now", frontCopy: "No file chosen", backCopy: "No file chosen" });
    const [editingDocument, setEditingDocument] = useState(null);

    const handleNewDocumentChange = (e) => {
        const { name, value } = e.target;
        setNewDocument(prev => ({ ...prev, [name]: value }));
    };

    const handleNewDocumentFileChange = (e, side) => {
        const file = e.target.files[0];
        setNewDocument(prev => ({
            ...prev,
            [`${side}Copy`]: file ? file.name : "No file chosen"
        }));
    };

    const handleNewDocumentNameFromFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewDocument(prev => ({ 
                ...prev, 
                name: file.name, 
                uploaded: "Just now",
                frontCopy: file.name, // Assuming single file for simple docs
                backCopy: "No file chosen"
            }));
        }
    };

    const addDocument = () => {
        if (!newDocument.name) return;
        setDocuments(prev => [...prev, { id: prev.length + 1, ...newDocument }]);
        setNewDocument({ name: "", uploaded: "Just now", frontCopy: "No file chosen", backCopy: "No file chosen" });
        setShowAddDocument(false);
    };

    const startEditingDocument = (doc) => {
        setEditingDocument({ ...doc });
    };

    const handleEditDocumentChange = (e) => {
        const { name, value } = e.target;
        setEditingDocument(prev => ({ ...prev, [name]: value }));
    };

    const handleEditDocumentFileChange = (e, side) => {
        const file = e.target.files[0];
        setEditingDocument(prev => ({
            ...prev,
            [`${side}Copy`]: file ? file.name : prev[`${side}Copy`]
        }));
    };

    const updateDocument = () => {
        if (!editingDocument.name) return;
        setDocuments(prev =>
            prev.map(d => d.id === editingDocument.id ? editingDocument : d)
        );
        setEditingDocument(null);
    };

    const deleteDocument = (id) => {
        setDocuments(prev => prev.filter(d => d.id !== id));
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

            <Sidebar isOpen={isSidebarOpen} isDashboard={true} active={'profile'} onClose={handleSidebarClose} />
            <UserDropdown isOpen={isDropdownOpen} />

            <ProfileMain />
        </>
    );
}