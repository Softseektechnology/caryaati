'use client'

import Sidebar from '@/components/multiplepages/Sidebar-multiplelinks';
import Navbar from '@/components/nevegation-header/Navbar';
import React, { useRef, useState, useEffect } from 'react'
import './style.css'
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/foorter/Footer';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';

// const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [countryCode, setCountryCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({});
  const [loginMethod, setLoginMethod] = useState('email'); // New state for login method

  const countryCodes = [
    { value: "+93", label: "+93 (Afghanistan)" },
    { value: "+355", label: "+355 (Albania)" },
    { value: "+213", label: "+213 (Algeria)" },
    { value: "+1-684", label: "+1-684 (American Samoa)" },
    { value: "+376", label: "+376 (Andorra)" },
    { value: "+244", label: "+244 (Angola)" },
    { value: "+1-264", label: "+1-264 (Anguilla)" },
    { value: "+672", label: "+672 (Antarctica)" },
    { value: "+1-268", label: "+1-268 (Antigua and Barbuda)" },
    { value: "+54", label: "+54 (Argentina)" },
    { value: "+374", label: "+374 (Armenia)" },
    { value: "+297", label: "+297 (Aruba)" },
    { value: "+61", label: "+61 (Australia)" },
    { value: "+43", label: "+43 (Austria)" },
    { value: "+994", label: "+994 (Azerbaijan)" },
    { value: "+1-242", label: "+1-242 (Bahamas)" },
    { value: "+973", label: "+973 (Bahrain)" },
    { value: "+880", label: "+880 (Bangladesh)" },
    { value: "+1-246", label: "+1-246 (Barbados)" },
    { value: "+375", label: "+375 (Belarus)" },
    { value: "+32", label: "+32 (Belgium)" },
    { value: "+501", label: "+501 (Belize)" },
    { value: "+229", label: "+229 (Benin)" },
    { value: "+1-441", label: "+1-441 (Bermuda)" },
    { value: "+975", label: "+975 (Bhutan)" },
    { value: "+591", label: "+591 (Bolivia)" },
    { value: "+387", label: "+387 (Bosnia and Herzegovina)" },
    { value: "+267", label: "+267 (Botswana)" },
    { value: "+55", label: "+55 (Brazil)" },
    { value: "+246", label: "+246 (British Indian Ocean Territory)" },
    { value: "+1-284", label: "+1-284 (British Virgin Islands)" },
    { value: "+673", label: "+673 (Brunei)" },
    { value: "+359", label: "+359 (Bulgaria)" },
    { value: "+226", label: "+226 (Burkina Faso)" },
    { value: "+257", label: "+257 (Burundi)" },
    { value: "+855", label: "+855 (Cambodia)" },
    { value: "+237", label: "+237 (Cameroon)" },
    { value: "+1", label: "+1 (Canada)" },
    { value: "+238", label: "+238 (Cape Verde)" },
    { value: "+1-345", label: "+1-345 (Cayman Islands)" },
    { value: "+236", label: "+236 (Central African Republic)" },
    { value: "+235", label: "+235 (Chad)" },
    { value: "+56", label: "+56 (Chile)" },
    { value: "+86", label: "+86 (China)" },
    { value: "+61", label: "+61 (Christmas Island)" },
    { value: "+61", label: "+61 (Cocos Islands)" },
    { value: "+57", label: "+57 (Colombia)" },
    { value: "+269", label: "+269 (Comoros)" },
    { value: "+682", label: "+682 (Cook Islands)" },
    { value: "+506", label: "+506 (Costa Rica)" },
    { value: "+385", label: "+385 (Croatia)" },
    { value: "+53", label: "+53 (Cuba)" },
    { value: "+599", label: "+599 (Curacao)" },
    { value: "+357", label: "+357 (Cyprus)" },
    { value: "+420", label: "+420 (Czech Republic)" },
    { value: "+243", label: "+243 (Democratic Republic of the Congo)" },
    { value: "+45", label: "+45 (Denmark)" },
    { value: "+253", label: "+253 (Djibouti)" },
    { value: "+1-767", label: "+1-767 (Dominica)" },
    { value: "+1-809", label: "+1-809 (Dominican Republic)" },
    { value: "+670", label: "+670 (East Timor)" },
    { value: "+593", label: "+593 (Ecuador)" },
    { value: "+20", label: "+20 (Egypt)" },
    { value: "+503", label: "+503 (El Salvador)" },
    { value: "+240", label: "+240 (Equatorial Guinea)" },
    { value: "+291", label: "+291 (Eritrea)" },
    { value: "+372", label: "+372 (Estonia)" },
    { value: "+251", label: "+251 (Ethiopia)" },
    { value: "+500", label: "+500 (Falkland Islands)" },
    { value: "+298", label: "+298 (Faroe Islands)" },
    { value: "+679", label: "+679 (Fiji)" },
    { value: "+358", label: "+358 (Finland)" },
    { value: "+33", label: "+33 (France)" },
    { value: "+689", label: "+689 (French Polynesia)" },
    { value: "+241", label: "+241 (Gabon)" },
    { value: "+220", label: "+220 (Gambia)" },
    { value: "+995", label: "+995 (Georgia)" },
    { value: "+49", label: "+49 (Germany)" },
    { value: "+233", label: "+233 (Ghana)" },
    { value: "+350", label: "+350 (Gibraltar)" },
    { value: "+30", label: "+30 (Greece)" },
    { value: "+299", label: "+299 (Greenland)" },
    { value: "+1-473", label: "+1-473 (Grenada)" },
    { value: "+1-671", label: "+1-671 (Guam)" },
    { value: "+502", label: "+502 (Guatemala)" },
    { value: "+44-1481", label: "+44-1481 (Guernsey)" },
    { value: "+224", label: "+224 (Guinea)" },
    { value: "+245", label: "+245 (Guinea-Bissau)" },
    { value: "+592", label: "+592 (Guyana)" },
    { value: "+509", label: "+509 (Haiti)" },
    { value: "+504", label: "+504 (Honduras)" },
    { value: "+852", label: "+852 (Hong Kong)" },
    { value: "+36", label: "+36 (Hungary)" },
    { value: "+354", label: "+354 (Iceland)" },
    { value: "+91", label: "+91 (India)" },
    { value: "+62", label: "+62 (Indonesia)" },
    { value: "+98", label: "+98 (Iran)" },
    { value: "+964", label: "+964 (Iraq)" },
    { value: "+353", label: "+353 (Ireland)" },
    { value: "+44-1624", label: "+44-1624 (Isle of Man)" },
    { value: "+972", label: "+972 (Israel)" },
    { value: "+39", label: "+39 (Italy)" },
    { value: "+225", label: "+225 (Ivory Coast)" },
    { value: "+1-876", label: "+1-876 (Jamaica)" },
    { value: "+81", label: "+81 (Japan)" },
    { value: "+44-1534", label: "+44-1534 (Jersey)" },
    { value: "+962", label: "+962 (Jordan)" },
    { value: "+7", label: "+7 (Kazakhstan)" },
    { value: "+254", label: "+254 (Kenya)" },
    { value: "+686", label: "+686 (Kiribati)" },
    { value: "+383", label: "+383 (Kosovo)" },
    { value: "+965", label: "+965 (Kuwait)" },
    { value: "+996", label: "+996 (Kyrgyzstan)" },
    { value: "+856", label: "+856 (Laos)" },
    { value: "+371", label: "+371 (Latvia)" },
    { value: "+961", label: "+961 (Lebanon)" },
    { value: "+266", label: "+266 (Lesotho)" },
    { value: "+231", label: "+231 (Liberia)" },
    { value: "+218", label: "+218 (Libya)" },
    { value: "+423", label: "+423 (Liechtenstein)" },
    { value: "+370", label: "+370 (Lithuania)" },
    { value: "+352", label: "+352 (Luxembourg)" },
    { value: "+853", label: "+853 (Macau)" },
    { value: "+389", label: "+389 (Macedonia)" },
    { value: "+261", label: "+261 (Madagascar)" },
    { value: "+265", label: "+265 (Malawi)" },
    { value: "+60", label: "+60 (Malaysia)" },
    { value: "+960", label: "+960 (Maldives)" },
    { value: "+223", label: "+223 (Mali)" },
    { value: "+356", label: "+356 (Malta)" },
    { value: "+692", label: "+692 (Marshall Islands)" },
    { value: "+222", label: "+222 (Mauritania)" },
    { value: "+230", label: "+230 (Mauritius)" },
    { value: "+262", label: "+262 (Mayotte)" },
    { value: "+52", label: "+52 (Mexico)" },
    { value: "+691", label: "+691 (Micronesia)" },
    { value: "+373", label: "+373 (Moldova)" },
    { value: "+377", label: "+377 (Monaco)" },
    { value: "+976", label: "+976 (Mongolia)" },
    { value: "+382", label: "+382 (Montenegro)" },
    { value: "+1-664", label: "+1-664 (Montserrat)" },
    { value: "+212", label: "+212 (Morocco)" },
    { value: "+258", label: "+258 (Mozambique)" },
    { value: "+95", label: "+95 (Myanmar)" },
    { value: "+264", label: "+264 (Namibia)" },
    { value: "+674", label: "+674 (Nauru)" },
    { value: "+977", label: "+977 (Nepal)" },
    { value: "+31", label: "+31 (Netherlands)" },
    { value: "+599", label: "+599 (Netherlands Antilles)" },
    { value: "+687", label: "+687 (New Caledonia)" },
    { value: "+64", label: "+64 (New Zealand)" },
    { value: "+505", label: "+505 (Nicaragua)" },
    { value: "+227", label: "+227 (Niger)" },
    { value: "+234", label: "+234 (Nigeria)" },
    { value: "+683", label: "+683 (Niue)" },
    { value: "+850", label: "+850 (North Korea)" },
    { value: "+1-670", label: "+1-670 (Northern Mariana Islands)" },
    { value: "+47", label: "+47 (Norway)" },
    { value: "+968", label: "+968 (Oman)" },
    { value: "+92", label: "+92 (Pakistan)" },
    { value: "+680", label: "+680 (Palau)" },
    { value: "+970", label: "+970 (Palestine)" },
    { value: "+507", label: "+507 (Panama)" },
    { value: "+675", label: "+675 (Papua New Guinea)" },
    { value: "+595", label: "+595 (Paraguay)" },
    { value: "+51", label: "+51 (Peru)" },
    { value: "+63", label: "+63 (Philippines)" },
    { value: "+64", label: "+64 (Pitcairn)" },
    { value: "+48", label: "+48 (Poland)" },
    { value: "+351", label: "+351 (Portugal)" },
    { value: "+1-787", label: "+1-787 (Puerto Rico)" },
    { value: "+974", label: "+974 (Qatar)" },
    { value: "+242", label: "+242 (Republic of the Congo)" },
    { value: "+262", label: "+262 (Reunion)" },
    { value: "+40", label: "+40 (Romania)" },
    { value: "+7", label: "+7 (Russia)" },
    { value: "+250", label: "+250 (Rwanda)" },
    { value: "+590", label: "+590 (Saint Barthelemy)" },
    { value: "+290", label: "+290 (Saint Helena)" },
    { value: "+1-869", label: "+1-869 (Saint Kitts and Nevis)" },
    { value: "+1-758", label: "+1-758 (Saint Lucia)" },
    { value: "+590", label: "+590 (Saint Martin)" },
    { value: "+508", label: "+508 (Saint Pierre and Miquelon)" },
    { value: "+1-784", label: "+1-784 (Saint Vincent and the Grenadines)" },
    { value: "+685", label: "+685 (Samoa)" },
    { value: "+378", label: "+378 (San Marino)" },
    { value: "+239", label: "+239 (Sao Tome and Principe)" },
    { value: "+966", label: "+966 (Saudi Arabia)" },
    { value: "+221", label: "+221 (Senegal)" },
    { value: "+381", label: "+381 (Serbia)" },
    { value: "+248", label: "+248 (Seychelles)" },
    { value: "+232", label: "+232 (Sierra Leone)" },
    { value: "+65", label: "+65 (Singapore)" },
    { value: "+1-721", label: "+1-721 (Sint Maarten)" },
    { value: "+421", label: "+421 (Slovakia)" },
    { value: "+386", label: "+386 (Slovenia)" },
    { value: "+677", label: "+677 (Solomon Islands)" },
    { value: "+252", label: "+252 (Somalia)" },
    { value: "+27", label: "+27 (South Africa)" },
    { value: "+82", label: "+82 (South Korea)" },
    { value: "+211", label: "+211 (South Sudan)" },
    { value: "+34", label: "+34 (Spain)" },
    { value: "+94", label: "+94 (Sri Lanka)" },
    { value: "+249", label: "+249 (Sudan)" },
    { value: "+597", label: "+597 (Suriname)" },
    { value: "+47", label: "+47 (Svalbard and Jan Mayen)" },
    { value: "+268", label: "+268 (Swaziland)" },
    { value: "+46", label: "+46 (Sweden)" },
    { value: "+41", label: "+41 (Switzerland)" },
    { value: "+963", label: "+963 (Syria)" },
    { value: "+886", label: "+886 (Taiwan)" },
    { value: "+992", label: "+992 (Tajikistan)" },
    { value: "+255", label: "+255 (Tanzania)" },
    { value: "+66", label: "+66 (Thailand)" },
    { value: "+228", label: "+228 (Togo)" },
    { value: "+690", label: "+690 (Tokelau)" },
    { value: "+676", label: "+676 (Tonga)" },
    { value: "+1-868", label: "+1-868 (Trinidad and Tobago)" },
    { value: "+216", label: "+216 (Tunisia)" },
    { value: "+90", label: "+90 (Turkey)" },
    { value: "+993", label: "+993 (Turkmenistan)" },
    { value: "+1-649", label: "+1-649 (Turks and Caicos Islands)" },
    { value: "+688", label: "+688 (Tuvalu)" },
    { value: "+1-340", label: "+1-340 (U.S. Virgin Islands)" },
    { value: "+256", label: "+256 (Uganda)" },
    { value: "+380", label: "+380 (Ukraine)" },
    { value: "+971", label: "+971 (United Arab Emirates)" },
    { value: "+44", label: "+44 (United Kingdom)" },
    { value: "+1", label: "+1 (United States)" },
    { value: "+598", label: "+598 (Uruguay)" },
    { value: "+998", label: "+998 (Uzbekistan)" },
    { value: "+678", label: "+678 (Vanuatu)" },
    { value: "+379", label: "+379 (Vatican)" },
    { value: "+58", label: "+58 (Venezuela)" },
    { value: "+84", label: "+84 (Vietnam)" },
    { value: "+681", label: "+681 (Wallis and Futuna)" },
    { value: "+212", label: "+212 (Western Sahara)" },
    { value: "+967", label: "+967 (Yemen)" },
    { value: "+260", label: "+260 (Zambia)" },
    { value: "+263", label: "+263 (Zimbabwe)" }
  ];

  const handleGoogleAuth = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const validateForm = (isSignupMode) => {
    const newErrors = {};
    if (loginMethod === 'email' || isSignupMode) {
      if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    }
    if (loginMethod === 'mobile') {
      if (!countryCode) newErrors.countryCode = "Country code is required";
      // Add mobile validation if needed
    }
    if (!password) newErrors.password = "Password is required";
    if (isSignupMode && !countryCode) newErrors.countryCode = "Country code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, isSignupMode) => {
    e.preventDefault();
    if (validateForm(isSignupMode)) {
      // Proceed with submission
      console.log('Form submitted:', { email, password, countryCode, loginMethod });
      // Add API call here
    }
  };

  let greaterThan = '>'
  let buttonRef = useRef();
  let loginFormRef = useRef();
  let signupFormRef = useRef();
  let loginRef = useRef();
  let signupRef = useRef();

  const handleHover = () => {
    buttonRef.current.style.backgroundColor = 'blue';
    buttonRef.current.style.color = 'white';
  }

  const handleLeave = () => {
    buttonRef.current.style.backgroundColor = 'black';
    buttonRef.current.style.color = 'white';
  }

  return (
    <>
      <Navbar onMenuToggle={() => setIsSidebarOpen(true)} isHome={true} onUserToggle={() => setIsDropdownOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      <main className="main-container" data-aos="fade-in">
        <section className="hero-section">
          <h1 className="hero-title">Welcome Back!</h1>
          <p className="hero-subtitle">Login to access your personalized car rental dashboard.</p>
        </section>

        <section className="form-section" data-aos="fade-up" data-aos-delay="200">
          <div className="form-container">
            <div className="tab-container">
              <button 
                className={`tab-button ${!isSignup ? 'active' : ''}`} 
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
              <button 
                className={`tab-button ${isSignup ? 'active' : ''}`} 
                onClick={() => setIsSignup(true)}
              >
                Signup
              </button>
            </div>

            {!isSignup ? (
              <form ref={loginFormRef} onSubmit={(e) => handleSubmit(e, false)} className="form-content">
                <div className="login-method-container">
                  <label>
                    <input 
                      type="radio" 
                      value="email" 
                      checked={loginMethod === 'email'} 
                      onChange={() => setLoginMethod('email')} 
                    />
                    Login via Email
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      value="mobile" 
                      checked={loginMethod === 'mobile'} 
                      onChange={() => setLoginMethod('mobile')} 
                    />
                    Login via Mobile
                  </label>
                </div>

                {loginMethod === 'email' ? (
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder='Email' 
                      className='form-input' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                ) : (
                  <div className="form-group phone-group">
                    <select 
                      name="countryCode" 
                      className='country-select' 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="">Country Code</option>
                      {countryCodes.map((country) => (
                        <option key={country.label} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <input 
                      type="number" 
                      name="number" 
                      placeholder='Mobile Number' 
                      className='form-input'
                    />
                    {errors.countryCode && <span className="error-message">{errors.countryCode}</span>}
                  </div>
                )}

                <div className="form-group">
                  <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    className='form-input' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="remember-forgot">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Link href="/forgot-password" className="forgot-password">Forgot Password?</Link>
                </div>
                <button 
                  type='submit' 
                  className='submit-button' 
                  ref={buttonRef} 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleLeave}
                >
                  Login
                </button>
                <hr className='divider' />
                <p className='social-text'>Or Login with Social Profile</p>
                <button type="button" onClick={handleGoogleAuth} className="google-button">
                  <span className="google-icon">G</span> Continue with Google
                </button>
              </form>
            ) : (
              <form ref={signupFormRef} onSubmit={(e) => handleSubmit(e, true)} className="form-content">
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder='Email' 
                    className='form-input' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    className='form-input' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group phone-group">
                  <select 
                    name="countryCode" 
                    className='country-select' 
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="">Country Code</option>
                    {countryCodes.map((country) => (
                      <option key={country.label} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="number" 
                    name="number" 
                    placeholder='Mobile Number' 
                    className='form-input phone-input'
                  />
                  {errors.countryCode && <span className="error-message">{errors.countryCode}</span>}
                </div>
                {/* <div className='captcha-container'>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setCaptchaValue(value)}
                  />
                </div> */}
                <button 
                  type='submit' 
                  className='submit-button' 
                  ref={buttonRef} 
                  onMouseEnter={handleHover} 
                  onMouseLeave={handleLeave}
                >
                  Signup
                </button>
                <hr className='divider' />
                <p className='social-text'>Or Signup with Social Profile</p>
                <button type="button" onClick={handleGoogleAuth} className="google-button">
                  <span className="google-icon">G</span> Continue with Google
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Page;