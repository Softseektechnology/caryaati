import React, { useState } from 'react';
import styles from './Bookform.module.css';

interface HirerFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  name: string;
  gender: string;
  dob: Date | null;
  phoneCode: string;
  phone: string;
  email: string;
  nationality: string;
  countryResidence: string;
  docType: string;
  docNo: string;
  docExpiry: Date | null;
  docIssuedBy: string;
  frontDoc: File | null;
  backDoc: File | null;
  driverDocType: string;
  driverDocNo: string;
  driverDob: Date | null;
  driverIssueDate: Date | null;
  driverExpiry: Date | null;
  driverIssuedBy: string;
  driverFrontDoc: File | null;
  driverBackDoc: File | null;
}

export default function HirerForm({ onSubmit }: HirerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: 'Yeseaa Baig',
    gender: '',
    dob: new Date('2000-07-05'),
    phoneCode: '+41',
    phone: '446464',
    email: 'yeseaa.bag@gmail.com',
    nationality: '',
    countryResidence: '',
    docType: '',
    docNo: '',
    docExpiry: new Date('2025-07-05'),
    docIssuedBy: '',
    frontDoc: null,
    backDoc: null,
    driverDocType: 'uae',
    driverDocNo: '',
    driverDob: new Date('2000-07-05'),
    driverIssueDate: new Date('2025-07-05'),
    driverExpiry: new Date('2025-07-05'),
    driverIssuedBy: '',
    driverFrontDoc: null,
    driverBackDoc: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.phoneCode || !formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.countryResidence) newErrors.countryResidence = 'Country of Residence is required';
    if (!formData.docType) newErrors.docType = 'Document Type is required';
    if (!formData.docNo) newErrors.docNo = 'Document Number is required';
    if (!formData.docExpiry) newErrors.docExpiry = 'Document Expiry is required';
    if (!formData.docIssuedBy) newErrors.docIssuedBy = 'Document Issued By is required';
    if (!formData.frontDoc) newErrors.frontDoc = 'Front Document is required';
    if (!formData.backDoc) newErrors.backDoc = 'Back Document is required';
    if (!formData.driverDocType) newErrors.driverDocType = 'Driver Document Type is required';
    if (!formData.driverDocNo) newErrors.driverDocNo = 'Driver Document Number is required';
    if (!formData.driverDob) newErrors.driverDob = 'Driver Date of Birth is required';
    if (!formData.driverIssueDate) newErrors.driverIssueDate = 'Driver Issue Date is required';
    if (!formData.driverExpiry) newErrors.driverExpiry = 'Driver Expiry Date is required';
    if (!formData.driverIssuedBy) newErrors.driverIssuedBy = 'Driver Issued By is required';
    if (!formData.driverFrontDoc) newErrors.driverFrontDoc = 'Driver Front Document is required';
    if (!formData.driverBackDoc) newErrors.driverBackDoc = 'Driver Back Document is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="min-h-screen flex justify-center items-start p-4 sm:p-6">
        <div className="w-full bg-white rounded-lg p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Hirer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-user mr-2 text-blue-600"></i> Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-venus-mars mr-2 text-blue-600"></i> Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-calendar-alt mr-2 text-blue-600"></i> Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob?.toISOString().split('T')[0] || ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), 'dob')}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-phone mr-2 text-blue-600"></i> Phone *
                  </label>
                  <div className="flex">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleInputChange}
                      className={`w-1/3 px-3 sm:px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-l-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    >
                      <option value="+41">+41</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-2/3 px-3 sm:px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-r-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-envelope mr-2 text-blue-600"></i> Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-flag mr-2 text-blue-600"></i> Nationality *
                  </label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.nationality ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  >
                    <option value="">-- Select Nationality --</option>
                    {/* Add nationalities as needed */}
                  </select>
                  {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-home mr-2 text-blue-600"></i> Country of Residence *
                  </label>
                  <select
                    name="countryResidence"
                    value={formData.countryResidence}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.countryResidence ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  >
                    <option value="">-- Select Country --</option>
                    {/* Add countries as needed */}
                  </select>
                  {errors.countryResidence && <p className="text-red-500 text-xs mt-1">{errors.countryResidence}</p>}
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Document Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-id-card mr-2 text-blue-600"></i> Document Type *
                  </label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.docType ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  >
                    <option value="">-- Select Document Type --</option>
                    <option value="passport">Passport</option>
                    <option value="id">ID Card</option>
                  </select>
                  {errors.docType && <p className="text-red-500 text-xs mt-1">{errors.docType}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-hashtag mr-2 text-blue-600"></i> Document Number *
                  </label>
                  <input
                    type="text"
                    name="docNo"
                    value={formData.docNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.docNo ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    placeholder="Enter document number"
                  />
                  {errors.docNo && <p className="text-red-500 text-xs mt-1">{errors.docNo}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-calendar-times mr-2 text-blue-600"></i> Document Expiry *
                  </label>
                  <input
                    type="date"
                    name="docExpiry"
                    value={formData.docExpiry?.toISOString().split('T')[0] || ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), 'docExpiry')}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.docExpiry ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  />
                  {errors.docExpiry && <p className="text-red-500 text-xs mt-1">{errors.docExpiry}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-globe mr-2 text-blue-600"></i> Document Issued By *
                  </label>
                  <input
                    type="text"
                    name="docIssuedBy"
                    value={formData.docIssuedBy}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.docIssuedBy ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    placeholder="Enter issuing authority"
                  />
                  {errors.docIssuedBy && <p className="text-red-500 text-xs mt-1">{errors.docIssuedBy}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-file-upload mr-2 text-blue-600"></i> Attach Document (Front) *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="front-doc"
                      onChange={(e) => handleFileChange(e, 'frontDoc')}
                      className={`hidden ${styles.fileInput}`}
                    />
                    <label htmlFor="front-doc" className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-all duration-300">
                      Choose File
                    </label>
                    <span className="text-sm text-gray-600">
                      {formData.frontDoc ? formData.frontDoc.name : 'No file chosen'}
                    </span>
                  </div>
                  {errors.frontDoc && <p className="text-red-500 text-xs mt-1">{errors.frontDoc}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-file-upload mr-2 text-blue-600"></i> Attach Document (Back) *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="back-doc"
                      onChange={(e) => handleFileChange(e, 'backDoc')}
                      className={`hidden ${styles.fileInput}`}
                    />
                    <label htmlFor="back-doc" className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-all duration-300">
                      Choose File
                    </label>
                    <span className="text-sm text-gray-600">
                      {formData.backDoc ? formData.backDoc.name : 'No file chosen'}
                    </span>
                  </div>
                  {errors.backDoc && <p className="text-red-500 text-xs mt-1">{errors.backDoc}</p>}
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Driver Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-id-card mr-2 text-blue-600"></i> Document Type *
                  </label>
                  <select
                    name="driverDocType"
                    value={formData.driverDocType}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.driverDocType ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  >
                    <option value="">-- Select Document Type --</option>
                    <option value="uae">UAE Driving License</option>
                    <option value="international">International Driving License</option>
                  </select>
                  {errors.driverDocType && <p className="text-red-500 text-xs mt-1">{errors.driverDocType}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-hashtag mr-2 text-blue-600"></i> Document Number *
                  </label>
                  <input
                    type="text"
                    name="driverDocNo"
                    value={formData.driverDocNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.driverDocNo ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    placeholder="Enter document number"
                  />
                  {errors.driverDocNo && <p className="text-red-500 text-xs mt-1">{errors.driverDocNo}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-calendar-alt mr-2 text-blue-600"></i> Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="driverDob"
                    value={formData.driverDob?.toISOString().split('T')[0] || ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), 'driverDob')}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.driverDob ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  />
                  {errors.driverDob && <p className="text-red-500 text-xs mt-1">{errors.driverDob}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-calendar-check mr-2 text-blue-600"></i> Document Issue Date *
                  </label>
                  <input
                    type="date"
                    name="driverIssueDate"
                    value={formData.driverIssueDate?.toISOString().split('T')[0] || ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), 'driverIssueDate')}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.driverIssueDate ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  />
                  {errors.driverIssueDate && <p className="text-red-500 text-xs mt-1">{errors.driverIssueDate}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-calendar-times mr-2 text-blue-600"></i> Document Expiry *
                  </label>
                  <input
                    type="date"
                    name="driverExpiry"
                    value={formData.driverExpiry?.toISOString().split('T')[0] || ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), 'driverExpiry')}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.driverExpiry ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                  />
                  {errors.driverExpiry && <p className="text-red-500 text-xs mt-1">{errors.driverExpiry}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-globe mr-2 text-blue-600"></i> Document Issued By *
                  </label>
                  <input
                    type="text"
                    name="driverIssuedBy"
                    value={formData.driverIssuedBy}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border ${errors.driverIssuedBy ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 ${styles.formInput}`}
                    placeholder="Enter issuing authority"
                  />
                  {errors.driverIssuedBy && <p className="text-red-500 text-xs mt-1">{errors.driverIssuedBy}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-file-upload mr-2 text-blue-600"></i> Attach Document (Front) *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="driver-front-doc"
                      onChange={(e) => handleFileChange(e, 'driverFrontDoc')}
                      className={`hidden ${styles.fileInput}`}
                    />
                    <label htmlFor="driver-front-doc" className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-all duration-300">
                      Choose File
                    </label>
                    <span className="text-sm text-gray-600">
                      {formData.driverFrontDoc ? formData.driverFrontDoc.name : 'No file chosen'}
                    </span>
                  </div>
                  {errors.driverFrontDoc && <p className="text-red-500 text-xs mt-1">{errors.driverFrontDoc}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm sm:text-base font-medium text-gray-700 mb-1 flex items-center">
                    <i className="fas fa-file-upload mr-2 text-blue-600"></i> Attach Document (Back) *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="driver-back-doc"
                      onChange={(e) => handleFileChange(e, 'driverBackDoc')}
                      className={`hidden ${styles.fileInput}`}
                    />
                    <label htmlFor="driver-back-doc" className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-all duration-300">
                      Choose File
                    </label>
                    <span className="text-sm text-gray-600">
                      {formData.driverBackDoc ? formData.driverBackDoc.name : 'No file chosen'}
                    </span>
                  </div>
                  {errors.driverBackDoc && <p className="text-red-500 text-xs mt-1">{errors.driverBackDoc}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}