import React from "react";
import DashboardCard from "@/components/dashboardCard/DashboardCard";
import DonutChart from "@/components/donutChart/DonutChart";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>DASHBOARD GIÁM SÁT</h1>

      <div className={styles.grid}>
        {/* Card 1: Ca hôm nay */}
        <DashboardCard
          title="CA HÔM NAY"
          value="17"
          titleColor="#3b82f6" // Xanh dương
        />

        {/* Card 2: Tuần này */}
        <DashboardCard
          title="TUẦN NÀY"
          value="85"
          titleColor="#3b82f6" // Xanh dương
        />

        {/* Card 3: Nghi MI (%) - Card đặc biệt chứa biểu đồ */}
        <DashboardCard
          title="NGHI MI (%)"
          titleColor="#f43f5e" // Đỏ hồng
          align="center" // Căn giữa
        >
          {/* Gọi component biểu đồ vào đây */}
          <DonutChart percentage={12} color="#f43f5e" size={100} />
        </DashboardCard>
      </div>
    </div>
  );
}
