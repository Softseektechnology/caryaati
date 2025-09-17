'use client'
import React from 'react'
import styles from './carcategories.module.css';
import Image from 'next/image';

interface DetailProps {
    logo: string;
}

const DetailSection = ({ logo }: DetailProps) => {
    return (
        <>
            <div className={`${styles.carTypeContainer} ${styles.detailSection} max-lg:justify-start lg:py-2 relative max-sm:top-[-50px] max-lg:top-[-60px] max-lg:justify-items-start 2xl:w-[270px]`} style={{marginTop: '0px'}}>
                <div className={`${styles.providerAndLocation} max-lg:w-[120%] relative max-lg:left-[-10%] max-sm:w-[100%] max-sm:left-0`}>
                    <div className={styles.providerRow}>
                        <div className={styles.providerContainer}>
                            <span className={styles.greenDot}></span>
                            <div className={styles.providerPlaceholder}>
                                <Image
                                    src={logo}
                                    alt={`Provider Logo`}
                                    width={40}
                                    height={40}
                                    style={{ width: 'auto', height: '100%' }}
                                    className={styles.providerLogo}
                                    onError={(e) => {
                                        console.log(`Provider image failed to load: ${logo}`, e);
                                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                    }}
                                    crossOrigin="anonymous"
                                />
                            </div>
                        </div>
                        <span className={styles.locationIcons}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m379-137.5-17-18 136-136 18 17.5-137 136.5Zm187 .5-18-18.5 117-117 18 18.5-117 117ZM155.5-546.5 137-564l118-118 18.5 17-118 118.5Zm0 185.5L137-378l137-137 18.5 17.5-137 136.5Zm589-29-88-221.5L548-503l17.5 88-12 11.5-54-96-96-54 11.5-11 88 16.5 108.5-107.5-221.5-89 19-18L677-720l93.5-93.5q4.5-5 10-7.25t12-2.25q5.5 0 11.5 2.25t10.5 7.25q4.5 4.5 6.5 10t2 11q0 6-2.5 12t-7 11L720-676l42.5 267-18 19Z"/></svg>
                            <span className={styles.locationText}>DXB Airport T1</span>
                        </span>
                    </div>
                    <div className={styles.locationRow}>
                        <span className={styles.locationIcons}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M480.07-485.39q29.85 0 51.04-21.26 21.2-21.26 21.2-51.11 0-29.85-21.26-51.05Q509.79-630 479.93-630q-29.85 0-51.04 21.26-21.2 21.26-21.2 51.12 0 29.85 21.26 51.04 21.26 21.19 51.12 21.19ZM480-179.46q117.38-105.08 179.65-201.58 62.27-96.5 62.27-169.04 0-109.38-69.5-179.84-69.5-70.46-172.42-70.46-102.92 0-172.42 70.46-69.5 70.46-69.5 179.84 0 72.54 62.27 169.04 62.27 96.5 179.65 201.58Zm0 79.84Q329-230.46 253.54-343.15q-75.46-112.7-75.46-206.93 0-138.46 89.57-224.19Q357.23-860 480-860t212.35 85.73q89.57 85.73 89.57 224.19 0 94.23-75.46 206.93Q631-230.46 480-99.62Zm0-458.07Z"/></svg>
                            <span className={styles.locationText}>Al Barsha, Dubai</span>
                        </span>
                        <span className={styles.locationIcons}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M407-173.31v-217.46L460.5-544q1.5-2.5 3.21-3.75T471-549h282q4.05 0 6.95 1.04 2.89 1.04 3.55 3.96L817-390.77v217.39q0 5.8-3.75 9.59t-9.69 3.79h.67q-5.65 0-9.44-3.68-3.79-3.69-3.79-10.06V-230H433v56.38q0 6.04-3.75 9.83t-9.69 3.79h.67q-5.65 0-9.44-3.84-3.79-3.84-3.79-9.47ZM445-418h334l-36.19-104.5H481L445-418Zm-11.5 26v136-136Zm63.5 97.5q13.95 0 23.72-9.77 9.78-9.78 9.78-23.73 0-13.95-9.78-23.73-9.77-9.77-23.72-9.77t-23.73 9.77q-9.77 9.78-9.77 23.73 0 13.95 9.77 23.73 9.78 9.77 23.73 9.77Zm230 0q13.95 0 23.72-9.77 9.78-9.78 9.78-23.73 0-13.95-9.78-23.73-9.77-9.77-23.72-9.77t-23.72 9.77q-9.78 9.78-9.78 23.73 0 13.95 9.78 23.73 9.77 9.77 23.72 9.77Zm-466.5-183V-532H315v54.5h-54.5ZM405-662v-54.5h54.5v54.5H405ZM260.5-318.5V-373H315v54.5h-54.5Zm0 158.5v-54.5H315v54.5h-54.5ZM143-160v-489.5h144.5v-184H577V-641h-25.5v-167H313v184H168.5v464H143Zm290.5-96h357v-136h-357v136Z"/></svg>
                            <span className={styles.locationText}>DXB, SHJ, AUH</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailSection;