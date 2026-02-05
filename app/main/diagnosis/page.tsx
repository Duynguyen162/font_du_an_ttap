import React from "react";
import ImageViewer from "@/components/imageViewer/ImageViewer";
import DashboardCard from "@/components/dashboardCard/DashboardCard"; // Tái sử dụng
import styles from "./page.module.css";

export default function DiagnosisPage() {
  return (
    <div className={styles.pageContainer}>
      {/* CỘT TRÁI: Trình xem ảnh */}
      <div style={{ height: "calc(100vh - 80px)" }}>
        {" "}
        {/* Set chiều cao để full màn hình nếu muốn */}
        <ImageViewer />
      </div>

      {/* CỘT PHẢI: Thông tin */}
      <div>
        {/* 1. Thẻ Dự đoán AI (Style riêng) */}
        <div className={styles.scoreCard}>
          <div className={styles.scoreTitle}>DỰ ĐOÁN AI</div>
          <div className={styles.scoreValue}>98.5%</div>
        </div>

        {/* 2. Audit Trail (Tái sử dụng DashboardCard) */}
        {/* Ta truyền title vào props, và nội dung vào children */}
        <DashboardCard
          title="AUDIT TRAIL (LƯU VẾT Y TẾ)"
          titleColor="#94a3b8" // Màu xám cho tiêu đề
        >
          {/* Nội dung bên trong card */}
          <div style={{ marginTop: "10px" }}>
            <div className={styles.auditRow}>
              <span className={styles.auditLabel}>BS PHÊ DUYỆT:</span>
              <span className={styles.auditValue}>THANH HUYỀN</span>
            </div>
            <div className={styles.auditRow}>
              <span className={styles.auditLabel}>MSV:</span>
              <span className={styles.auditValueId}>2251172379</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
