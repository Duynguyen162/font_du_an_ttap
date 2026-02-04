import React from "react";
import styles from "./DashboardCard.module.css";

interface DashboardCardProps {
  title: string;
  value?: string | number; // Giá trị số (nếu có)
  titleColor?: string; // Màu của tiêu đề
  children?: React.ReactNode; // Nội dung custom (như biểu đồ)
  align?: "left" | "center";
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  titleColor = "#3b82f6", // Mặc định xanh dương
  children,
  align = "left",
}) => {
  return (
    <div
      className={`${styles.card} ${align === "center" ? styles.center : styles.left}`}
    >
      <div className={styles.title} style={{ color: titleColor }}>
        {title}
      </div>

      {/* Nếu có value thì hiện số, nếu không thì hiện children (biểu đồ) */}
      {value ? <div className={styles.value}>{value}</div> : children}
    </div>
  );
};

export default DashboardCard;
