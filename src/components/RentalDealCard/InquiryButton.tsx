`use client`
import React from 'react'
import { Telephone, Whatsapp } from 'react-bootstrap-icons';
import styles from '../homepage-subcategory/carcategories.module.css';
import { Button } from 'react-bootstrap';
import { CaryaatiContext } from '@/app/ContextApi/CaryaatiStore';
import { useRouter } from 'next/navigation';


const InquiryButton = () => {
    let { bookingForm, setBookingForm } = CaryaatiContext();
    let router = useRouter();

    return (
        <>
            <div className='float-left relative md:left-2 text-[14px] font-medium'>Inquiry</div><br />
            <div className={`${styles.inquiryButtons} mt-1 relative left-1 float-left justify-content-start justify-self-start translate-y-[-10px]`} style={{ marginTop: '0px', marginBottom: '0px', paddingTop: '0px' }}>
                <Button
                    className={styles.callButton}
                onClick={() => {
                        setBookingForm(true)
                }}
                >
                    <Telephone />
                </Button>
                <Button
                    className={styles.whatsappButton}
                    // href="https://wa.me/971123456789"
                    // target="_blank"
                    // rel="noopener noreferrer"
                    onClick={()=> {
                        setBookingForm(true)
                    }}
                >
                    <Whatsapp />
                </Button>
            </div>
        </>
    )
}

export default InquiryButton;