'use client';

import styles from './user-dashboard.module.css';

interface UserDropdownProps {
  isOpen: boolean;
}

export default function UserDropdown({ isOpen }: UserDropdownProps) {
  return (
    <div className={`${styles.userDropdown} ${isOpen ? styles.active : ''}`}>
      <ul>
        <li><a href="#">My Account</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>
  );
}