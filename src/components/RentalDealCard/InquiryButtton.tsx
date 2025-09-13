`use client`
import React from 'react'
import { Telephone, Whatsapp } from 'react-bootstrap-icons';
import styles from '../homepage-subcategory/carcategories.module.css';
import { Button } from 'react-bootstrap';


const InquiryButtton = () => {
  return (
    <>
        <div className='float-left relative md:left-2 text-[14px] font-medium'>Inquiry</div><br />
    <div className={`${styles.inquiryButtons} mt-1 relative left-1 float-left justify-content-start justify-self-start translate-y-[-10px]`} style={{marginTop: '0px', marginBottom: '0px', paddingTop: '0px'}}>
                <Button
                    className={styles.callButton}
                    // onClick={() => handleTelephoneClick(car)}
                    >
                    <Telephone />
                </Button>
                <Button
                    className={styles.whatsappButton}
                    href="https://wa.me/971123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <Whatsapp />
                </Button>
            </div>
                    </>
  )
}

export default InquiryButtton;