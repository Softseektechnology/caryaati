'use client'
import Sidebar from '@/components/multiplepages/Sidebar-multiplelinks';
import Navbar from '@/components/nevegation-header/Navbar';
import React, { useRef, useState } from 'react'
import './style.css'
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/foorter/Footer';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios'




const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });



const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [countryCode, setCountryCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data: session, status } = useSession();
  console.log(status)

  const handleGoogleAuth = async () => {
    try {
      // await signIn('google', { callbackUrl: '/' });

      // console.log(session.user)
      // Wait for session to become available (not reliable with setTimeout)
      //  setTimeout(async () => {
      // if (!session?.user?.email) return;

      //  const response = await axios.post(
      //    'http://localhost:4000/api/google-auth',
      //    { email: session.user.email },
      //    { withCredentials: true }
      //  );

      //  const { message } = response.data;

      //  if (message) {
      //    alert(message);
      //  }

      //  }, 1500); // wait for redirect to complete
    } catch (e) {
      console.error(e);
    }
  };



  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  let greaterThan = '>'

  let buttonRef = useRef();
  let loginFormRef = useRef();
  let signupFormRef = useRef();
  let loginRef = useRef();
  let signupRef = useRef();


  if (loginFormRef.current) {
    if (isSignupForm === true) {
      loginFormRef.current.style.display = 'none'
    } else {
      loginFormRef.current.style.display = 'block'
    }
  }

  if (signupFormRef.current) {
    if (isSignupForm === true) {
      signupFormRef.current.style.display = 'block'
    } else {
      signupFormRef.current.style.display = 'none'
    }
  }


  if (buttonRef.current) {
    buttonRef.current.style.backgroundColor = 'black'
  }
  if (loginRef.current) {
    loginRef.current.style.borderColor = '#feb321'
    if (isSignup === false) {
      loginRef.current.style.borderColor = '#feb321'
    } else {
      loginRef.current.style.borderColor = '#ffffff'
    }
  }
  if (signupRef.current) {
    signupRef.current.style.borderColor = '#ffffff'
    if (isSignup === true) {
      signupRef.current.style.borderColor = '#feb321'
    } else {
      signupRef.current.style.borderColor = '#ffffff'
    }
  }

  let handleHover = () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = '#feb321'
    }
  }
  let handleLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = 'black'
    }
  }

  let handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert('Please complete the CAPTCHA.');
      return;
    }
    // You can send the reCAPTCHA value to your backend for validation
    const res = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      body: JSON.stringify({ recaptchaValue: captchaValue }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.success) {
      

    const loginResAxios = await axios.post('https://www.caryaati.ca/api/Login', {email, password}, {withCredentials:true}).then((e)=>{
      alert(e.data.ResponseMessage)
      console.log(e.data, 'login')
    })
    const loginRes = await fetch('https://www.caryaati.ca/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const loginData = await loginRes.json();

    if (loginData?.ResponseMessage) {
      alert(loginData.ResponseMessage);
      console.log(e.data, 'login')
    } else {
      alert('Login failed. Please try again.');
    }
    } else {
      alert('reCAPTCHA verification failed.');
    }



    
  };


  let handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert('Please complete the CAPTCHA.');
      return;
    }

   const res = await fetch('http://localhost:4000/api/verify-recaptcha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ recaptchaValue: captchaValue }),
});
const data = await res.json();

    if (data.success) {
      // Proceed with login or signup
    } else {
      alert('reCAPTCHA verification failed.');
    }
  };


  return (
    <>
      <Navbar
        onMenuToggle={() => {
          setIsSidebarOpen(!isSidebarOpen);
          setIsDropdownOpen(false);
        }}
        onUserToggle={() => {
          setIsDropdownOpen(!isDropdownOpen);
          setIsSidebarOpen(false);
        }}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <main>
        <section className='bg-black justify-around items-center content-center  text-white py-[12px] max-md:px-[60px] max-sm:px-[20px] px-[140px]'>
          <div className='inline-block max-xl:text-[30px] max-sm:text-[16px] text-[37px] max-sm:font-medium'>Sign in or Sign Up</div>
          <ul className='inline float-right translate-y-[22.5px] max-sm:translate-y-[7px] max-sm:text-[8px] max-xl:translate-y-[16px] text-[12px] max-xl:text-[10px] font-light text-gray-300'>Home <span className='px-1'>{greaterThan}</span> Sign in or sign</ul>
        </section>
        <section className='justify-center justify-items-center bg-[#f0f3f5] pt-3 pb-8 text-black'>
          <div className='justify-self-center text-center w-[450px] max-sm:w-[95%] px-[12px] py-[24px] bg-white'>
            <div className="top">
              <button className='w-[45%] font-medium pb-[7px] border-b-2 outline-none' style={{ borderColor: '#feb321' }} ref={loginRef} onClick={() => {
                setIsSignup(false)
                setIsSignupForm(false)
              }}>Login</button>
              <button className='w-[45%] font-medium pb-[7px] border-b-2 outline-none' style={{ borderColor: 'white' }} onClick={() => {
                setIsSignup(true)
                setIsSignupForm(true)
              }} ref={signupRef}>Sign Up</button>
            </div>

            <form method='post' onSubmit={handleLoginSubmit} ref={loginFormRef}>
              <div className="middle my-4 px-[20px]">
                <div className='block text-left'>
                  <label className='text-[16px]'>Email ID</label><br />
                  <input type="text" name="id" id="" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Mobile or Email ID' className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-full' />
                </div>
                <div className='block text-left'>
                  <label className='text-[16px]'>Password</label><br />
                  <input type="password" name="password" id="" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-full' />
                </div>
                <div className='max-sm:scale-[0.80] text-left relative max-sm:left-[-10%]'>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Use your site key
                    onChange={(e) => setCaptchaValue(e)} // Store the captcha response
                  />
                </div>
                <div className='flex justify-between text-left my-3 ml-0.5'>
                  <div>
                    <input type="checkbox" name="remember" id="remember" className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm' />
                    <label className='text-[16px] px-2 max-sm:text-[12px]' htmlFor='remember' id='remember' >Remember Me</label>
                  </div>
                  <Link href={'#'} style={{ color: '#feb321' }} className='max-sm:text-[12px]'>Forgot Password?</Link>
                </div>
                <button type='submit' onMouseEnter={handleHover} onMouseLeave={handleLeave} className='w-full text-white duration-300 font-medium text-2xl py-[12px]' ref={buttonRef} onClick={handleLoginSubmit} style={{ backgroundColor: 'black' }}>Login</button>
                <hr className='mt-4' />
                <div className='bg-white translate-y-[-26px] px-2 text-sm w-fit justify-self-center'>Or Login with Social Profile</div>
                <div className='rounded-[50px] bg-red-500 justify-self-center text-white font-bold text-xl text-center content-center w-[40px] h-[40px] cursor-pointer'
                //  onClick={()=> signIn("google")}
                 >G</div>
              </div>
            </form>


            <form method='post' onSubmit={handleSignupSubmit} ref={signupFormRef} style={{ display: 'none' }}>
              <div className="middle my-4 px-[20px]">
                <div className='block text-left'>
                  <label className='text-[16px]'>Full Name</label><br />
                  <input type="text" name="name" id="" placeholder='Full Name' className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-full' />
                </div>
                <div className='block text-left'>
                  <label className='text-[16px]'>Email ID</label><br />
                  <input type="text" name="id" id="" placeholder='Mobile or Email ID' className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-full' />
                </div>
                <div className='block text-left'>
                  <label className='text-[16px]'>Password</label><br />
                  <input type="password" name="password" id="" placeholder='Password' className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-full' />
                </div>
                <div className='block text-left'>
                  <label className='text-[16px]'>Mobile Number</label><br />
                  <div className='flex justify-between'>
                    <select type="password" name="countryCode" id="" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} placeholder='Password' className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-[45%]' >
                      <option value="">Select Country Code</option>
                      <option value="+1">+1</option>
                      <option value="+7">+7</option>
                      <option value="+20">+20</option>
                      <option value="+27">+27</option>
                      <option value="+30">+30</option>
                      <option value="+31">+31</option>
                      <option value="+32">+32</option>
                      <option value="+33">+33</option>
                      <option value="+34">+34</option>
                      <option value="+36">+36</option>
                      <option value="+39">+39</option>
                      <option value="+40">+40</option>
                      <option value="+44">+44</option>
                      <option value="+49">+49</option>
                      <option value="+51">+51</option>
                      <option value="+52">+52</option>
                      <option value="+55">+55</option>
                      <option value="+60">+60</option>
                      <option value="+61">+61</option>
                      <option value="+62">+62</option>
                      <option value="+63">+63</option>
                      <option value="+64">+64</option>
                      <option value="+65">+65</option>
                      <option value="+66">+66</option>
                      <option value="+81">+81</option>
                      <option value="+82">+82</option>
                      <option value="+84">+84</option>
                      <option value="+86">+86</option>
                      <option value="+90">+90</option>
                      <option value="+91">+91</option>
                      <option value="+92">+92</option>
                      <option value="+93">+93</option>
                      <option value="+94">+94</option>
                      <option value="+95">+95</option>
                      <option value="+98">+98</option>
                      <option value="+211">+211</option>
                      <option value="+212">+212</option>
                      <option value="+213">+213</option>
                      <option value="+216">+216</option>
                      <option value="+218">+218</option>
                      <option value="+220">+220</option>
                      <option value="+221">+221</option>
                      <option value="+222">+222</option>
                      <option value="+223">+223</option>
                      <option value="+224">+224</option>
                      <option value="+225">+225</option>
                      <option value="+226">+226</option>
                      <option value="+227">+227</option>
                      <option value="+228">+228</option>
                      <option value="+229">+229</option>
                      <option value="+230">+230</option>
                      <option value="+231">+231</option>
                      <option value="+232">+232</option>
                      <option value="+233">+233</option>
                      <option value="+234">+234</option>
                      <option value="+235">+235</option>
                      <option value="+236">+236</option>
                      <option value="+237">+237</option>
                      <option value="+238">+238</option>
                      <option value="+239">+239</option>
                      <option value="+240">+240</option>
                      <option value="+241">+241</option>
                      <option value="+242">+242</option>
                      <option value="+243">+243</option>
                      <option value="+244">+244</option>
                      <option value="+245">+245</option>
                      <option value="+246">+246</option>
                      <option value="+248">+248</option>
                      <option value="+249">+249</option>
                      <option value="+250">+250</option>
                      <option value="+251">+251</option>
                      <option value="+252">+252</option>
                      <option value="+253">+253</option>
                      <option value="+254">+254</option>
                      <option value="+255">+255</option>
                      <option value="+256">+256</option>
                      <option value="+257">+257</option>
                      <option value="+258">+258</option>
                      <option value="+260">+260</option>
                      <option value="+261">+261</option>
                      <option value="+263">+263</option>
                      <option value="+264">+264</option>
                      <option value="+265">+265</option>
                      <option value="+266">+266</option>
                      <option value="+267">+267</option>
                      <option value="+268">+268</option>
                      <option value="+269">+269</option>
                      <option value="+850">+850</option>
                      <option value="+852">+852</option>
                      <option value="+853">+853</option>
                      <option value="+855">+855</option>
                      <option value="+856">+856</option>
                      <option value="+880">+880</option>
                      <option value="+886">+886</option>
                      <option value="+960">+960</option>
                      <option value="+961">+961</option>
                      <option value="+962">+962</option>
                      <option value="+963">+963</option>
                      <option value="+964">+964</option>
                      <option value="+965">+965</option>
                      <option value="+966">+966</option>
                      <option value="+967">+967</option>
                      <option value="+968">+968</option>
                      <option value="+970">+970</option>
                      <option value="+971">+971</option>
                      <option value="+972">+972</option>
                      <option value="+973">+973</option>
                      <option value="+974">+974</option>
                      <option value="+975">+975</option>
                      <option value="+976">+976</option>
                      <option value="+977">+977</option>
                    </select>
                    <input type="number" name="number" id="" placeholder='Mobile Number' className='border shadowLight border-b-gray-500 outline-none focus:border-blue-300 rounded-sm px-[12px] my-2 py-[12px] w-[50%]' />
                  </div>
                </div>
                <div className='my-2'>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Use your site key
                    onChange={(value) => setCaptchaValue(value)} // Store the captcha response
                  />
                </div>

                <button type='submit' onMouseEnter={handleHover} onMouseLeave={handleLeave} className='w-full text-white duration-300 mt-1 font-medium text-2xl py-[12px]' ref={buttonRef} style={{ backgroundColor: 'black' }}>Signup</button>
                <hr className='mt-4' />
                <div className='bg-white translate-y-[-26px] px-2 text-sm w-fit justify-self-center'>Or Login with Social Profile</div>
                <div className='rounded-[50px] bg-red-500 justify-self-center text-white font-bold text-xl text-center content-center w-[40px] h-[40px] cursor-pointer'>G</div>
              </div>
            </form>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default page