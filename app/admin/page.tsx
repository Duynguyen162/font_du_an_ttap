import React from "react";
import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>QUẢN TRỊ HỆ THỐNG</h1>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        {/* Badge: Super Admin */}
        <div className={styles.badge}>SUPER ADMIN</div>

        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          {/* Bạn có thể thay src bằng link ảnh thật của bạn */}
          {/* Ở đây tôi dùng một ảnh avatar mẫu từ UI Faces hoặc placeholder */}
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt="Admin Avatar"
            className={styles.avatarImage}
          />
        </div>

        {/* Thông tin */}
        <div className={styles.infoSection}>
          <div className={styles.name}>NGUYỄN THỊ THANH HUYỀN</div>
          <div className={styles.details}>
            <span>MSV: 2251172379</span>
            <span className={styles.dot}></span>
            <span>ĐH THỦY LỢI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
