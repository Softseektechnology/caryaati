'use client';

import Link from 'next/link';
import styles from './user-dashboard.module.css';

interface UserDropdownProps {
  isOpen: boolean;
}

export default function UserDropdown({ isOpen }: UserDropdownProps) {
  return (
    <div className={`${styles.userDropdown} ${isOpen ? styles.active : ''}`}>
      <ul>
        <li><Link href="/customer-dashboard/index">My Account</Link></li>
        <li><Link href="/login" onClick={() => { localStorage.removeItem('isLoggedIn'); }}>Logout</Link></li>
      </ul>
    </div>
  );
}