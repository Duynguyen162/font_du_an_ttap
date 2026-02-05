import React from "react";
import Sidebar from "@/components/sideBar/SideBar"; // Import Sidebar ở đây
import styles from "./layout.module.css"; // CSS riêng cho bố cục Dashboard

export default function MainLayout({
  children, // <-- ĐÂY CHÍNH LÀ "CÁC PAGE THEO ĐÚNG URL"
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar luôn nằm cố định bên trái */}
      <Sidebar className={styles.sidebar} />

      {/* Khu vực nội dung thay đổi theo URL */}
      <main className={styles.contentArea}>
        {children} 
        {/* Ví dụ: 
            - Nếu vào /dashboard -> children là nội dung Dashboard 
            - Nếu vào /patients -> children là nội dung Patients
        */}
      </main>
    </div>
  );
}