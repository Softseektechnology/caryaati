import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerCol}>
          <h4>About Us</h4>
          <p>
            Caryaati.com is the most advanced booking engine enabling customers
            to book from thousands of instant car options with accurate
            information before renting.
          </p>
          <p>
            <strong>Working Hours:</strong> 09:30 - 21:00
          </p>
        </div>

        <div className={styles.footerCol}>
          <h4>Important Reading</h4>
          <a href="Privacy-policy">Privacy Policy</a>
          <a href="Terms-conditions">Terms &amp; Conditions</a>
          <a href="Become-a-partner">Become a Partner</a>
        </div>

        <div className={styles.footerCol}>
          <h4>Useful Link</h4>
           <a href="Blogs">Blogs</a>
          <a href="Contact-us">Contact us</a>
          <a href="FAQ">FAQ</a>
          {/* <div className={styles.contactItem}>
            <img src="https://flagcdn.com/w20/ae.png" alt="UAE Flag" /> +971 (54)
            3363 900
          </div>
          <div className={styles.contactItem}>
            <img src="https://flagcdn.com/w20/ca.png" alt="Canada Flag" /> +1
            (647) 309 3619
          </div>
          <div className={styles.contactItem}>
            <img src="https://flagcdn.com/w20/gb.png" alt="UK Flag" /> +44 7791
            733167
          </div>
          <div className={styles.contactItem}>
            <img src="https://flagcdn.com/w20/tr.png" alt="Turkey Flag" /> +90
            536 037 6786
          </div> */}
        </div>

        <div className={styles.footerCol}>
          <h4>Subscribe</h4>
          <div className={styles.subscribeBox}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <h4 style={{marginTop:'20px'}}>Get the Caryaati app</h4>
          <div className="row">
          <div className="col-md-5 ">
      <img src="images/googleplay.png" style={{ width: "150px" }} alt="" />
    </div>
    <div className="col-md-5">
      <img src="images/applestore.png" style={{ width: "150px" }} alt="" />
    </div>
  </div>
        </div>
        <div className={styles.footerCol}>
          <h4>UAE</h4>
          <img src="https://flagcdn.com/w20/ae.png" style={{width:'40px'}} alt="UAE Flag" />
          <br/>
          <div className={styles.contactItem}>
           Phone:  +971 (54)3363 900 <br/><br/>
          Address: D-FXD-1001, Dubai Digital Park Building A5, Dubai Silicon Oasis, Dubai, UAE.

          </div>
          
        </div>
          <div className={styles.footerCol}>
          <h4>Canada</h4>
          <img src="https://flagcdn.com/w20/ca.png" alt="Canada Flag" style={{width:'40px'}} />
          <br /> 
          <div className={styles.contactItem}>
           Phone: +1 (647) 309 3619
            <br/><br/>
           Address: George Street South 41, Brampton, ON L6Y 2E1, Canada.

          </div>
          </div>
            <div className={styles.footerCol}>
          <h4>UK</h4>
  <img src="https://flagcdn.com/w20/gb.png" alt="UK Flag" style={{width:'40px'}}/>
  <br/>
          <div className={styles.contactItem}>
         Phone:  +44 7791 733167
         <br/><br/>
         Address: 1 cranwell close, Shenley Brook end Milton Keynes MK5 7BU
          </div>
          </div>
            <div className={styles.footerCol}>
          <h4>Turkey</h4>
            <img src="https://flagcdn.com/w20/tr.png" alt="Turkey Flag" style={{width:'40px'}}/>
            <br/>
          <div className={styles.contactItem}>
          Phone: +90 536 037 6786
          address : Güzeloba, Bülent Ecevit Blv., 07230 Muratpasa, Antalya, Turkey.
          </div>
          </div>

      </div>

      <div className={styles.footerBottom}>
       <p> © 2025 Booking Engine Designed &amp; Developed by{" "}
       <a href="#" style={{color:'#feb321'}}> Softseek Technology FZE</a> </p>
                 <div className={styles.socialLinks}>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png"
                alt="YouTube"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="LinkedIn"
              />
            </a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
