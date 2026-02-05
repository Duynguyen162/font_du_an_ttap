import React from "react";
import DonutChart from "@/components/donutChart/DonutChart";
import styles from "./page.module.css";

export default function ReportsPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>BÁO CÁO HỆ THỐNG</h1>

      <div className={styles.reportCard}>
        {/* 1. Phần Biểu đồ (Tái sử dụng) */}
        <div className={styles.chartSection}>
          <DonutChart
            percentage={12}
            color="#3b82f6" // Màu xanh dương (thay vì đỏ của dashboard)
            size={160} // Kích thước to hơn chút cho đẹp
            strokeWidth={14}
          />
        </div>

        {/* 2. Phần Nút bấm */}
        <div className={styles.buttonSection}>
          {/* Nút Excel */}
          <button className={`${styles.actionButton} ${styles.excelBtn}`}>
            <span>Xuất File Excel</span>
            {/* Icon Excel (Giả lập màu sắc) */}
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 3v5h5"
                stroke="#10b981"
              />{" "}
              {/* Một chút màu xanh lá cho icon Excel */}
            </svg>
          </button>

          {/* Nút PDF */}
          <button className={`${styles.actionButton} ${styles.pdfBtn}`}>
            <span>Xuất Báo Cáo PDF</span>
            {/* Icon Download */}
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
