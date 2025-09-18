`use client`
import React from 'react'
import { Telephone, Whatsapp } from 'react-bootstrap-icons';
import styles from '../homepage-subcategory/carcategories.module.css';
import { Button } from 'react-bootstrap';
import { CaryaatiContext } from '@/app/ContextApi/CaryaatiStore';


const InquiryButton = () => {
    let { bookingForm, setBookingForm } = CaryaatiContext();
  return (
    <>
        <div className='float-left relative md:left-2 text-[14px] font-medium'>Inquiry</div><br />
    <div className={`${styles.inquiryButtons} mt-1 relative left-1 float-left justify-content-start justify-self-start translate-y-[-10px]`} style={{marginTop: '0px', marginBottom: '0px', paddingTop: '0px'}}>
                <Button
                    className={`${styles.callButton}`}
                    onClick={() => {
                        setBookingForm(true)
                }}
                    >
                    <Telephone fill='#feb321' style={{filter: 'drop-shadow(0px 4px 3px gold)'}} />
                </Button>
                <Button
                    className={styles.whatsappButton}
                    onClick={()=> {
                        setBookingForm(true)
                    }}
                    >
                    <Whatsapp style={{filter: 'drop-shadow(0px 4px 3px green)'}}/>
                </Button>
            </div>
                    </>
  )
}

export default InquiryButton;