'use client';

import styles from './user-dashboard.module.css';

interface UserDropdownProps {
  isOpen: boolean;
}

export default function UserDropdown({ isOpen }: UserDropdownProps) {
  return (
    <div className={`${styles.userDropdown} ${isOpen ? styles.active : ''}`}>
      <ul>
        <li><a href="#">Business</a></li>
        <li><a href="#">Personal</a></li>
        <li><a href="#">Add User</a></li>
        <li><a href="#">Trips</a></li>
        <li><a href="#">Join KAYAK for Business</a></li>
        <li><a href="#">Help / FAQ</a></li>
        <li><a href="#">Your Account</a></li>
        <li><a href="#">Confirm Account</a></li>
      </ul>
    </div>
  );
}