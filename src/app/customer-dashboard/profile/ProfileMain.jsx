import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Mail, Phone, MapPin, Calendar, FileText,
    CreditCard, Key, Trash2, Edit, Plus, CheckCircle,
    ChevronDown, ChevronUp, Search, Filter, Download,
    Eye, Lock, X
} from "lucide-react";

import Navbar from "@/components/nevegation-header/Navbar";
import Sidebar from "@/components/multiplepages/Sidebar-multiplelinks";
import Footer from "@/components/foorter/Footer";
import UserDropdown from "@/components/customer-dashboard/user-dashboard";

const ProfileMain = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("accountInfo");
    const [activeAccountSubTab, setActiveAccountSubTab] = useState("personalInfo");
    const [editingDriver, setEditingDriver] = useState(null);
    const [showAddDriver, setShowAddDriver] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddDriverModal, setShowAddDriverModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

    const handleSidebarClose = () => setIsSidebarOpen(false);

    // Drivers data with enhanced document information
    const [drivers, setDrivers] = useState([
        {
            id: 1,
            driverName: "MAAZ AZIZ",
            arabicName: "",
            nationality: "Pakistan",
            documentNo: "4109329",
            email: "maximusmaaz@gmail.com",
            status: "Active",
            phone: "+971 50 123 4567",
            documentType: "Emirates ID",
            documentNumber: "784198831963255",
            documentExpiry: "06-02-2026",
            documentIssueBy: "RTA",
            frontCopy: "No file chosen",
            backCopy: "No file chosen"
        },
        {
            id: 2,
            driverName: "MAAZ AZIZ",
            arabicName: "",
            nationality: "Pakistan",
            documentNo: "4109329",
            email: "info@samr.com",
            status: "Inactive",
            phone: "+971 55 987 6543",
            documentType: "Emirates ID",
            documentNumber: "784198831963255",
            documentExpiry: "06-02-2026",
            documentIssueBy: "RTA",
            frontCopy: "No file chosen",
            backCopy: "No file chosen"
        },
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

    // New driver form state with enhanced document fields
    const [newDriver, setNewDriver] = useState({
        driverName: "",
        arabicName: "",
        nationality: "",
        documentNo: "",
        email: "",
        phone: "",
        status: "Active",
        documentType: "Emirates ID",
        documentNumber: "",
        documentExpiry: "",
        documentIssueBy: "RTA",
        frontCopy: "No file chosen",
        backCopy: "No file chosen"
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
            status: "Active",
            documentType: "Emirates ID",
            documentNumber: "",
            documentExpiry: "",
            documentIssueBy: "RTA",
            frontCopy: "No file chosen",
            backCopy: "No file chosen"
        });
        setShowAddDriverModal(false);
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
        phoneCountryCode: "+971",
        phoneNumber: "50 188 9924",
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

    // Update the cards state to include the new fields
    const [cards, setCards] = useState([
        {
            id: 2,
            type: "Mastercard",
            fullNumber: "5500 0000 0000 5678",
            last4: "5678",
            expiry: "09/2024",
            cardholderName: "MAAZ AZIZ",
            cvv: "123"
        }
    ])
    const [showAddCard, setShowAddCard] = useState(false);
    // Update the newCard state
    const [newCard, setNewCard] = useState({
        type: "",
        fullNumber: "",
        expiry: "",
        cardholderName: "",
        cvv: ""
    });

    const handleNewCardChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prev => {
            const updatedCard = { ...prev, [name]: value };

            // Automatically extract last 4 digits when full number is entered
            if (name === "fullNumber" && value.length === 20) {
                updatedCard.last4 = value.slice(-4);
            }

            return updatedCard;
        });
    };

    const addCard = () => {
        if (!newCard.type || !newCard.fullNumber || !newCard.expiry || newCard.fullNumber.length !== 20) return;

        const cardToAdd = {
            ...newCard,
            id: cards.length + 1,
            last4: newCard.fullNumber.slice(-4)
        };

        setCards(prev => [...prev, cardToAdd]);
        setNewCard({ type: "", fullNumber: "", expiry: "" });
        setShowAddCard(false);
    };

    const startEditingCard = (card) => {
        setEditingCard({ ...card });
    };

    const handleEditCardChange = (e) => {
        const { name, value } = e.target;
        setEditingCard(prev => {
            const updatedCard = { ...prev, [name]: value };
            if (name === "fullNumber" && value.length === 20) {
                updatedCard.last4 = value.slice(-4);
            }
            return updatedCard;
        });
    };

    const updateCard = () => {
        if (!editingCard.type || !editingCard.fullNumber || !editingCard.expiry || editingCard.fullNumber.length !== 20) return;
        setCards(prev =>
            prev.map(c => c.id === editingCard.id ? { ...editingCard, last4: editingCard.fullNumber.slice(-4) } : c)
        );
        setEditingCard(null);
    };

    const deleteCard = (id) => {
        setCards(prev => prev.filter(c => c.id !== id));
    };

    const [documents, setDocuments] = useState([
        {
            id: 1,
            type: "Emirates ID",
            documentNo: "784198831963255",
            expiryDate: "06-02-2026",
            issueBy: "RTA",
            frontCopy: "No file chosen",
            backCopy: "No file chosen",
            name: "Emirates ID.pdf",
            uploaded: "Just now"
        },
    ]);
    const [showAddDocument, setShowAddDocument] = useState(false);
    const [newDocument, setNewDocument] = useState({
        name: "",
        uploaded: "Just now",
        type: "Emirates ID",
        documentNo: "",
        expiryDate: "",
        issueBy: "RTA",
        frontCopy: "No file chosen",
        backCopy: "No file chosen"
    });
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
                frontCopy: file.name,
                backCopy: "No file chosen"
            }));
        }
    };

    const addDocument = () => {
        if (!newDocument.name) return;
        setDocuments(prev => [...prev, { id: prev.length + 1, ...newDocument }]);
        setNewDocument({
            name: "",
            uploaded: "Just now",
            type: "Emirates ID",
            documentNo: "",
            expiryDate: "",
            issueBy: "RTA",
            frontCopy: "No file chosen",
            backCopy: "No file chosen"
        });
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

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = () => {
        console.log("Password change submitted:", passwordData);
        setShowChangePasswordModal(false);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    // Deactivate account state
    const [deactivateReason, setDeactivateReason] = useState("");
    const [deactivatePassword, setDeactivatePassword] = useState("");

    const handleDeactivateAccount = () => {
        console.log("Account deactivation reason:", deactivateReason, "Password:", deactivatePassword);
        setShowDeactivateModal(false);
        setDeactivateReason("");
        setDeactivatePassword("");
    };

    return (
        <div className="flex flex-col min-h-screen md:pl-[72px]">
            <div className="flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
                <main className="flex-1 px-2 py-4 sm:p-6 md:p-8 overflow-auto min-w-[280px]">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Profile</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your profile settings and preferences</p>
                        </div>

                        <div className="mt-4 md:mt-0">
                            <div className="flex max-sm:flex-col flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveTab("accountInfo")}
                                    className={`px-4 py-2 transition ${activeTab === "accountInfo" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    style={{ borderRadius: '0.5rem' }}
                                >
                                    Account Information
                                </button>
                                <button
                                    onClick={() => setActiveTab("drivers")}
                                    className={`px-4 py-2 rounded-lg transition ${activeTab === "drivers" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    style={{ borderRadius: '0.5rem' }}
                                >
                                    My Drivers
                                </button>
                                <button
                                    onClick={() => setActiveTab("companyTerms")}
                                    className={`px-4 py-2 rounded-lg transition ${activeTab === "companyTerms" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    style={{ borderRadius: '0.5rem' }}
                                >
                                    Company Terms
                                </button>
                                <button
                                    onClick={() => setActiveTab("supplierTerms")}
                                    className={`px-4 py-2 rounded-lg transition ${activeTab === "supplierTerms" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    style={{ borderRadius: '0.5rem' }}
                                >
                                    Supplier Terms
                                </button>
                                <button
                                    onClick={() => setActiveTab("myCards")}
                                    className={`px-4 py-2 rounded-lg transition ${activeTab === "myCards" ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                    style={{ borderRadius: '0.5rem' }}
                                >
                                    My Cards
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
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
                                    <div className="flex max-sm:flex-col gap-2 mt-4 md:mt-0">
                                        <button
                                            onClick={() => setShowChangePasswordModal(true)}
                                            className="px-4 py-2 bg-indigo-600 text-white max-sm:text-center max-sm:justify-center max-sm:justify-items-center text-sm flex items-center gap-2"
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <Lock size={16} /> Change my password
                                        </button>
                                        <button
                                            onClick={() => setShowDeactivateModal(true)}
                                            className="px-4 py-2 bg-red-600 text-white text-sm"
                                            style={{ borderRadius: '10px' }}
                                        >
                                            Deactivate account
                                        </button>
                                    </div>
                                </div>

                                {/* Account Information Sub-Tabs */}
                                <div className="flex border-b border-gray-200 mb-6">
                                    <button
                                        onClick={() => setActiveAccountSubTab("personalInfo")}
                                        className={`px-4 py-2 font-medium text-sm ${activeAccountSubTab === "personalInfo" ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Personal Information
                                    </button>
                                    <button
                                        onClick={() => setActiveAccountSubTab("documents")}
                                        className={`px-4 py-2 font-medium text-sm ${activeAccountSubTab === "documents" ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        My Documents
                                    </button>
                                    <button
                                        onClick={() => setActiveAccountSubTab("drivingLicense")}
                                        className={`px-4 py-2 font-medium text-sm ${activeAccountSubTab === "drivingLicense" ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        My Driving License
                                    </button>
                                </div>

                                {/* Personal Information Sub-Tab */}
                                {activeAccountSubTab === "personalInfo" && (
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium flex items-center gap-2">
                                                <User size={18} /> Personal Information
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div className="flex-1">
                                                <p className="font-medium">{personalInfo.fullName}</p>
                                                <p className="text-sm text-gray-500">Nationality {personalInfo.nationality}</p>
                                                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                                                    <div><span className="font-medium">Email:</span> {personalInfo.email}</div>
                                                    <div><span className="font-medium">Phone No:</span> {personalInfo.phoneCountryCode} {personalInfo.phoneNumber}</div>
                                                    <div><span className="font-medium">Gender:</span> {personalInfo.gender}</div>
                                                    <div><span className="font-medium">Date of Birth:</span> {personalInfo.dateOfBirth}</div>
                                                    <div><span className="font-medium">Country of Residence:</span> {personalInfo.countryOfResidence}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-indigo-600" onClick={startEditingPersonal}>
                                                    <Edit size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {isEditingPersonal && (
                                            <motion.div
                                                className="mt-4 p-4 border border-indigo-200 rounded-lg"
                                            >
                                                <h4 className="text-md font-medium mb-2">Edit Personal Information</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            value={tempPersonalInfo.fullName}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={tempPersonalInfo.email}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Country Code</label>
                                                        <input
                                                            type="text"
                                                            name="phoneCountryCode"
                                                            value={tempPersonalInfo.phoneCountryCode}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            placeholder="+971"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                        <input
                                                            type="text"
                                                            name="phoneNumber"
                                                            value={tempPersonalInfo.phoneNumber}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            placeholder="50 188 9924"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                                        <select
                                                            name="gender"
                                                            value={tempPersonalInfo.gender}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        >
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                                        <input
                                                            type="text"
                                                            name="dateOfBirth"
                                                            value={tempPersonalInfo.dateOfBirth}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            placeholder="DD-MM-YYYY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                                        <input
                                                            type="text"
                                                            name="nationality"
                                                            value={tempPersonalInfo.nationality}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label>
                                                        <input
                                                            type="text"
                                                            name="countryOfResidence"
                                                            value={tempPersonalInfo.countryOfResidence}
                                                            onChange={handlePersonalChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-4 justify-end">
                                                    <button onClick={cancelPersonal} className="px-4 py-2 border border-gray-300" style={{ borderRadius: "10px" }}>Cancel</button>
                                                    <button onClick={savePersonal} className="px-4 py-2 bg-indigo-600 text-white" style={{ borderRadius: "10px" }}>Save</button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}


                                {/* My Documents Sub-Tab */}

                                {activeAccountSubTab === "documents" && (
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium flex items-center gap-2">
                                                <FileText size={18} /> My Documents
                                            </h3>
                                        </div>
                                        <div className="space-y-3">
                                            {documents.map(doc => (
                                                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                                    <div className="flex-1">
                                                        <p className="font-medium">{doc.name}</p>
                                                        <p className="text-sm text-gray-500">Uploaded {doc.uploaded}</p>
                                                        {doc.type && (
                                                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                                                                <div><span className="font-medium">Type:</span> {doc.type}</div>
                                                                <div><span className="font-medium">No:</span> {doc.documentNo}</div>
                                                                <div><span className="font-medium">Expiry:</span> {doc.expiryDate}</div>
                                                                <div><span className="font-medium">Issued by:</span> {doc.issueBy}</div>
                                                                <div><span className="font-medium">Front:</span> {doc.frontCopy}</div>
                                                                <div><span className="font-medium">Back:</span> {doc.backCopy}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="text-indigo-600" onClick={() => startEditingDocument(doc)}>
                                                            <Edit size={16} />
                                                        </button>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Edit Document */}
                                        {editingDocument && (
                                            <motion.div
                                                className="mt-4 p-4 border border-indigo-200 rounded-lg"
                                            >
                                                <h4 className="text-md font-medium mb-2">Edit Document</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                                                        <select
                                                            name="type"
                                                            value={editingDocument.type}
                                                            onChange={handleEditDocumentChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        >
                                                            <option value="Emirates ID">Emirates ID</option>
                                                            <option value="Passport">Passport</option>
                                                            <option value="Visit Visa">Visit Visa</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document No</label>
                                                        <input
                                                            type="text"
                                                            name="documentNo"
                                                            value={editingDocument.documentNo}
                                                            onChange={handleEditDocumentChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Expiry</label>
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={editingDocument.expiryDate}
                                                            onChange={handleEditDocumentChange}
                                                            placeholder="DD-MM-YYYY"
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Issue By</label>
                                                        <input
                                                            type="text"
                                                            name="issueBy"
                                                            value={editingDocument.issueBy}
                                                            onChange={handleEditDocumentChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Attach Front Copy</label>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleEditDocumentFileChange(e, 'front')}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">{editingDocument.frontCopy}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Attach Back Copy</label>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleEditDocumentFileChange(e, 'back')}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">{editingDocument.backCopy}</p>
                                                    </div>
                                                    <div>
                                                        <img src="https://caryaati.com/erps/images/documents/sapro_doc_customer_11_1726743244.jpeg" alt="" className='max-h-[200px]' />
                                                    </div>
                                                    <div>
                                                        <img src="https://caryaati.com/erps/images/documents/sapro_doc_customer_back_11_1726743245.jpeg" alt="" className='max-h-[200px]' />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-4 justify-end">
                                                    <button onClick={() => setEditingDocument(null)} className="px-4 py-2 border border-gray-300" style={{ borderRadius: "10px" }}>Cancel</button>
                                                    <button onClick={updateDocument} className="px-4 py-2 bg-indigo-600 text-white" style={{ borderRadius: "10px" }}>Update</button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}


                                {/* My Driving License Sub-Tab */}
                                {activeAccountSubTab === "drivingLicense" && (
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium flex items-center gap-2">
                                                <FileText size={18} /> My Driving License
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                            <div className="flex-1">
                                                <p className="font-medium">{licenseInfo.documentType}</p>
                                                <p className="text-sm text-gray-500">Document Number: {licenseInfo.documentNo}</p>
                                                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                                                    <div><span className="font-medium">Expiry Date:</span> {licenseInfo.expiryDate}</div>
                                                    <div><span className="font-medium">Issue Date:</span> {licenseInfo.issueDate}</div>
                                                    <div><span className="font-medium">Date of Birth:</span> {licenseInfo.dateOfBirth}</div>
                                                    <div><span className="font-medium">Front Copy:</span> {licenseInfo.frontCopy}</div>
                                                    <div><span className="font-medium">Back Copy:</span> {licenseInfo.backCopy}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-indigo-600" onClick={startEditingLicense}>
                                                    <Edit size={16} />
                                                </button>
                                                {/* <button className="text-indigo-600 text-sm" onClick={saveLicense}>Save</button>
                                                    <button className="text-gray-600 text-sm" onClick={cancelLicense}>Cancel</button> */}
                                            </div>
                                        </div>

                                        {isEditingLicense && (

                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Document Type</p>
                                                    {isEditingLicense ? (
                                                        <select
                                                            name="documentType"
                                                            value={tempLicenseInfo.documentType}
                                                            onChange={handleLicenseChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-medium"
                                                        >
                                                            <option value="UAE Driving License">UAE Driving License</option>
                                                        </select>
                                                    ) : (
                                                        <p className="font-medium">{licenseInfo.documentType}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Document No</p>
                                                        <input
                                                            type="text"
                                                            name="documentNo"
                                                            value={tempLicenseInfo.documentNo}
                                                            onChange={handleLicenseChange}
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-medium"
                                                        />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Document Expiry</p>
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={tempLicenseInfo.expiryDate}
                                                            onChange={handleLicenseChange}
                                                            placeholder="DD-MM-YYYY"
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-medium"
                                                        />
                                                        <p className="font-medium">{licenseInfo.expiryDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Document Issue Date</p>
                                                        <input
                                                            type="text"
                                                            name="issueDate"
                                                            value={tempLicenseInfo.issueDate}
                                                            onChange={handleLicenseChange}
                                                            placeholder="DD-MM-YYYY"
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-medium"
                                                        />
                                                        <p className="font-medium">{licenseInfo.issueDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                                        <input
                                                            type="text"
                                                            name="dateOfBirth"
                                                            value={tempLicenseInfo.dateOfBirth}
                                                            onChange={handleLicenseChange}
                                                            placeholder="DD-MM-YYYY"
                                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-medium"
                                                        />
                                                        <p className="font-medium">{licenseInfo.dateOfBirth}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Attach Copy Docs (Front)</p>
                                                        <>
                                                            <input
                                                                type="file"
                                                                onChange={(e) => handleLicenseFileChange(e, 'front')}
                                                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            />
                                                            <p className="text-xs text-gray-500 mt-1">{tempLicenseInfo.frontCopy}</p>
                                                        </>
                                                        <p className="font-medium">{licenseInfo.frontCopy}</p>
                                                           <div>
                                                        <img src="https://caryaati.com/erps/images/documents/2023-05-05%2001:30:25-WhatsApp%20Image%202023-04-26%20at%2019.33.23.jpeg" alt="" className='max-h-[200px]' />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Attach Copy Docs (Back)</p>
                                                        <>
                                                            <input
                                                                type="file"
                                                                onChange={(e) => handleLicenseFileChange(e, 'back')}
                                                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            />
                                                            <p className="text-xs text-gray-500 mt-1">{tempLicenseInfo.backCopy}</p>
                                                        </>
                                                        <p className="font-medium">{licenseInfo.backCopy}</p>
                                                        <div>
                                                        <img src="https://caryaati.com/erps/images/documents/2023-05-05%2001:30:25-WhatsApp%20Image%202023-04-26%20at%2019.33.46.jpeg" alt="" className='max-h-[200px]' />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-4 justify-end">
                                                    <button onClick={cancelLicense} className="px-4 py-2 border border-gray-300" style={{ borderRadius: "10px" }}>Cancel</button>
                                                    <button onClick={saveLicense} className="px-4 py-2 bg-indigo-600 text-white" style={{ borderRadius: "10px" }}>Save</button>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* My Drivers Tab */}
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
                                    <h2 className="text-lg font-semibold text-gray-800">My Drivers</h2>
                                    <div className="flex max-sm:flex-col gap-2 mt-4 md:mt-0">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search drivers..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                        </div>
                                        <button
                                            onClick={() => setShowAddDriverModal(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                            style={{ borderRadius: "10px" }}
                                        >
                                            <Plus size={18} /> Add New Driver
                                        </button>
                                    </div>
                                </div>

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
                                                        <span className={`px-2 py-1 text-xs font-semibold ${driver.status === "Active" ? "bg-green-100 text-green-800" :
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
                                
                                {editingDriver && (
                                    <motion.div
                                        className="mb-6 p-4 border border-indigo-200 rounded-lg"
                                    >
                                        <h3 className="text-md font-medium mb-2">Edit Driver</h3>
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
                                                <div className="flex gap-2">
                                                    <select
                                                        name="phoneCountryCode"
                                                        value={editingDriver.phoneCountryCode || "+971"}
                                                        onChange={handleEditInputChange}
                                                        className="w-1/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                    >
                                                        <option value="+971">+971</option>
                                                        <option value="+966">+966</option>
                                                        <option value="+92">+92</option>
                                                        <option value="+91">+91</option>
                                                        <option value="+44">+44</option>
                                                        <option value="+1">+1</option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={editingDriver.phone}
                                                        onChange={handleEditInputChange}
                                                        className="w-3/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        placeholder="50 123 4567"
                                                    />
                                                </div>
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
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                                                <select
                                                    name="documentType"
                                                    value={editingDriver.documentType}
                                                    onChange={handleEditInputChange}
                                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                >
                                                    <option value="Emirates ID">Emirates ID</option>
                                                    <option value="Passport">Passport</option>
                                                    <option value="Visit Visa">Visit Visa</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Number</label>
                                                <input
                                                    type="text"
                                                    name="documentNumber"
                                                    value={editingDriver.documentNumber}
                                                    onChange={handleEditInputChange}
                                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Expiry</label>
                                                <input
                                                    type="text"
                                                    name="documentExpiry"
                                                    value={editingDriver.documentExpiry}
                                                    onChange={handleEditInputChange}
                                                    placeholder="DD-MM-YYYY"
                                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Issue By</label>
                                                <input
                                                    type="text"
                                                    name="documentIssueBy"
                                                    value={editingDriver.documentIssueBy}
                                                    onChange={handleEditInputChange}
                                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Attach Front Copy</label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setEditingDriver(prev => ({
                                                                ...prev,
                                                                frontCopy: file.name
                                                            }));
                                                        }
                                                    }}
                                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">{editingDriver.frontCopy}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Attach Back Copy</label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setEditingDriver(prev => ({
                                                                ...prev,
                                                                backCopy: file.name
                                                            }));
                                                        }
                                                    }}
                                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">{editingDriver.backCopy}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={updateDriver}
                                                className="px-4 py-2 bg-indigo-600 text-white"
                                                style={{ borderRadius: "10px" }}
                                            >
                                                Update Driver
                                            </button>
                                            <button
                                                onClick={() => setEditingDriver(null)}
                                                className="px-4 py-2 border border-gray-300"
                                                style={{ borderRadius: "10px" }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </motion.div>
                                )}


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
                                                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800">
                                                            {term.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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
                                                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800">
                                                            {term.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* My Cards Tab */}

                        {activeTab === "myCards" && (
                            <motion.div
                                key="myCards"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-2xl shadow-md p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">My Cards</h2>
                                    {/* <button
                                        onClick={() => setShowAddCard(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                        style={{ borderRadius: "10px" }}
                                    >
                                        <Plus size={18} /> Add New Card
                                    </button> */}
                                </div>

                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium flex items-center gap-2">
                                            <CreditCard size={18} /> My Cards
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        {cards.map(card => (
                                            <div key={card.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                                <div>
                                                    <p className="font-medium">{card.type} •••• {card.last4}</p>
                                                    <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                                                    {card.cardholderName && (
                                                        <p className="text-sm text-gray-500">Cardholder: {card.cardholderName}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-indigo-600" onClick={() => startEditingCard(card)}>
                                                        <Edit size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* {showAddCard && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4 p-4 border border-gray-200 rounded-lg"
                                    >
                                        <h4 className="text-md font-medium mb-2">Add New Card</h4>
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="type"
                                                value={newCard.type}
                                                onChange={handleNewCardChange}
                                                placeholder="Card Type (e.g., Visa)"
                                                className="w-full border my-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <input
                                                type="text"
                                                name="fullNumber"
                                                value={newCard.fullNumber}
                                                onChange={handleNewCardChange}
                                                placeholder="Card Number"
                                                maxLength={20}
                                                className="w-full border my-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <input
                                                type="text"
                                                name="cardholderName"
                                                value={newCard.cardholderName}
                                                onChange={handleNewCardChange}
                                                placeholder="Cardholder Name"
                                                className="w-full border my-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={newCard.expiry}
                                                    onChange={handleNewCardChange}
                                                    placeholder="Expiry (MM/YYYY)"
                                                    className="w-full border my-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={newCard.cvv}
                                                    onChange={handleNewCardChange}
                                                    placeholder="CVV"
                                                    maxLength={4}
                                                    className="w-full border my-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4 justify-end">
                                            <button onClick={() => setShowAddCard(false)} className="px-4 py-2 border border-gray-300" style={{ borderRadius: "10px" }}>Cancel</button>
                                            <button onClick={addCard} className="px-4 py-2 bg-indigo-600 text-white" style={{ borderRadius: "10px" }}>Save</button>
                                        </div>
                                    </motion.div>
                                )} */}

                                {editingCard && (
                                    <motion.div
                                        className="mt-4 p-4 border border-indigo-200 rounded-lg"
                                    >
                                        <h4 className="text-md font-medium mb-2">Edit Card</h4>
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="type"
                                                value={editingCard.type}
                                                onChange={handleEditCardChange}
                                                placeholder="Card Type (e.g., Visa)"
                                                className="w-full border rounded my-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <input
                                                type="text"
                                                name="fullNumber"
                                                value={editingCard.fullNumber}
                                                onChange={handleEditCardChange}
                                                placeholder="Card Number"
                                                maxLength={20}
                                                className="w-full border rounded my-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <input
                                                type="text"
                                                name="cardholderName"
                                                value={editingCard.cardholderName}
                                                onChange={handleEditCardChange}
                                                placeholder="Cardholder Name"
                                                className="w-full border rounded my-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={editingCard.expiry}
                                                    onChange={handleEditCardChange}
                                                    placeholder="Expiry (MM/YYYY)"
                                                    className="w-full border rounded my-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={editingCard.cvv}
                                                    onChange={handleEditCardChange}
                                                    placeholder="CVV"
                                                    maxLength={4}
                                                    className="w-full border rounded my-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4 justify-end">
                                            <button onClick={() => setEditingCard(null)} className="px-4 py-2 border border-gray-300" style={{ borderRadius: "10px" }}>Cancel</button>
                                            <button onClick={updateCard} className="px-4 py-2 bg-indigo-600 text-white" style={{ borderRadius: "10px" }}>Update</button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Add Driver Modal */}
            {showAddDriverModal && (
                <div className="fixed inset-0 bg-black mt-[50px] bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 w-full max-w-5xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium">Add New Driver</h3>
                            <button onClick={() => setShowAddDriverModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-4 gap-4">
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
                                <div className="flex gap-2">
                                    <select
                                        name="phoneCountryCode"
                                        value={newDriver.phoneCountryCode || "+971"}
                                        onChange={handleInputChange}
                                        className="w-1/4 border rounded px-1 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                    >
                                        <option value="+971">+971</option>
                                        <option value="+966">+966</option>
                                        <option value="+92">+92</option>
                                        <option value="+91">+91</option>
                                        <option value="+44">+44</option>
                                        <option value="+1">+1</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={newDriver.phone}
                                        onChange={handleInputChange}
                                        className="w-3/4 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        placeholder="50 123 4567"
                                    />
                                </div>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                                <select
                                    name="documentType"
                                    value={newDriver.documentType}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    <option value="Emirates ID">Emirates ID</option>
                                    <option value="Passport">Passport</option>
                                    <option value="Visit Visa">Visit Visa</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Number</label>
                                <input
                                    type="text"
                                    name="documentNumber"
                                    value={newDriver.documentNumber}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Expiry</label>
                                <input
                                    type="text"
                                    name="documentExpiry"
                                    value={newDriver.documentExpiry}
                                    onChange={handleInputChange}
                                    placeholder="DD-MM-YYYY"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Issue By</label>
                                <input
                                    type="text"
                                    name="documentIssueBy"
                                    value={newDriver.documentIssueBy}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Attach Front Copy</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setNewDriver(prev => ({
                                                ...prev,
                                                frontCopy: file.name
                                            }));
                                        }
                                    }}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                                <p className="text-xs text-gray-500 mt-1">{newDriver.frontCopy}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Attach Back Copy</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setNewDriver(prev => ({
                                                ...prev,
                                                backCopy: file.name
                                            }));
                                        }
                                    }}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                                <p className="text-xs text-gray-500 mt-1">{newDriver.backCopy}</p>
                            </div>
                        </div>
                        <div className="float-right gap-2 mt-6">
                            <button
                                onClick={() => setShowAddDriverModal(false)}
                                className="px-4 py-2 border border-gray-300"
                                style={{ borderRadius: "10px" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addDriver}
                                className="px-4 py-2 bg-indigo-600 mx-2 text-white"
                                style={{ borderRadius: "10px" }}
                            >
                                Save Driver
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}


            {/* Change Password Modal */}
            {showChangePasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium">Change Password</h3>
                            <button onClick={() => setShowChangePasswordModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={handlePasswordSubmit}
                                className="px-4 py-2 bg-indigo-600 text-white"
                                style={{ borderRadius: '10px' }}
                            >
                                Change Password
                            </button>
                            <button
                                onClick={() => setShowChangePasswordModal(false)}
                                className="px-4 py-2 border border-gray-300"
                                style={{ borderRadius: '10px' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Deactivate Account Modal */}
            {showDeactivateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium">Deactivate Account</h3>
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 font-medium">Please help us to serve you better</p>
                            <p className="text-gray-500 text-sm">Select from the following or give us feedback</p>
                            <div className="flex flex-col gap-2">
                                {[
                                    "I did not find ideal deals.",
                                    "I did not find it easy to book a car.",
                                    "I did not find good car rental companies at caryaati.com",
                                    "Car rental company are not friendly.",
                                    "Renting Policies are very strict.",
                                    "Other",
                                ].map((reason, index) => (
                                    <label key={index} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="deactivateReason"
                                            value={reason}
                                            checked={deactivateReason === reason}
                                            onChange={(e) => setDeactivateReason(e.target.value)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-200"
                                        />
                                        <span className="text-sm text-gray-700">{reason}</span>
                                    </label>
                                ))}
                            </div>
                            {deactivateReason === "Other" && (
                                <textarea
                                    value={deactivateReason === "Other" ? "" : deactivateReason}
                                    onChange={(e) => setDeactivateReason(e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 h-24"
                                    placeholder="Please share your feedback..."
                                />
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={deactivatePassword}
                                    onChange={(e) => setDeactivatePassword(e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                    placeholder="Enter your current password"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={handleDeactivateAccount}
                                className="px-4 py-2 bg-red-600 text-white"
                                style={{ borderRadius: '10px' }}
                            >
                                Deactivate Account
                            </button>
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                className="px-4 py-2 border border-gray-300"
                                style={{ borderRadius: '10px' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default ProfileMain;