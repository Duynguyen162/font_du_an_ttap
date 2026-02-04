// Sidebar.jsx
"use client"; // Bắt buộc vì dùng hook usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.css";

// Danh sách menu cấu hình sẵn
const MENU_ITEMS = [
  {
    label: "DASHBOARD",
    path: "/dashboard",
    icon: (
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "BỆNH NHÂN",
    path: "/patients",
    icon: (
      <path
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "DANH SÁCH CASE",
    path: "/cases",
    icon: (
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "CHẨN ĐOÁN AI",
    path: "/diagnosis",
    icon: (
      <path
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "BÁO CÁO",
    path: "/reports",
    icon: (
      <path
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "QUẢN TRỊ",
    path: "/admin",
    icon: (
      <path
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại để so sánh

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      {/* Logo Area */}
      <div className={styles.logo}>
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>ECG WEB</span>
      </div>

      {/* Navigation List */}
      <ul className={styles.menuList}>
        {MENU_ITEMS.map((item, index) => {
          // Logic active: Nếu path hiện tại bắt đầu bằng path của item
          const isActive =
            pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <li key={index}>
              <Link
                href={item.path}
                className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
              >
                <div className={styles.icon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer User Info - Lấy từ ảnh của bạn */}
      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>ADMIN: THANH HUYEN</div>
          <div className={styles.userId}>ID: 2251172379</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
